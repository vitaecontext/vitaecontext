import fs from "node:fs";
import path from "node:path";

import {
  normalizeRelativePath,
  packageFileIncludes,
  readJsonFile,
  semverish
} from "./filesystem.mjs";
import { readSkillName } from "./provider-files.mjs";

function validateProvider(repoRoot, provider, providerSpec, packageMetadata, errors) {
  if (!providerSpec.layout) {
    errors.push(`provider '${provider}' is missing layout`);
  }
  if (!providerSpec.target) {
    errors.push(`provider '${provider}' is missing target`);
  }

  for (const file of providerSpec.files ?? []) {
    const source = path.join(repoRoot, file.source);
    if (!fs.existsSync(source)) {
      errors.push(`provider '${provider}' file source does not exist: ${file.source}`);
      continue;
    }
    if (file.syncPackageVersion) {
      try {
        const json = readJsonFile(source);
        if (json.version !== packageMetadata.version) {
          errors.push(
            `${file.source} version ${json.version} does not match package.json version ${packageMetadata.version}`
          );
        }
      } catch (error) {
        errors.push(`provider '${provider}' file is not valid JSON: ${file.source}`);
      }
    }
  }

  for (const command of providerSpec.commands ?? []) {
    const source = path.join(repoRoot, command.source);
    if (!fs.existsSync(source)) {
      errors.push(`provider '${provider}' command source does not exist: ${command.source}`);
    }
  }

  if (providerSpec.commandTarget && !providerSpec.commands) {
    errors.push(`provider '${provider}' has commandTarget but no commands`);
  }
}

const WIKI_REQUIRED_FIELDS = [
  "wiki",
  "module",
  "title",
  "status",
  "confidence",
  "last_reviewed",
  "review_by",
  "source_status",
  "agent_priority"
];

const WIKI_ENUMS = {
  status: ["draft", "review", "stable"],
  confidence: ["stable", "likely", "inferred", "disputed"],
  source_status: ["repo", "mixed", "official", "external", "supplied", "unknown"],
  agent_priority: ["high", "medium", "low"]
};

const WIKI_REVIEW_MONTHS = {
  stable: 6,
  likely: 3,
  inferred: 1,
  disputed: 1
};

function isoToday() {
  return new Date().toISOString().slice(0, 10);
}

