#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { readJsonFile, writeJsonFile } from "../lib/filesystem.mjs";

const repoRoot = path.resolve(import.meta.dirname, "../../..");
const sourceRoot = path.join(repoRoot, ".skills", "agent-skill");
const configuredSkills = readJsonFile(path.join(repoRoot, ".skills", "export", "export-config.json")).skills;
const pluginRoot = path.join(repoRoot, ".agents", "plugins", "plugins", "vitaecontext");
const mirrorRoot = path.join(pluginRoot, "skills");
const manifestPath = path.join(pluginRoot, ".codex-plugin", "plugin.json");
const checkOnly = process.argv.includes("--check");

function filesUnder(root) {
  if (!fs.existsSync(root)) return [];
  const files = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) {
      for (const child of filesUnder(absolute)) files.push(path.join(entry.name, child));
    } else files.push(entry.name);
  }
  return files.sort();
}

function assertMirror() {
  const sourceFiles = configuredSkills.flatMap((skill) =>
    filesUnder(path.join(repoRoot, skill.source)).map((relative) => path.join(skill.name, relative))
  ).sort();
  const mirrorFiles = filesUnder(mirrorRoot);
  if (JSON.stringify(sourceFiles) !== JSON.stringify(mirrorFiles)) {
    throw new Error("Codex plugin skill file list differs from the canonical runtime source; run npm run sync:codex-plugin");
  }
  for (const relative of sourceFiles) {
    if (fs.readFileSync(path.join(sourceRoot, relative), "utf8") !== fs.readFileSync(path.join(mirrorRoot, relative), "utf8")) {
      throw new Error(`Codex plugin skill differs from canonical source: ${relative}`);
    }
  }
  const packageVersion = readJsonFile(path.join(repoRoot, "package.json")).version;
  const pluginVersion = readJsonFile(manifestPath).version;
  if (pluginVersion !== packageVersion) {
    throw new Error(`Codex plugin version ${pluginVersion} does not match package version ${packageVersion}`);
  }
  console.log(`ok: Codex plugin mirrors ${sourceFiles.length} canonical runtime file(s)`);
}

if (checkOnly) {
  assertMirror();
} else {
  fs.rmSync(mirrorRoot, { recursive: true, force: true });
  fs.mkdirSync(mirrorRoot, { recursive: true });
  for (const skill of configuredSkills) {
    fs.cpSync(path.join(repoRoot, skill.source), path.join(mirrorRoot, skill.name), { recursive: true });
  }
  const manifest = readJsonFile(manifestPath);
  manifest.version = readJsonFile(path.join(repoRoot, "package.json")).version;
  writeJsonFile(manifestPath, manifest);
  assertMirror();
}
