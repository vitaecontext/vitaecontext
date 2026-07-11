import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { readJsonFile } from "./filesystem.mjs";
import { resolveInstallRoot } from "./install.mjs";

const REGISTRY_URL = "https://registry.npmjs.org";
const DEFAULT_TIMEOUT_MS = 7000;
const MANIFEST_NAMES = ["vitaecontext-install.json", "agentkit-seo-install.json"];

function parseSemver(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)(?:[-+]([0-9A-Za-z.-]+))?$/.exec(version ?? "");
  if (!match) {
    return null;
  }
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease: match[4] ?? null
  };
}

// Returns -1 if a < b, 1 if a > b, 0 if equal, or null if either value is not semver-shaped.
export function compareSemver(a, b) {
  const parsedA = parseSemver(a);
  const parsedB = parseSemver(b);
  if (!parsedA || !parsedB) {
    return null;
  }
  for (const part of ["major", "minor", "patch"]) {
    if (parsedA[part] !== parsedB[part]) {
      return parsedA[part] < parsedB[part] ? -1 : 1;
    }
  }
  if (parsedA.prerelease === parsedB.prerelease) {
    return 0;
  }
  // A normal release outranks any prerelease of the same core version.
  if (parsedA.prerelease === null) {
    return 1;
  }
  if (parsedB.prerelease === null) {
    return -1;
  }
  return parsedA.prerelease < parsedB.prerelease ? -1 : 1;
}

async function fetchLatestVersion(name, timeoutMs) {
  if (typeof fetch !== "function") {
    throw new Error(
      "This Node.js runtime has no global fetch(). Upgrade to Node.js 18 or newer to run 'vitaecontext update'."
    );
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${REGISTRY_URL}/${encodeURIComponent(name)}/latest`, {
      headers: { accept: "application/json" },
      signal: controller.signal
    });
    if (!response.ok) {
      throw new Error(`npm registry returned HTTP ${response.status}.`);
    }
    const data = await response.json();
    if (!data || typeof data.version !== "string") {
      throw new Error("npm registry response did not include a version.");
    }
    return data.version;
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error(`npm registry request timed out after ${timeoutMs}ms.`);
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

function readInstalledVersion(config, flags) {
  if (!flags.provider) {
    return { version: config.package.version, provider: null, manifestPath: null };
  }

  const provider = flags.provider;
  if (provider === "all") {
    throw new Error("Update checks accept one provider at a time so the install location stays explicit.");
  }

  const providerSpec = config.providers[provider];
  if (!providerSpec) {
    const available = Object.keys(config.providers).sort().join(", ");
    throw new Error(`Unknown provider '${provider}'. Available: ${available}`);
  }

  const targetRoot = resolveInstallRoot(flags, providerSpec, provider);
  const manifestPath = MANIFEST_NAMES.map((name) => path.join(targetRoot, name)).find((entry) =>
    fs.existsSync(entry)
  );
  if (!manifestPath) {
    throw new Error(
      `No VitaeContext install manifest found at ${targetRoot}. Confirm the install location with --target-dir or --project-root, then rerun the update check.`
    );
  }

  let manifest;
  try {
    manifest = readJsonFile(manifestPath);
  } catch (error) {
    throw new Error(`Could not read install manifest at ${manifestPath}: ${error.message}`);
  }

  const version = manifest?.package?.version;
  if (typeof version !== "string" || version.length === 0) {
    throw new Error(`Install manifest at ${manifestPath} does not include package.version.`);
  }

  return { version, provider, manifestPath };
}

export async function checkForUpdates(config, flags) {
  const installed = readInstalledVersion(config, flags);
  const name = config.package.name;
  const current = installed.version;
  const sourceLabel = installed.provider ? String(installed.provider) + " install" : "local package";
  const asJson = Boolean(flags.json);
  const timeoutMs = flags.timeout ? Number(flags.timeout) : DEFAULT_TIMEOUT_MS;
  if (Number.isNaN(timeoutMs) || timeoutMs <= 0) {
    throw new Error("Invalid --timeout value. Pass a positive number of milliseconds.");
  }

  let latest;
  try {
    latest = await fetchLatestVersion(name, timeoutMs);
  } catch (error) {
    if (asJson) {
      console.log(
        JSON.stringify({ name, source: sourceLabel, provider: installed.provider, manifest: installed.manifestPath, current, latest: null, status: "error", error: error.message }, null, 2)
      );
    } else {
      console.error(`error: could not check npm for the latest ${name} version: ${error.message}`);
      console.error(
        "This check needs network access to https://registry.npmjs.org. VitaeContext never checks for updates on its own; it only runs when you call 'vitaecontext update'."
      );
    }
    process.exitCode = 1;
    return;
  }

  const comparison = compareSemver(current, latest);
  let status;
  if (comparison === null) {
    status = "unknown";
  } else if (comparison < 0) {
    status = "outdated";
  } else if (comparison > 0) {
    status = "ahead";
  } else {
    status = "current";
  }

  if (asJson) {
    console.log(JSON.stringify({ name, source: sourceLabel, provider: installed.provider, manifest: installed.manifestPath, current, latest, status }, null, 2));
    return;
  }

  console.log(name);
  console.log(`- source: ${sourceLabel}`);
  if (installed.manifestPath) {
    console.log(`- manifest: ${installed.manifestPath}`);
  }
  console.log(`- installed: ${current}`);
  console.log(`- npm latest: ${latest}`);
  if (status === "current") {
    console.log("You are on the latest published version.");
  } else if (status === "outdated") {
    console.log(`An update is available: ${current} -> ${latest}`);
    console.log("Reinstall the skills from the latest package to update, for example:");
    const providerFlag = installed.provider ? installed.provider : "<provider>";
    let destinationFlags = "";
    if (flags["target-dir"]) {
      destinationFlags = ` --target-dir ${flags["target-dir"]}`;
    } else if (flags["project-root"]) {
      destinationFlags = ` --project-root ${flags["project-root"]}`;
    } else if (installed.provider === "shared") {
      destinationFlags = " --target-dir <dir>";
    }
    console.log(`  npx vitaecontext@latest install --provider ${providerFlag}${destinationFlags} --force`);
  } else if (status === "ahead") {
    console.log("Your local version is newer than the latest published release.");
  } else {
    console.log("Could not compare the versions automatically. Compare the values above manually.");
  }
}