function addMonths(dateString, months) {
  if (!Number.isInteger(months)) {
    return null;
  }
  const date = new Date(`${dateString}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  date.setUTCMonth(date.getUTCMonth() + months);
  return date.toISOString().slice(0, 10);
}

function isIsoDate(dateString) {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateString) &&
    new Date(`${dateString}T00:00:00Z`).toISOString().slice(0, 10) === dateString;
}

function listFilesRecursive(root) {
  const files = [];

  if (!fs.existsSync(root)) {
    return files;
  }

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const entryPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFilesRecursive(entryPath));
    } else {
      files.push(entryPath);
    }
  }

  return files;
}

function parseWikiMetadata(content) {
  const match = content.match(/^<!--\nmetadata:\n([\s\S]*?)\n-->/);
  if (!match) {
    return null;
  }

  const metadata = {};
  for (const line of match[1].split("\n")) {
    const fieldMatch = line.match(/^  ([a-z_]+):\s*(.+)$/);
    if (!fieldMatch) {
      continue;
    }
    let value = fieldMatch[2].trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    metadata[fieldMatch[1]] = value;
  }
  return metadata;
}

function validateWikiLinks(repoRoot, filePath, content, errors) {
  for (const match of content.matchAll(/!?\[[^\]]+\]\(([^)]+)\)/g)) {
    const href = match[1].trim();
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:")
    ) {
      continue;
    }

    const withoutAnchor = href.split("#")[0];
    if (!withoutAnchor) {
      continue;
    }

    const target = path.normalize(path.join(path.dirname(filePath), withoutAnchor));
    if (!fs.existsSync(target)) {
      errors.push(
        `wiki link target does not exist: ${normalizeRelativePath(path.relative(repoRoot, filePath))} -> ${href}`
      );
    }
  }
}

function validateWikiFile(repoRoot, skill, wikiFile, errors, warnings) {
  const content = fs.readFileSync(wikiFile, "utf8");
  const relativeWikiFile = normalizeRelativePath(path.relative(repoRoot, wikiFile));
  const metadata = parseWikiMetadata(content);
  if (!metadata) {
    errors.push(`wiki file is missing metadata block: ${relativeWikiFile}`);
    return;
  }

  for (const field of WIKI_REQUIRED_FIELDS) {
    if (!metadata[field]) {
      errors.push(`wiki metadata is missing '${field}': ${relativeWikiFile}`);
    }
  }

  for (const [field, allowedValues] of Object.entries(WIKI_ENUMS)) {
    if (metadata[field] && !allowedValues.includes(metadata[field])) {
      errors.push(
        `wiki metadata '${field}' has invalid value '${metadata[field]}': ${relativeWikiFile}`
      );
    }
  }

  for (const field of ["last_reviewed", "review_by"]) {
    if (metadata[field] && !isIsoDate(metadata[field])) {
      errors.push(`wiki metadata '${field}' must be an ISO date: ${relativeWikiFile}`);
    }
  }

  if (
    metadata.last_reviewed &&
    metadata.review_by &&
    isIsoDate(metadata.last_reviewed) &&
    isIsoDate(metadata.review_by)
  ) {
    if (metadata.review_by <= metadata.last_reviewed) {
      errors.push(`wiki review_by must be later than last_reviewed: ${relativeWikiFile}`);
    }
    if (metadata.review_by < isoToday()) {
      warnings.push(`wiki review_by is stale: ${relativeWikiFile}`);
    }
  }

  if (
    metadata.confidence &&
    metadata.last_reviewed &&
    metadata.review_by &&
    isIsoDate(metadata.last_reviewed) &&
    isIsoDate(metadata.review_by)
  ) {
    const expectedReviewBy = addMonths(metadata.last_reviewed, WIKI_REVIEW_MONTHS[metadata.confidence]);
    if (expectedReviewBy && metadata.review_by !== expectedReviewBy) {
      warnings.push(
        `wiki review interval should be ${WIKI_REVIEW_MONTHS[metadata.confidence]} month(s) for ${metadata.confidence}: ${relativeWikiFile}`
      );
    }
  }

  const h1Match = content.match(/^#\s+(.+)$/m);
  if (!h1Match) {
    errors.push(`wiki file is missing H1: ${relativeWikiFile}`);
  } else if (metadata.title && metadata.title !== h1Match[1].trim()) {
    errors.push(`wiki metadata title does not match H1: ${relativeWikiFile}`);
  }

  if (metadata.module && metadata.module !== skill.name) {
    errors.push(
      `wiki metadata module '${metadata.module}' does not match folder '${skill.name}': ${relativeWikiFile}`
    );
  }

  validateWikiLinks(repoRoot, wikiFile, content, errors);
}

function validateWikiFiles(repoRoot, config, errors, warnings) {
  for (const skill of config.skills ?? []) {
    const source = path.join(repoRoot, skill.source);
    const skillFile = path.join(source, "SKILL.md");
    const wikiFolder = path.join(source, "wiki");

    if (!fs.existsSync(wikiFolder)) {
      continue;
    }

    if (fs.existsSync(skillFile)) {
      const skillContent = fs.readFileSync(skillFile, "utf8");
      if (!/^## Wiki context$/m.test(skillContent)) {
        errors.push(`skill with wiki folder is missing ## Wiki context: ${skill.source}/SKILL.md`);
      }
    }

    for (const wikiFile of listFilesRecursive(wikiFolder).filter((file) => file.endsWith(".md"))) {
      validateWikiFile(repoRoot, skill, wikiFile, errors, warnings);
    }
  }
}

function validateGeminiWikiMirror(repoRoot, config, errors) {
  for (const skill of config.skills ?? []) {
    const sourceWiki = path.join(repoRoot, skill.source, "wiki");
    if (!fs.existsSync(sourceWiki)) {
      continue;
    }

    const mirrorWiki = path.join(repoRoot, "skills", skill.name, "wiki");
    if (!fs.existsSync(mirrorWiki)) {
      errors.push(`root Gemini extension skill wiki is missing: skills/${skill.name}/wiki`);
      continue;
    }

    const sourceFiles = listFilesRecursive(sourceWiki);
    for (const sourceFile of sourceFiles) {
      const relativeFile = path.relative(sourceWiki, sourceFile);
      const mirrorFile = path.join(mirrorWiki, relativeFile);
      if (!fs.existsSync(mirrorFile)) {
        errors.push(
          `root Gemini extension skill wiki file is missing: ${normalizeRelativePath(path.join("skills", skill.name, "wiki", relativeFile))}`
        );
        continue;
      }
      if (fs.readFileSync(sourceFile, "utf8") !== fs.readFileSync(mirrorFile, "utf8")) {
        errors.push(
          `root Gemini extension skill wiki file differs from source: ${normalizeRelativePath(path.join("skills", skill.name, "wiki", relativeFile))}`
        );
      }
    }
  }
}

