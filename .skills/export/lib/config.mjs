import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { readJsonFile } from "./filesystem.mjs";

const PACKAGE_NAME = "vitaecontext";

export function repoRootFromScript(scriptUrl = import.meta.url) {
  let currentDirectory = path.dirname(fileURLToPath(scriptUrl));

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
        `Could not locate the ${PACKAGE_NAME} package root from script path ${fileURLToPath(scriptUrl)}`
      );
    }
    currentDirectory = parentDirectory;
  }
}

export function loadPackageMetadata(repoRoot) {
  const packagePath = path.join(repoRoot, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  return {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description
  };
}

export function loadConfig(repoRoot) {
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
