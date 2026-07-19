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

function validateLlmsFullWikiBundle(repoRoot, config, errors) {
  const bundlePath = path.join(repoRoot, "llms-full.txt");
  if (!fs.existsSync(bundlePath)) {
    return;
  }
  const bundle = fs.readFileSync(bundlePath, "utf8");
  for (const skill of config.skills ?? []) {
    const wikiRoot = path.join(repoRoot, skill.source, "wiki");
    for (const wikiFile of listFilesRecursive(wikiRoot).filter((file) => file.endsWith(".md"))) {
      const content = fs.readFileSync(wikiFile, "utf8").trim();
      if (!bundle.includes(content)) {
        errors.push(
          `llms-full.txt does not contain current wiki file: ${normalizeRelativePath(path.relative(repoRoot, wikiFile))}`
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
    const relativeCommandPath = path.join("commands", "vitaecontext", path.basename(command.source));
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

function readSkillFrontmatter(skillFilePath) {
  const content = fs.readFileSync(skillFilePath, "utf8");
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  return match ? match[1] : null;
}

// Enforce the Agent Skills description convention: every skill states what it does
// AND when to use it, within the 1024-character description budget. Agents tend to
// under-trigger skills whose descriptions omit the "when", so this is a hard check.
// Also require an SPDX license so it travels with the installed skill.
function validateSkillDescriptions(repoRoot, config, errors, warnings) {
  for (const skill of config.skills ?? []) {
    const skillFile = path.join(repoRoot, skill.source, "SKILL.md");
    if (!fs.existsSync(skillFile)) {
      continue;
    }
    const frontmatter = readSkillFrontmatter(skillFile);
    if (!frontmatter) {
      errors.push(`${skill.source}/SKILL.md is missing YAML frontmatter`);
      continue;
    }
    const descMatch = frontmatter.match(/^description:\s*(.+)$/m);
    const description = descMatch ? descMatch[1].trim().replace(/^["']|["']$/g, "") : "";
    if (!description) {
      errors.push(`${skill.source}/SKILL.md frontmatter is missing description`);
      continue;
    }
    if (description.length > 1024) {
      errors.push(
        `${skill.source}/SKILL.md description is ${description.length} chars; keep it within 1024 and move detail into references/`
      );
    } else if (description.length > 500) {
      warnings.push(
        `${skill.source}/SKILL.md description is ${description.length} chars; aim for under 500 so the trigger stays sharp`
      );
    }
    if (!/\buse\b[\s\S]*\bwhen\b/i.test(description)) {
      errors.push(
        `${skill.source}/SKILL.md description must state when to use the skill (include a "Use when ..." clause)`
      );
    }
    if (!/^license:\s*\S+/m.test(frontmatter)) {
      errors.push(`${skill.source}/SKILL.md frontmatter is missing a license field`);
    }
  }
}

function validateRuntimeContracts(repoRoot, config, errors) {
  const bundleRoot = path.resolve(repoRoot, ".skills", "agent-skill");
  const routingPath = path.join(
    repoRoot,
    ".skills",
    "agent-skill",
    "vitaecontext",
    "references",
    "module-routing.md"
  );
  const routing = fs.existsSync(routingPath) ? fs.readFileSync(routingPath, "utf8") : "";

  for (const skill of config.skills ?? []) {
    const sourceRoot = path.resolve(repoRoot, skill.source);
    const skillFile = path.join(sourceRoot, "SKILL.md");
    if (!fs.existsSync(skillFile)) {
      continue;
    }
    const skillContent = fs.readFileSync(skillFile, "utf8");
    if (!/^## Self-review$/m.test(skillContent)) {
      errors.push(`configured runtime skill is missing ## Self-review: ${skill.source}/SKILL.md`);
    }
    if (skill.name !== "vitaecontext" && !routing.includes(`\`${skill.name}\``)) {
      errors.push(`root module routing is missing configured skill: ${skill.name}`);
    }

    for (const markdownFile of listFilesRecursive(sourceRoot).filter((file) => file.endsWith(".md"))) {
      const content = fs.readFileSync(markdownFile, "utf8");
      for (const match of content.matchAll(/!?\[[^\]]+\]\(([^)]+)\)/g)) {
        const href = match[1].trim().split("#")[0];
        if (
          !href ||
          href.startsWith("#") ||
          href.startsWith("http://") ||
          href.startsWith("https://") ||
          href.startsWith("mailto:")
        ) {
          continue;
        }
        const target = path.resolve(path.dirname(markdownFile), href);
        const relativeFile = normalizeRelativePath(path.relative(repoRoot, markdownFile));
        if (!fs.existsSync(target)) {
          errors.push(`runtime skill link target does not exist: ${relativeFile} -> ${href}`);
        } else if (target !== bundleRoot && !target.startsWith(`${bundleRoot}${path.sep}`)) {
          errors.push(`runtime skill relative link escapes portable bundle: ${relativeFile} -> ${href}`);
        }
      }
    }
  }

  const vitaeGraphConsumers = [
    "vitaecontext-cv",
    "vitaecontext-github",
    "vitaecontext-linkedin",
    "vitaecontext-portfolio",
    "vitaecontext-x"
  ];
  const legacyVocabulary = [
    /direction and constraint records/i,
    /target-direction records/i,
    /private evidence and `avoid` records/i
  ];
  for (const skillName of vitaeGraphConsumers) {
    const skillFile = path.join(bundleRoot, skillName, "SKILL.md");
    if (!fs.existsSync(skillFile)) {
      continue;
    }
    const content = fs.readFileSync(skillFile, "utf8");
    for (const pattern of legacyVocabulary) {
      if (pattern.test(content)) {
        errors.push(`runtime skill uses legacy VitaeGraph vocabulary: ${skillName}/SKILL.md`);
      }
    }
  }
}

// Validate the Claude Code marketplace manifests so the /plugin distribution channel
// stays consistent with package.json. Mirrors the gemini-extension version checks.
function validateMarketplace(repoRoot, packageMetadata, errors) {
  const marketplacePath = path.join(repoRoot, ".claude-plugin", "marketplace.json");
  const pluginPath = path.join(repoRoot, ".claude-plugin", "plugin.json");

  if (!fs.existsSync(marketplacePath)) {
    errors.push("Claude Code marketplace manifest is missing: .claude-plugin/marketplace.json");
  } else {
    let marketplace;
    try {
      marketplace = readJsonFile(marketplacePath);
    } catch {
      errors.push(".claude-plugin/marketplace.json is not valid JSON");
      marketplace = null;
    }
    if (marketplace) {
      const entry = Array.isArray(marketplace.plugins)
        ? marketplace.plugins.find((plugin) => plugin?.name === packageMetadata.name)
        : null;
      if (!entry) {
        errors.push(
          `.claude-plugin/marketplace.json has no plugin entry named '${packageMetadata.name}'`
        );
      } else if (entry.version && entry.version !== packageMetadata.version) {
        errors.push(
          `.claude-plugin/marketplace.json plugin version '${entry.version}' does not match package.json version '${packageMetadata.version}'`
        );
      }
    }
  }

  if (!fs.existsSync(pluginPath)) {
    errors.push("Claude Code plugin manifest is missing: .claude-plugin/plugin.json");
    return;
  }
  let plugin;
  try {
    plugin = readJsonFile(pluginPath);
  } catch {
    errors.push(".claude-plugin/plugin.json is not valid JSON");
    return;
  }
  if (plugin.name !== packageMetadata.name) {
    errors.push(
      `.claude-plugin/plugin.json name '${plugin.name ?? "missing"}' does not match package.json name '${packageMetadata.name}'`
    );
  }
  if (plugin.version && plugin.version !== packageMetadata.version) {
    errors.push(
      `.claude-plugin/plugin.json version '${plugin.version}' does not match package.json version '${packageMetadata.version}'`
    );
  }
}

function validateCodexPlugin(repoRoot, config, packageMetadata, errors) {
  const marketplacePath = path.join(repoRoot, ".agents", "plugins", "marketplace.json");
  const pluginRoot = path.join(repoRoot, ".agents", "plugins", "plugins", packageMetadata.name);
  const pluginPath = path.join(pluginRoot, ".codex-plugin", "plugin.json");
  const mirrorRoot = path.join(pluginRoot, "skills");
  if (!fs.existsSync(marketplacePath)) {
    errors.push("Codex marketplace manifest is missing: .agents/plugins/marketplace.json");
    return;
  }
  if (!fs.existsSync(pluginPath)) {
    errors.push("Codex plugin manifest is missing: .agents/plugins/plugins/vitaecontext/.codex-plugin/plugin.json");
    return;
  }
  try {
    const marketplace = readJsonFile(marketplacePath);
    const entry = marketplace.plugins?.find((plugin) => plugin?.name === packageMetadata.name);
    if (!entry) errors.push(`Codex marketplace has no plugin entry named '${packageMetadata.name}'`);
    else {
      if (entry.source?.path !== `./plugins/${packageMetadata.name}`) errors.push("Codex marketplace source path is not canonical");
      if (!entry.policy?.installation || !entry.policy?.authentication || !entry.category) {
        errors.push("Codex marketplace entry is missing policy or category metadata");
      }
    }
    const plugin = readJsonFile(pluginPath);
    if (plugin.name !== packageMetadata.name) errors.push("Codex plugin name does not match package.json");
    if (plugin.version !== packageMetadata.version) errors.push("Codex plugin version does not match package.json");
    if (plugin.skills !== "./skills/") errors.push("Codex plugin skills path must be ./skills/");
  } catch {
    errors.push("Codex plugin or marketplace manifest is not valid JSON");
  }

  const expectedSkills = new Set((config.skills ?? []).map((skill) => skill.name));
  const mirroredSkills = fs.existsSync(mirrorRoot)
    ? fs.readdirSync(mirrorRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name)
    : [];
  for (const skillName of expectedSkills) {
    if (!mirroredSkills.includes(skillName)) errors.push(`Codex plugin skill mirror is missing: ${skillName}`);
  }
  for (const skillName of mirroredSkills) {
    if (!expectedSkills.has(skillName)) errors.push(`Codex plugin includes an unconfigured skill: ${skillName}`);
  }
  for (const skill of config.skills ?? []) {
    const sourceRoot = path.join(repoRoot, skill.source);
    const targetRoot = path.join(mirrorRoot, skill.name);
    for (const sourceFile of listFilesRecursive(sourceRoot)) {
      const relative = path.relative(sourceRoot, sourceFile);
      const targetFile = path.join(targetRoot, relative);
      if (!fs.existsSync(targetFile) || fs.readFileSync(sourceFile, "utf8") !== fs.readFileSync(targetFile, "utf8")) {
        errors.push(`Codex plugin skill mirror differs from source: ${skill.name}/${normalizeRelativePath(relative)}`);
      }
    }
  }
}

function validateReleaseDocs(repoRoot, packageMetadata, errors) {
  const checks = [
    [".assets/docs/current-status.md", `Current package version: \`vitaecontext@${packageMetadata.version}\``],
    [".assets/docs/getting-started.md", `vitaecontext ${packageMetadata.version}`],
    ["CHANGELOG.md", `## ${packageMetadata.version} -`]
  ];
  for (const [relative, expected] of checks) {
    const filePath = path.join(repoRoot, relative);
    if (!fs.existsSync(filePath) || !fs.readFileSync(filePath, "utf8").includes(expected)) {
      errors.push(`${relative} does not identify current package version ${packageMetadata.version}`);
    }
  }
}

function validatePublicContextExamples(repoRoot, errors) {
  const examplesRoot = path.join(repoRoot, "hub", "context-builder", "examples");
  for (const filePath of listFilesRecursive(examplesRoot).filter((entry) => entry.endsWith("career-context.md"))) {
    const content = fs.readFileSync(filePath, "utf8");
    if (!/<!--\s*FICTIONAL EXAMPLE:/i.test(content)) {
      errors.push(`public Career Context example is not explicitly fictional: ${normalizeRelativePath(path.relative(repoRoot, filePath))}`);
    }
  }
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
    "context-builder",
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
      ".agents/plugins",
      ".assets/docs/getting-started.md",
      ".assets/docs/end-to-end-workflows.md",
      "hub/context-builder/templates/context-file-template.md",
      "hub/context-builder/templates/career-context-starter.md",
      "vitaegraph/templates/VITAEGRAPH.md",
      "vitaegraph/schema/record-schema.json",
      "AGENTS.md",
      "CONTRIBUTING.md",
      "MAINTAINING.md",
      "llms.txt",
      "llms-full.txt",
      "SECURITY.md"
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
    errors.push("context template is missing: hub/context-builder/templates/context-file-template.md");
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
  validateSkillDescriptions(repoRoot, config, errors, warnings);
  validateRuntimeContracts(repoRoot, config, errors);
  validateWikiFiles(repoRoot, config, errors, warnings);
  validateLlmsFullWikiBundle(repoRoot, config, errors);
  validateGeminiMarketplaceLayout(repoRoot, config, packageMetadata, errors);
  validateMarketplace(repoRoot, packageMetadata, errors);
  validateCodexPlugin(repoRoot, config, packageMetadata, errors);
  validateReleaseDocs(repoRoot, packageMetadata, errors);
  validatePublicContextExamples(repoRoot, errors);

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
  console.log("ok: skill descriptions state what and when");
  console.log("ok: runtime routing, self-review, and portable links valid");
  console.log("ok: Claude Code marketplace manifests valid");
  console.log("ok: Codex plugin marketplace and skill mirror valid");
  console.log(`ok: ${Object.keys(config.providers).length} provider adapter(s)`);
  console.log("ok: context template available");
  console.log("ok: release docs and fictional public examples valid");
  console.log("ok: wiki files valid");
  console.log("ok: provider metadata versions match package.json");
}