function validateGeminiMarketplaceLayout(repoRoot, config, packageMetadata, errors) {
  const providerSpec = config.providers?.["gemini-cli"];
  if (!providerSpec) {
    return;
  }

  const manifestPath = path.join(repoRoot, "gemini-extension.json");
  if (!fs.existsSync(manifestPath)) {
    errors.push("root Gemini extension manifest is missing: gemini-extension.json");
    return;
  }

  let manifest;
  try {
    manifest = readJsonFile(manifestPath);
  } catch {
    errors.push("root Gemini extension manifest is not valid JSON: gemini-extension.json");
    return;
  }

  if (manifest.name !== packageMetadata.name) {
    errors.push(
      `root gemini-extension.json name '${manifest.name ?? "missing"}' does not match package.json name '${packageMetadata.name}'`
    );
  }
  if (manifest.version !== packageMetadata.version) {
    errors.push(
      `root gemini-extension.json version '${manifest.version ?? "missing"}' does not match package.json version '${packageMetadata.version}'`
    );
  }
  if (!manifest.description) {
    errors.push("root gemini-extension.json description is missing");
  }

  const contextFileName = manifest.contextFileName ?? "GEMINI.md";
  const contextPath = path.join(repoRoot, contextFileName);
  if (!fs.existsSync(contextPath)) {
    errors.push(`root Gemini extension context file is missing: ${contextFileName}`);
  }

  for (const command of providerSpec.commands ?? []) {
    const relativeCommandPath = path.join("commands", "agentkit-seo", path.basename(command.source));
    if (!fs.existsSync(path.join(repoRoot, relativeCommandPath))) {
      errors.push(`root Gemini extension command is missing: ${normalizeRelativePath(relativeCommandPath)}`);
    }
  }

  for (const skill of config.skills ?? []) {
    const skillFile = path.join(repoRoot, "skills", skill.name, "SKILL.md");
    if (!fs.existsSync(skillFile)) {
      errors.push(`root Gemini extension skill is missing: skills/${skill.name}/SKILL.md`);
    }
  }

  validateGeminiWikiMirror(repoRoot, config, errors);
}

export function doctor(repoRoot, config) {
  const errors = [];
  const warnings = [];
  const packageMetadata = config.package;
  const packageJson = readJsonFile(path.join(repoRoot, "package.json"));
  const seenSkills = new Set();
  const contextTemplate = path.join(
    repoRoot,
    "hub",
    "agent-context-optimization",
    "templates",
    "context-file-template.md"
  );

  if (!packageMetadata.name) {
    errors.push("package name is missing");
  }
  if (!semverish(packageMetadata.version)) {
    errors.push(`package version is not semver-like: ${packageMetadata.version}`);
  }
  if (!packageMetadata.description) {
    errors.push("package description is missing");
  }
  if (!Array.isArray(packageJson.files) || packageJson.files.length === 0) {
    errors.push("package.json files array is missing or empty");
  } else {
    const requiredPackagePaths = [
      ".skills/agent-skill",
      ".skills/architecture.md",
      ".skills/export",
      ".skills/providers",
      ".assets/docs/getting-started.md",
      ".assets/docs/end-to-end-workflows.md",
      "hub/agent-context-optimization/templates/context-file-template.md",
      "AGENTS.md",
      "MAINTAINING.md",
      "llms.txt",
      "llms-full.txt"
    ];
    for (const requiredPath of requiredPackagePaths) {
      if (!packageFileIncludes(packageJson.files, requiredPath)) {
        errors.push(`package.json files does not include required runtime path: ${requiredPath}`);
      }
    }
  }

  if (!Array.isArray(config.skills) || config.skills.length === 0) {
    errors.push("no skills configured");
  }
  if (!fs.existsSync(contextTemplate)) {
    errors.push("context template is missing: hub/agent-context-optimization/templates/context-file-template.md");
  }

  for (const skill of config.skills ?? []) {
    if (seenSkills.has(skill.name)) {
      errors.push(`duplicate skill configured: ${skill.name}`);
    }
    seenSkills.add(skill.name);

    const source = path.join(repoRoot, skill.source);
    const skillFile = path.join(source, "SKILL.md");
    if (!fs.existsSync(source)) {
      errors.push(`skill source does not exist: ${skill.source}`);
      continue;
    }
    if (!fs.existsSync(skillFile)) {
      errors.push(`skill is missing SKILL.md: ${skill.source}`);
      continue;
    }

    const frontmatterName = readSkillName(skillFile);
    if (frontmatterName !== skill.name) {
      errors.push(
        `${skill.source}/SKILL.md name '${frontmatterName ?? "missing"}' does not match config '${skill.name}'`
      );
    }
  }

  if (!config.providers || Object.keys(config.providers).length === 0) {
    errors.push("no providers configured");
  }

  for (const [provider, providerSpec] of Object.entries(config.providers ?? {})) {
    validateProvider(repoRoot, provider, providerSpec, packageMetadata, errors);
  }
  validateWikiFiles(repoRoot, config, errors, warnings);
  validateGeminiMarketplaceLayout(repoRoot, config, packageMetadata, errors);

  for (const warning of warnings) {
    console.warn(`warning: ${warning}`);
  }

  if (errors.length > 0) {
    for (const error of errors) {
      console.error(`error: ${error}`);
    }
    throw new Error(`doctor found ${errors.length} issue(s)`);
  }

  console.log(`ok: package ${packageMetadata.name}@${packageMetadata.version}`);
  console.log(`ok: ${config.skills.length} skill source(s)`);
  console.log(`ok: ${Object.keys(config.providers).length} provider adapter(s)`);
  console.log("ok: context template available");
  console.log("ok: wiki files valid");
  console.log("ok: provider metadata versions match package.json");
}
