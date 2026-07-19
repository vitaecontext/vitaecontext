import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";

import { expandUserPath, normalizeRelativePath, readJsonFile, uniquePaths, writeJsonFile } from "./filesystem.mjs";
import { warnIfProviderRuntimeLooksMissing } from "./provider-runtime.mjs";

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
      `Install failed for ${provider} because a required source or parent directory was not found. Install root: ${targetRoot}.${commandTargetSuffix} Run 'vitaecontext doctor' to verify the package contents, then rerun with an explicit --target-dir if needed.`
    );
  }

  return error;
}

function installManifest(
  provider,
  config,
  installedSkills,
  installedCommands,
  skillTargetRoot,
  commandTargetRoot,
  skillTargetRoots = null
) {
  const providerSpec = config.providers[provider];
  return {
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
}

function shouldCopySkillPath(skillRoot, sourcePath, excludedPaths = []) {
  const relativePath = normalizeRelativePath(path.relative(skillRoot, sourcePath));
  return !excludedPaths.some(
    (excludedPath) => relativePath === excludedPath || relativePath.startsWith(`${excludedPath}/`)
  );
}

function assertSkillSupportFolders(source, staged, skillName) {
  for (const folder of ["references", "wiki"]) {
    if (fs.existsSync(path.join(source, folder)) && !fs.existsSync(path.join(staged, folder))) {
      throw new Error(`Skill support folder was not staged for ${skillName}: ${folder}`);
    }
  }
}

function addOperation(operations, operation) {
  const duplicate = operations.find((entry) => entry.destination === operation.destination);
  if (duplicate) throw new Error(`Install plan contains duplicate target: ${operation.destination}`);
  operations.push(operation);
}

function buildInstallPlan(
  repoRoot,
  providerSpec,
  config,
  targetRoot,
  skillTargetRoots,
  commandTargetRoot,
  provider
) {
  const operations = [];
  for (const file of providerSpec.files ?? []) {
    const source = path.join(repoRoot, file.source);
    addOperation(operations, {
      source,
      destination: path.join(targetRoot, file.target ?? path.basename(file.source)),
      syncPackageVersion: Boolean(file.syncPackageVersion)
    });
  }
  for (const skillTargetRoot of skillTargetRoots) {
    for (const skill of config.skills) {
      const source = path.join(repoRoot, skill.source);
      addOperation(operations, {
        source,
        destination: path.join(skillTargetRoot, skill.name),
        skillName: skill.name,
        excludedPaths: providerSpec.skillExcludes ?? []
      });
    }
  }
  for (const command of providerSpec.commands ?? []) {
    if (!commandTargetRoot) break;
    addOperation(operations, {
      source: path.join(repoRoot, command.source),
      destination: path.join(commandTargetRoot, path.basename(command.source))
    });
  }

  const installedSkills = config.skills.map((skill) => skill.name);
  const installedCommands = commandTargetRoot
    ? (providerSpec.commands ?? []).map((command) => command.name)
    : [];
  const manifestPath = path.join(targetRoot, "vitaecontext-install.json");
  addOperation(operations, {
    destination: manifestPath,
    json: installManifest(
      provider,
      config,
      installedSkills,
      installedCommands,
      skillTargetRoots[0],
      commandTargetRoot,
      skillTargetRoots
    )
  });
  return { operations, installedSkills, installedCommands, manifestPath };
}

function preflightInstall(operations, force) {
  for (const operation of operations) {
    if (operation.source && !fs.existsSync(operation.source)) {
      throw new Error(`Install source does not exist: ${operation.source}`);
    }
    if (fs.existsSync(operation.destination) && !force) {
      throw new Error(`Install target already exists: ${operation.destination}. Use --force to replace VitaeContext files.`);
    }
  }
}

function stageInstall(operations, packageMetadata) {
  const stagingRoot = fs.mkdtempSync(path.join(os.tmpdir(), "vitaecontext-install-"));
  try {
    for (const [index, operation] of operations.entries()) {
      const staged = path.join(stagingRoot, String(index));
      operation.staged = staged;
      if (operation.json) {
        writeJsonFile(staged, operation.json);
        continue;
      }
      fs.cpSync(operation.source, staged, {
        recursive: true,
        filter: operation.skillName
          ? (sourcePath) => shouldCopySkillPath(operation.source, sourcePath, operation.excludedPaths)
          : undefined
      });
      if (operation.syncPackageVersion) {
        const json = readJsonFile(staged);
        json.version = packageMetadata.version;
        writeJsonFile(staged, json);
      }
      if (operation.skillName) assertSkillSupportFolders(operation.source, staged, operation.skillName);
    }
    return stagingRoot;
  } catch (error) {
    fs.rmSync(stagingRoot, { recursive: true, force: true });
    throw error;
  }
}

function commitInstall(operations) {
  const committed = [];
  const backups = [];
  try {
    for (const operation of operations) {
      fs.mkdirSync(path.dirname(operation.destination), { recursive: true });
      let backup = null;
      if (fs.existsSync(operation.destination)) {
        backup = path.join(
          path.dirname(operation.destination),
          `.${path.basename(operation.destination)}.vitaecontext-backup-${crypto.randomUUID()}`
        );
        fs.renameSync(operation.destination, backup);
        backups.push({ destination: operation.destination, backup });
      }
      committed.push({ destination: operation.destination, backup });
      fs.cpSync(operation.staged, operation.destination, { recursive: true });
    }
    for (const { backup } of backups) fs.rmSync(backup, { recursive: true, force: true });
  } catch (error) {
    for (const { destination, backup } of committed.reverse()) {
      fs.rmSync(destination, { recursive: true, force: true });
      if (backup && fs.existsSync(backup)) fs.renameSync(backup, destination);
    }
    for (const { destination, backup } of backups) {
      if (fs.existsSync(backup) && !fs.existsSync(destination)) fs.renameSync(backup, destination);
    }
    throw error;
  }
}

export function resolveInstallRoot(flags, providerSpec, provider) {
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

export function resolveCommandInstallRoot(flags, providerSpec) {
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

export function resolveAdditionalSkillInstallRoots(flags, providerSpec) {
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

export function installProvider(repoRoot, provider, config, flags) {
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

  let plan;
  let stagingRoot;
  try {
    plan = buildInstallPlan(
      repoRoot,
      providerSpec,
      config,
      targetRoot,
      skillTargetRoots,
      commandTargetRoot,
      provider,
    );
    preflightInstall(plan.operations, Boolean(flags.force));
    stagingRoot = stageInstall(plan.operations, config.package);
    commitInstall(plan.operations);
  } catch (error) {
    throw formatFilesystemInstallError(error, provider, targetRoot, commandTargetRoot);
  } finally {
    if (stagingRoot) fs.rmSync(stagingRoot, { recursive: true, force: true });
  }

  console.log(`Installed ${plan.installedSkills.length} skill folder(s) for ${provider}`);
  console.log(`- target: ${skillTargetRoot}`);
  if (skillTargetRoots.length > 1) {
    console.log(`- additional skill targets: ${skillTargetRoots.slice(1).join(", ")}`);
  }
  if (plan.installedCommands.length > 0) {
    console.log(`Installed ${plan.installedCommands.length} command file(s) for ${provider}`);
    console.log(`- commands target: ${commandTargetRoot}`);
  }
  console.log(`- manifest: ${plan.manifestPath}`);
  if (providerSpec.layout === "gemini-extension") {
    if (provider === "antigravity") {
      // TBD: confirm whether Antigravity CLI surfaces imported plugin commands
      // with Gemini-style slash names, converted skill names, or another syntax.
      console.log(`- plugin target: ${targetRoot}`);
    } else {
      console.log(`- extension target: ${targetRoot}`);
    }
  }
}
