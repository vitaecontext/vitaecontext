import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { expandUserPath } from "../filesystem.mjs";

export function resolveContextPath(output) {
  return output
    ? path.resolve(expandUserPath(output))
    : path.join(os.homedir(), ".vitaecontext", "career-context.md");
}

export function initializeContext(repoRoot, output, force = false) {
  const source = path.join(repoRoot, "hub", "context-builder", "templates", "career-context-starter.md");
  const destination = resolveContextPath(output);
  if (!fs.existsSync(source)) throw new Error(`Career Context starter does not exist: ${source}`);
  if (fs.existsSync(destination) && !force) {
    throw new Error(`Career Context already exists: ${destination}. Use --force to replace it.`);
  }
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.cpSync(source, destination);
  return destination;
}
