#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const PACKAGE_NAME = "agentkit-seo";

function usage() {
  console.log(`AgentKit SEO CLI

Usage:
  agentkit-seo version
  agentkit-seo doctor
  agentkit-seo export --provider <provider|all> --output <dir> [--force]
  agentkit-seo install --provider <provider> [--project-root <dir>|--target-dir <dir>] [--commands-target-dir <dir>] [--force]
  agentkit-seo install --provider shared --target-dir <dir> [--force]
  agentkit-seo template context [--output <file>] [--force]
  agentkit-seo list providers
  agentkit-seo list skills
  agentkit-seo list commands --provider <provider>
`);
}

function parseFlags(args) {
  const flags = {};

  for (let index = 0; index < args.length; index += 1) {
    const token = args[index];
    if (!token.startsWith("--")) {
      throw new Error(`Unexpected argument: ${token}`);
    }
    const key = token.slice(2);
    if (key === "force") {
      flags.force = true;
      continue;
    }
    const value = args[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for flag: ${token}`);
    }
    flags[key] = value;
    index += 1;
  }

  return flags;
}

function repoRootFromScript() {
  let currentDirectory = path.dirname(fileURLToPath(import.meta.url));

  while (true) {
    const packagePath = path.join(currentDirectory, "package.json");
    if (fs.existsSync(packagePath)) {
      try {
        const packageJson = readJsonFile(packagePath);
        if (packageJson.name === PACKAGE_NAME) {
          return currentDirectory;
        }
      } catch {
        // Ignore invalid JSON outside the package root and keep walking upward.
      }
    }

    const parentDirectory = path.dirname(currentDirectory);
    if (parentDirectory === currentDirectory) {
      throw new Error(
        `Could not locate the ${PACKAGE_NAME} package root from script path ${fileURLToPath(import.meta.url)}`
      );
    }
    currentDirectory = parentDirectory;
  }
}

function loadPackageMetadata(repoRoot) {
  const packagePath = path.join(repoRoot, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  return {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description
  };
}

function loadConfig(repoRoot) {
  const configPath = path.join(repoRoot, ".skills", "export", "export-config.json");
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const packageMetadata = loadPackageMetadata(repoRoot);
  return {
    ...config,
    package: {
      ...config.package,
      ...packageMetadata
    }
  };
}

function ensureCleanDirectory(targetPath, force) {
  if (fs.existsSync(targetPath)) {
    if (!force) {
      throw new Error(`Export target already exists: ${targetPath}. Use --force to replace it.`);
    }
    fs.rmSync(targetPath, { recursive: true, force: true });
  }
  fs.mkdirSync(targetPath, { recursive: true });
}

function removeIfExists(targetPath) {
  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true });
  }
}

function expandUserPath(targetPath) {
  if (targetPath === "~") {
    return os.homedir();
  }
  if (targetPath.startsWith("~/")) {
    return path.join(os.homedir(), targetPath.slice(2));
  }
  return targetPath;
}

function normalizeRelativePath(filePath) {
  return filePath.split(path.sep).join("/");
}

function trimTrailingSlash(filePath) {
  return normalizeRelativePath(filePath).replace(/\/+$/, "");
}

function uniquePaths(paths) {
  const seen = new Set();
  const unique = [];
  for (const entry of paths) {
    if (!entry) {
      continue;
    }
    const resolved = path.resolve(entry);
    if (seen.has(resolved)) {
      continue;
    }
    seen.add(resolved);
    unique.push(resolved);
  }
  return unique;
}

function readJsonFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJsonFile(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function semverish(version) {
  return /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(version);
}

function packageFileIncludes(packageFiles, requiredPath) {
  const normalizedRequired = trimTrailingSlash(requiredPath);
  return packageFiles.some((entry) => {
    const normalizedEntry = trimTrailingSlash(entry);
    return (
      normalizedRequired === normalizedEntry ||
      normalizedRequired.startsWith(`${normalizedEntry}/`)
    );
  });
}

function executableExists(candidate) {
  if (!candidate) {
    return false;
  }

  const pathEntries = (process.env.PATH ?? "").split(path.delimiter).filter(Boolean);
  const pathext =
    process.platform === "win32"
      ? (process.env.PATHEXT ?? ".EXE;.CMD;.BAT;.COM")
        .split(";")
        .filter(Boolean)
      : [""];

  if (path.isAbsolute(candidate)) {
    const absoluteCandidates =
      process.platform === "win32" && path.extname(candidate) === ""
        ? pathext.map((extension) => `${candidate}${extension.toLowerCase()}`)
        : [candidate];
    return absoluteCandidates.some((filePath) => {
      try {
        return fs.statSync(filePath).isFile();
      } catch {
        return false;
      }
    });
  }

  return pathEntries.some((entry) =>
    pathext.some((extension) => {
      const filePath = path.join(
        entry,
        process.platform === "win32" ? `${candidate}${extension.toLowerCase()}` : candidate
      );
      try {
        return fs.statSync(filePath).isFile();
      } catch {
        return false;
      }
    })
  );
}

function detectProviderExecutable(commands = []) {
  for (const command of commands) {
    if (executableExists(command)) {
      return command;
    }
  }
  return null;
}

function detectProviderBinaryOnPath(commands = []) {
  for (const command of commands) {
    const result = spawnSync(command, ["--version"], { stdio: "ignore" });
    if (!result.error) {
      return command;
    }
  }
  return null;
}

function getProviderRuntimeHints(provider, providerSpec) {
  const globalTarget = providerSpec.globalTarget
    ? path.resolve(expandUserPath(providerSpec.globalTarget))
    : null;

  const hints = {
    "claude-code": {
      displayName: "Claude Code",
      commands: ["claude"],
      configRoots: [path.join(os.homedir(), ".claude")],
      installHint:
        "Install Claude Code first or use --project-root/--target-dir to preview the skill bundle in a custom location."
    },
    codex: {
      displayName: "Codex",
      commands: ["codex"],
      configRoots: [
        process.env.CODEX_HOME ? path.resolve(process.env.CODEX_HOME) : null,
        path.join(os.homedir(), ".codex"),
        path.join(os.homedir(), ".agents", "skills")
      ].filter(Boolean),
      installHint:
        "Install Codex first or set CODEX_HOME/--target-dir if this machine uses a non-default skills location. AgentKit SEO also writes ~/.agents/skills for Codex compatibility."
    },
    "gemini-cli": {
      displayName: "Gemini CLI",
      commands: ["gemini"],
      configRoots: [path.join(os.homedir(), ".gemini")],
      installHint:
        "Install Gemini CLI first or rerun with --target-dir to generate the extension bundle in a custom location."
    },
    opencode: {
      displayName: "OpenCode",
      commands: ["opencode"],
      configRoots: [path.join(os.homedir(), ".config", "opencode"), path.join(os.homedir(), ".opencode")],
      installHint:
        "Install OpenCode first or rerun with --project-root/--target-dir if this machine uses a different skills directory."
    }
  };

  const providerHints = hints[provider];
  if (!providerHints) {
    return null;
  }

  return {
    ...providerHints,
    globalTarget
  };
}

function warnIfProviderRuntimeLooksMissing(provider, providerSpec, flags, targetRoot) {
  const hints = getProviderRuntimeHints(provider, providerSpec);
  if (!hints) {
    return;
  }

  const foundExecutable = detectProviderExecutable(hints.commands) ?? detectProviderBinaryOnPath(hints.commands);
  const foundConfigRoot = hints.configRoots.find((root) => root && fs.existsSync(root)) ?? null;
  const explicitTarget = Boolean(flags["target-dir"] || flags["project-root"]);

  if (!foundExecutable && !foundConfigRoot) {
    console.warn(
      `warning: ${hints.displayName} was not detected on this machine. AgentKit SEO will still install files to ${targetRoot}. ${hints.installHint}`
    );
    return;
  }

  if (!explicitTarget && !foundConfigRoot && hints.globalTarget) {
    console.warn(
      `warning: ${hints.displayName} was not detected in its usual config location. AgentKit SEO is creating ${hints.globalTarget}. If this machine uses a different location, rerun with --target-dir or --project-root.`
    );
  }
}

function formatFilesystemInstallError(error, provider, targetRoot, commandTargetRoot) {
  if (!error || typeof error !== "object" || !("code" in error)) {
    return error;
  }

  const commandTargetSuffix =
    commandTargetRoot && commandTargetRoot !== targetRoot
      ? ` Command target: ${commandTargetRoot}.`
      : "";

  if (error.code === "EACCES" || error.code === "EPERM") {
    return new Error(
      `Install failed for ${provider} because the target path is not writable: ${targetRoot}.${commandTargetSuffix} Try --project-root for a local install, choose a writable --target-dir, or rerun with permissions that allow writes to the provider directory.`
    );
  }

  if (error.code === "ENOENT") {
    return new Error(
      `Install failed for ${provider} because a required source or parent directory was not found. Install root: ${targetRoot}.${commandTargetSuffix} Run 'agentkit-seo doctor' to verify the package contents, then rerun with an explicit --target-dir if needed.`
    );
  }

  return error;
}

function readSkillName(skillFilePath) {
  const content = fs.readFileSync(skillFilePath, "utf8");
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return null;
  }
  const nameMatch = match[1].match(/^name:\s*(.+)$/m);
  return nameMatch ? nameMatch[1].trim() : null;
}

function shouldCopySkillPath(skillRoot, sourcePath, excludedPaths) {
  if (!excludedPaths || excludedPaths.length === 0) {
    return true;
  }

  const relativePath = normalizeRelativePath(path.relative(skillRoot, sourcePath));
  return !excludedPaths.some(
    (excludedPath) => relativePath === excludedPath || relativePath.startsWith(`${excludedPath}/`)
  );
}

function copySkillFolders(repoRoot, skills, targetRoot, excludedPaths = []) {
  const exported = [];

  for (const skill of skills) {
    const source = path.join(repoRoot, skill.source);
    const destination = path.join(targetRoot, skill.name);
    if (!fs.existsSync(source)) {
      throw new Error(`Skill source does not exist: ${source}`);
    }
    fs.cpSync(source, destination, {
      recursive: true,
      filter: (sourcePath) => shouldCopySkillPath(source, sourcePath, excludedPaths)
    });
    exported.push(skill.name);
  }

  return exported;
}

function syncJsonPackageVersion(targetPath, packageMetadata) {
  const json = readJsonFile(targetPath);
  json.version = packageMetadata.version;
  writeJsonFile(targetPath, json);
}

function copyProviderFiles(repoRoot, files, targetRoot, force, packageMetadata) {
  const copied = [];

  if (!files || files.length === 0) {
    return copied;
  }

  fs.mkdirSync(targetRoot, { recursive: true });

  for (const file of files) {
    const source = path.join(repoRoot, file.source);
    const destination = path.join(targetRoot, file.target ?? path.basename(file.source));
    if (!fs.existsSync(source)) {
      throw new Error(`Provider file source does not exist: ${source}`);
    }
    if (fs.existsSync(destination)) {
      if (!force) {
        throw new Error(
          `Provider file target already exists: ${destination}. Use --force to replace AgentKit SEO provider files.`
        );
      }
      removeIfExists(destination);
    }
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.cpSync(source, destination, { recursive: true });
    if (file.syncPackageVersion) {
      syncJsonPackageVersion(destination, packageMetadata);
    }
    copied.push(path.relative(targetRoot, destination));
  }

  return copied;
}

function copyCommandFiles(repoRoot, commands, targetRoot, force) {
  const copied = [];

  if (!commands || commands.length === 0) {
    return copied;
  }

  fs.mkdirSync(targetRoot, { recursive: true });

  for (const command of commands) {
    const source = path.join(repoRoot, command.source);
    const destination = path.join(targetRoot, path.basename(command.source));
    if (!fs.existsSync(source)) {
      throw new Error(`Command source does not exist: ${source}`);
    }
    if (fs.existsSync(destination)) {
      if (!force) {
        throw new Error(
          `Command target already exists: ${destination}. Use --force to replace AgentKit SEO command files.`
        );
      }
      removeIfExists(destination);
    }
    fs.cpSync(source, destination);
    copied.push(command.name);
  }

  return copied;
}

function installSkillFolders(repoRoot, skills, targetRoot, force, excludedPaths = []) {
  const installed = [];

  fs.mkdirSync(targetRoot, { recursive: true });

  for (const skill of skills) {
    const source = path.join(repoRoot, skill.source);
    const destination = path.join(targetRoot, skill.name);
    if (!fs.existsSync(source)) {
      throw new Error(`Skill source does not exist: ${source}`);
    }
    if (fs.existsSync(destination)) {
      if (!force) {
        throw new Error(
          `Install target already exists: ${destination}. Use --force to replace AgentKit SEO skill folders.`
        );
      }
      removeIfExists(destination);
    }
    fs.cpSync(source, destination, {
      recursive: true,
      filter: (sourcePath) => shouldCopySkillPath(source, sourcePath, excludedPaths)
    });
    installed.push(skill.name);
  }

  return installed;
}

function writeBundleManifest(bundleRoot, provider, config, exportedSkills) {
  const providerSpec = config.providers[provider];
  const manifest = {
    package: config.package,
    provider,
    exported_at: new Date().toISOString(),
    skills: exportedSkills,
    commands: providerSpec.commands?.map((command) => command.name) ?? [],
    layout: providerSpec.layout
  };
  const manifestPath = path.join(bundleRoot, "agentkit-seo-export.json");
  writeJsonFile(manifestPath, manifest);
}

function writeInstallManifest(
  targetRoot,
  provider,
  config,
  installedSkills,
  installedCommands,
  skillTargetRoot,
  commandTargetRoot,
  skillTargetRoots = null
) {
  const providerSpec = config.providers[provider];
  const manifest = {
    package: config.package,
    provider,
    installed_at: new Date().toISOString(),
    skills: installedSkills,
    commands: installedCommands,
    layout: providerSpec.layout,
    skill_target: skillTargetRoot,
    skill_targets: skillTargetRoots ?? [skillTargetRoot],
    command_target: commandTargetRoot
  };
  const manifestPath = path.join(targetRoot, "agentkit-seo-install.json");
  writeJsonFile(manifestPath, manifest);
  return manifestPath;
}

function exportProvider(repoRoot, outputRoot, provider, config, force) {
  const providerSpec = config.providers[provider];
  const bundleRoot = path.join(outputRoot, provider);
  ensureCleanDirectory(bundleRoot, force);

  if (providerSpec.files) {
    copyProviderFiles(repoRoot, providerSpec.files, bundleRoot, force, config.package);
  }

  const skillTarget = providerSpec.skillTarget ?? ".";
  const targetRoot =
    providerSpec.layout === "gemini-extension"
      ? path.join(bundleRoot, skillTarget)
      : path.join(bundleRoot, providerSpec.target);
  fs.mkdirSync(targetRoot, { recursive: true });

  const exportedSkills = copySkillFolders(
    repoRoot,
    config.skills,
    targetRoot,
    providerSpec.skillExcludes
  );
  const additionalTargets = providerSpec.additionalTargets ?? [];
  const additionalRoots = uniquePaths(
    additionalTargets.map((target) => path.join(bundleRoot, target))
  ).filter((target) => path.resolve(target) !== path.resolve(targetRoot));
  for (const additionalRoot of additionalRoots) {
    fs.mkdirSync(additionalRoot, { recursive: true });
    copySkillFolders(repoRoot, config.skills, additionalRoot, providerSpec.skillExcludes);
  }
  if (providerSpec.commandTarget && providerSpec.commands) {
    const commandRoot = path.join(bundleRoot, providerSpec.commandTarget);
    copyCommandFiles(repoRoot, providerSpec.commands, commandRoot, force);
  }
  writeBundleManifest(bundleRoot, provider, config, exportedSkills);
}

function resolveInstallRoot(flags, providerSpec, provider) {
  if (flags["target-dir"]) {
    return path.resolve(expandUserPath(flags["target-dir"]));
  }

  if (provider === "shared") {
    throw new Error(
      "Shared installs require --target-dir because there is no single default workspace location."
    );
  }

  if (flags["project-root"]) {
    return path.resolve(flags["project-root"], providerSpec.target);
  }

  if (providerSpec.homeEnv && process.env[providerSpec.homeEnv]) {
    return path.resolve(process.env[providerSpec.homeEnv], "skills");
  }

  if (providerSpec.globalTarget) {
    return path.resolve(expandUserPath(providerSpec.globalTarget));
  }

  throw new Error(
    `Provider '${provider}' installs require --project-root or --target-dir because no default target is configured.`
  );
}

function resolveCommandInstallRoot(flags, providerSpec) {
  if (!providerSpec.commandTarget || !providerSpec.commands) {
    return null;
  }

  if (flags["commands-target-dir"]) {
    return path.resolve(expandUserPath(flags["commands-target-dir"]));
  }

  if (flags["target-dir"]) {
    return null;
  }

  if (flags["project-root"]) {
    return path.resolve(flags["project-root"], providerSpec.commandTarget);
  }

  if (providerSpec.globalCommandTarget) {
    return path.resolve(expandUserPath(providerSpec.globalCommandTarget));
  }

  return null;
}

function resolveAdditionalSkillInstallRoots(flags, providerSpec) {
  if (flags["target-dir"]) {
    return [];
  }

  if (flags["project-root"]) {
    return (providerSpec.additionalTargets ?? []).map((target) =>
      path.resolve(flags["project-root"], target)
    );
  }

  return (providerSpec.additionalGlobalTargets ?? []).map((target) =>
    path.resolve(expandUserPath(target))
  );
}

function installProvider(repoRoot, provider, config, flags) {
  const providerSpec = config.providers[provider];
  const targetRoot = resolveInstallRoot(flags, providerSpec, provider);
  const skillTargetRoot =
    providerSpec.layout === "gemini-extension"
      ? path.join(targetRoot, providerSpec.skillTarget ?? "skills")
      : targetRoot;
  const additionalSkillTargets = resolveAdditionalSkillInstallRoots(flags, providerSpec);
  const skillTargetRoots = uniquePaths([skillTargetRoot, ...additionalSkillTargets]);
  const commandTargetRoot =
    providerSpec.layout === "gemini-extension"
      ? path.join(targetRoot, providerSpec.commandTarget)
      : resolveCommandInstallRoot(flags, providerSpec);

  warnIfProviderRuntimeLooksMissing(provider, providerSpec, flags, targetRoot);

  let installedSkills = [];
  let installedCommands = [];
  let manifestPath = null;

  try {
    if (providerSpec.files) {
      copyProviderFiles(repoRoot, providerSpec.files, targetRoot, Boolean(flags.force), config.package);
    }
    for (const [index, skillTarget] of skillTargetRoots.entries()) {
      const result = installSkillFolders(
        repoRoot,
        config.skills,
        skillTarget,
        Boolean(flags.force),
        providerSpec.skillExcludes
      );
      if (index === 0) {
        installedSkills = result;
      }
    }
    installedCommands = commandTargetRoot
      ? copyCommandFiles(repoRoot, providerSpec.commands, commandTargetRoot, Boolean(flags.force))
      : [];
    manifestPath = writeInstallManifest(
      targetRoot,
      provider,
      config,
      installedSkills,
      installedCommands,
      skillTargetRoot,
      commandTargetRoot,
      skillTargetRoots
    );
  } catch (error) {
    throw formatFilesystemInstallError(error, provider, targetRoot, commandTargetRoot);
  }

  console.log(`Installed ${installedSkills.length} skill folder(s) for ${provider}`);
  console.log(`- target: ${skillTargetRoot}`);
  if (skillTargetRoots.length > 1) {
    console.log(`- additional skill targets: ${skillTargetRoots.slice(1).join(", ")}`);
  }
  if (installedCommands.length > 0) {
    console.log(`Installed ${installedCommands.length} command file(s) for ${provider}`);
    console.log(`- commands target: ${commandTargetRoot}`);
  }
  console.log(`- manifest: ${manifestPath}`);
  if (providerSpec.layout === "gemini-extension") {
    console.log(`- extension target: ${targetRoot}`);
  }
}

function showVersion(config) {
  console.log(`${config.package.name} ${config.package.version}`);
  if (config.package.description) {
    console.log(config.package.description);
  }
}

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

function doctor(repoRoot, config) {
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

function templateContext(repoRoot, flags) {
  const source = path.join(
    repoRoot,
    "agent-context-optimization",
    "templates",
    "context-file-template.md"
  );
  if (!fs.existsSync(source)) {
    throw new Error(`Context template does not exist: ${source}`);
  }

  if (!flags.output) {
    process.stdout.write(fs.readFileSync(source, "utf8"));
    return;
  }

  const destination = path.resolve(expandUserPath(flags.output));
  if (fs.existsSync(destination) && !flags.force) {
    throw new Error(`Template output already exists: ${destination}. Use --force to replace it.`);
  }
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.cpSync(source, destination);
  console.log(`Wrote context template to ${destination}`);
}

function listProviders(config) {
  for (const provider of Object.keys(config.providers).sort()) {
    console.log(provider);
  }
}

function listSkills(config) {
  for (const skill of config.skills) {
    console.log(skill.name);
  }
}

function listCommands(config, provider) {
  const providerSpec = config.providers[provider];
  if (!providerSpec) {
    const available = Object.keys(config.providers).sort().join(", ");
    throw new Error(`Unknown provider '${provider}'. Available: ${available}`);
  }
  for (const command of providerSpec.commands ?? []) {
    console.log(command.name);
  }
}

function run() {
  const [, , command, ...rest] = process.argv;
  if (!command || command === "help" || command === "--help" || command === "-h") {
    usage();
    return;
  }

  const repoRoot = repoRootFromScript();
  const config = loadConfig(repoRoot);

  if (command === "version") {
    showVersion(config);
    return;
  }

  if (command === "doctor") {
    parseFlags(rest);
    doctor(repoRoot, config);
    return;
  }

  if (command === "template") {
    const subject = rest[0];
    const flags = parseFlags(rest.slice(1));
    if (subject === "context") {
      templateContext(repoRoot, flags);
      return;
    }
    throw new Error("Usage: agentkit-seo template context [--output <file>] [--force]");
  }

  if (command === "list") {
    const subject = rest[0];
    const flags = parseFlags(rest.slice(1));
    if (subject === "providers") {
      listProviders(config);
      return;
    }
    if (subject === "skills") {
      listSkills(config);
      return;
    }
    if (subject === "commands") {
      if (!flags.provider) {
        throw new Error("Usage: agentkit-seo list commands --provider <provider>");
      }
      listCommands(config, flags.provider);
      return;
    }
    throw new Error("Usage: agentkit-seo list providers|skills|commands --provider <provider>");
  }

  if (command === "install") {
    const flags = parseFlags(rest);
    if (!flags.provider) {
      throw new Error(
        "Usage: agentkit-seo install --provider <provider> [--project-root <dir>|--target-dir <dir>] [--commands-target-dir <dir>] [--force]"
      );
    }
    if (flags.provider === "all") {
      throw new Error("Install accepts one provider at a time so destinations stay explicit.");
    }
    if (!config.providers[flags.provider]) {
      const available = Object.keys(config.providers).sort().join(", ");
      throw new Error(`Unknown provider '${flags.provider}'. Available: ${available}`);
    }
    installProvider(repoRoot, flags.provider, config, flags);
    return;
  }

  if (command !== "export") {
    throw new Error(`Unknown command: ${command}`);
  }

  const flags = parseFlags(rest);
  if (!flags.provider || !flags.output) {
    throw new Error("Usage: agentkit-seo export --provider <provider|all> --output <dir> [--force]");
  }

  const providers = config.providers;
  const selected =
    flags.provider === "all"
      ? Object.keys(providers)
      : [flags.provider];

  for (const provider of selected) {
    if (!providers[provider]) {
      const available = [...Object.keys(providers).sort(), "all"].join(", ");
      throw new Error(`Unknown provider '${provider}'. Available: ${available}`);
    }
  }

  const outputRoot = path.resolve(flags.output);
  fs.mkdirSync(outputRoot, { recursive: true });

  for (const provider of selected) {
    exportProvider(repoRoot, outputRoot, provider, config, Boolean(flags.force));
  }

  console.log(`Exported ${selected.length} provider bundle(s) to ${outputRoot}`);
  for (const provider of selected) {
    console.log(`- ${provider}: ${path.join(outputRoot, provider)}`);
  }
}

try {
  run();
} catch (error) {
  console.error(`error: ${error.message}`);
  process.exit(1);
}
