import path from "node:path";
import process from "node:process";

import { expandUserPath, uniquePaths, writeJsonFile } from "./filesystem.mjs";
import { copyCommandFiles, copyProviderFiles, installSkillFolders } from "./provider-files.mjs";
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
      `Install failed for ${provider} because a required source or parent directory was not found. Install root: ${targetRoot}.${commandTargetSuffix} Run 'agentkit-seo doctor' to verify the package contents, then rerun with an explicit --target-dir if needed.`
    );
  }

  return error;
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
