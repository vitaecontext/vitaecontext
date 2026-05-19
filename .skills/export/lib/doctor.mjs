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
}

export function doctor(repoRoot, config) {
  const errors = [];
  const packageMetadata = config.package;
  const packageJson = readJsonFile(path.join(repoRoot, "package.json"));
  const seenSkills = new Set();
  const contextTemplate = path.join(
    repoRoot,
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
      ".skills/export",
      ".skills/providers",
      "agent-context-optimization/templates/context-file-template.md"
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
    errors.push("context template is missing: agent-context-optimization/templates/context-file-template.md");
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
  validateGeminiMarketplaceLayout(repoRoot, config, packageMetadata, errors);

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
  console.log("ok: provider metadata versions match package.json");
}
