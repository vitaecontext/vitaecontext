import fs from "node:fs";
import path from "node:path";

import { removeIfExists, uniquePaths } from "./filesystem.mjs";
import {
  resolveAdditionalSkillInstallRoots,
  resolveCommandInstallRoot,
  resolveInstallRoot
} from "./install.mjs";

const MANIFEST_NAMES = ["vitaecontext-install.json", "agentkit-seo-install.json"];

function readManifest(targetRoot) {
  const manifestPath = MANIFEST_NAMES.map((name) => path.join(targetRoot, name)).find((entry) =>
    fs.existsSync(entry)
  );
  if (!manifestPath) {
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch {
    return null;
  }
}

// Collect the exact paths an install created so uninstall removes only VitaeContext
// artifacts. The manifest is authoritative for *where* files landed (it records the
// resolved skill and command targets); config supplies the skill folder and command
// file names. When no manifest is present we fall back to recomputing the same paths.
export function collectRemovals(repoRoot, provider, config, flags, manifest, targetRoot) {
  const providerSpec = config.providers[provider];
  const layout = manifest?.layout ?? providerSpec.layout;

  // Gemini-style providers install into a dedicated vitaecontext extension/plugin
  // directory, so the whole install root is ours to remove.
  if (layout === "gemini-extension") {
    return [targetRoot];
  }

  const removals = [];

  const skillTargets = manifest?.skill_targets ?? uniquePaths([
    resolveInstallRoot(flags, providerSpec, provider),
    ...resolveAdditionalSkillInstallRoots(flags, providerSpec)
  ]);
  const skillNames =
    manifest?.skills?.length ? manifest.skills : config.skills.map((skill) => skill.name);
  for (const skillTarget of skillTargets) {
    for (const skillName of skillNames) {
      removals.push(path.join(skillTarget, skillName));
    }
  }

  const commandTarget = manifest?.command_target ?? resolveCommandInstallRoot(flags, providerSpec);
  if (commandTarget && providerSpec.commands) {
    for (const command of providerSpec.commands) {
      removals.push(path.join(commandTarget, path.basename(command.source)));
    }
  }

  // Remove the manifest itself last so a failed run leaves a record behind.
  const manifestName =
    manifest?.package?.name === "agentkit-seo" ? "agentkit-seo-install.json" : MANIFEST_NAMES[0];
  removals.push(path.join(targetRoot, manifestName));

  return removals;
}

export function uninstallProvider(repoRoot, provider, config, flags) {
  const providerSpec = config.providers[provider];
  const targetRoot = resolveInstallRoot(flags, providerSpec, provider);
  const dryRun = Boolean(flags["dry-run"]);
  const manifest = readManifest(targetRoot);

  if (!manifest && !flags.force) {
    throw new Error(
      `No VitaeContext install manifest found at ${targetRoot}. Confirm the install location with --target-dir or --project-root, or pass --force to remove the expected VitaeContext files anyway.`
    );
  }

  const removals = collectRemovals(repoRoot, provider, config, flags, manifest, targetRoot);
  const existing = uniquePaths(removals).filter((entry) => fs.existsSync(entry));

  if (existing.length === 0) {
    console.log(`Nothing to remove for ${provider} at ${targetRoot}.`);
    return;
  }

  if (dryRun) {
    console.log(`Would remove ${existing.length} path(s) for ${provider}:`);
    for (const entry of existing) {
      console.log(`- ${entry}`);
    }
    return;
  }

  for (const entry of existing) {
    removeIfExists(entry);
  }

  console.log(`Removed ${existing.length} path(s) for ${provider}.`);
  console.log(`- install root: ${targetRoot}`);
  for (const entry of existing) {
    console.log(`- ${entry}`);
  }
}
