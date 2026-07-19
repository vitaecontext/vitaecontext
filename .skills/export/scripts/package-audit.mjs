#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const MAX_PACKED_BYTES = 5_000_000;
const repoRoot = path.resolve(import.meta.dirname, "../../..");

function stripFencedBlocks(content) {
  return content.replace(/^(?:```|~~~)[\s\S]*?^(?:```|~~~)\s*$/gm, "");
}

function localTargets(content) {
  const cleaned = stripFencedBlocks(content);
  const targets = [];
  for (const match of cleaned.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) targets.push(match[1]);
  for (const match of cleaned.matchAll(/<(?:img|a)\b[^>]*?\b(?:src|href)=["']([^"']+)["']/gi)) targets.push(match[1]);
  return targets;
}

function isExternal(target) {
  return !target || target === "..." || target.startsWith("#") || /^(?:https?:|mailto:|data:)/i.test(target);
}

function resolvePackageTarget(fromFile, target) {
  const withoutFragment = target.split("#")[0].split("?")[0];
  if (!withoutFragment) return null;
  try {
    return path.posix.normalize(path.posix.join(path.posix.dirname(fromFile), decodeURIComponent(withoutFragment)));
  } catch {
    return false;
  }
}

const packed = spawnSync("npm", ["pack", "--dry-run", "--json"], {
  cwd: repoRoot,
  encoding: "utf8",
  shell: process.platform === "win32"
});
if (packed.status !== 0) {
  process.stderr.write(packed.stderr);
  throw new Error("npm pack --dry-run failed");
}

const report = JSON.parse(packed.stdout)[0];
const files = new Set(report.files.map((entry) => entry.path));
const failures = [];

if (report.size > MAX_PACKED_BYTES) {
  failures.push(`packed size ${report.size} bytes exceeds ${MAX_PACKED_BYTES} byte budget`);
}

for (const file of [...files].filter((entry) => entry.endsWith(".md"))) {
  const source = path.join(repoRoot, ...file.split("/"));
  if (!fs.existsSync(source)) continue;
  for (const target of localTargets(fs.readFileSync(source, "utf8"))) {
    if (isExternal(target)) continue;
    const resolved = resolvePackageTarget(file, target);
    if (resolved === null) continue;
    if (resolved === false || resolved.startsWith("../")) {
      failures.push(`${file} -> ${target}`);
      continue;
    }
    const exists = files.has(resolved) || [...files].some((entry) => entry.startsWith(`${resolved.replace(/\/$/, "")}/`));
    if (!exists) failures.push(`${file} -> ${target}`);
  }
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`error: ${failure}`);
  throw new Error(`package audit found ${failures.length} issue(s)`);
}

console.log(`ok: packed size ${report.size} bytes within ${MAX_PACKED_BYTES} byte budget`);
console.log(`ok: ${files.size} packed file(s) have resolvable local Markdown links`);
