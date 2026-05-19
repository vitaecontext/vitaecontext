import fs from "node:fs";
import path from "node:path";

import { ensureCleanDirectory, uniquePaths, writeJsonFile } from "./filesystem.mjs";
import { copyCommandFiles, copyProviderFiles, copySkillFolders } from "./provider-files.mjs";

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

export function exportProvider(repoRoot, outputRoot, provider, config, force) {
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
