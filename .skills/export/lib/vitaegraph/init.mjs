import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { expandUserPath } from "../filesystem.mjs";

const TEMPLATE_FILES = new Map([
  ["VITAEGRAPH.md", "VITAEGRAPH.md"],
  ["index.md", "index.md"]
]);

export const DEFAULT_VITAEGRAPH_ROOT = path.join(os.homedir(), ".agentkit-seo", "vitaegraph");

export function resolveVitaeGraphRoot(inputRoot) {
  return inputRoot ? path.resolve(expandUserPath(inputRoot)) : DEFAULT_VITAEGRAPH_ROOT;
}

export function initializeVitaeGraph(repoRoot, inputRoot, force = false) {
  const graphRoot = resolveVitaeGraphRoot(inputRoot);
  if (fs.existsSync(graphRoot) && fs.readdirSync(graphRoot).length > 0 && !force) {
    throw new Error(`VitaeGraph target is not empty: ${graphRoot}. Use --force to replace template files.`);
  }
  const templateRoot = path.join(repoRoot, "vitaegraph", "templates");
  for (const directory of [
    "projects",
    "experience",
    "education",
    "certifications",
    "awards",
    "publications",
    ".generated"
  ]) {
    fs.mkdirSync(path.join(graphRoot, directory), { recursive: true });
  }
  for (const [destination, source] of TEMPLATE_FILES) {
    const target = path.join(graphRoot, destination);
    if (fs.existsSync(target) && !force) {
      throw new Error(`VitaeGraph file exists: ${target}. Use --force to replace template files.`);
    }
    fs.copyFileSync(path.join(templateRoot, source), target);
  }
  return graphRoot;
}
