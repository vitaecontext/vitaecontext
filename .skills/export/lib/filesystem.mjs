import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export function ensureCleanDirectory(targetPath, force) {
  if (fs.existsSync(targetPath)) {
    if (!force) {
      throw new Error(`Export target already exists: ${targetPath}. Use --force to replace it.`);
    }
    fs.rmSync(targetPath, { recursive: true, force: true });
  }
  fs.mkdirSync(targetPath, { recursive: true });
}

export function removeIfExists(targetPath) {
  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true });
  }
}

export function expandUserPath(targetPath) {
  if (targetPath === "~") {
    return os.homedir();
  }
  if (targetPath.startsWith("~/")) {
    return path.join(os.homedir(), targetPath.slice(2));
  }
  return targetPath;
}

export function normalizeRelativePath(filePath) {
  return filePath.split(path.sep).join("/");
}

export function trimTrailingSlash(filePath) {
  return normalizeRelativePath(filePath).replace(/\/+$/, "");
}

export function uniquePaths(paths) {
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

export function readJsonFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function writeJsonFile(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export function semverish(version) {
  return /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(version);
}

export function packageFileIncludes(packageFiles, requiredPath) {
  const normalizedRequired = trimTrailingSlash(requiredPath);
  return packageFiles.some((entry) => {
    const normalizedEntry = trimTrailingSlash(entry);
    return (
      normalizedRequired === normalizedEntry ||
      normalizedRequired.startsWith(`${normalizedEntry}/`)
    );
  });
}
