import process from "node:process";

const REGISTRY_URL = "https://registry.npmjs.org";
const DEFAULT_TIMEOUT_MS = 7000;

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
      "This Node.js runtime has no global fetch(). Upgrade to Node.js 18 or newer to run 'agentkit-seo update'."
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

export async function checkForUpdates(config, flags) {
  const name = config.package.name;
  const current = config.package.version;
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
        JSON.stringify({ name, current, latest: null, status: "error", error: error.message }, null, 2)
      );
    } else {
      console.error(`error: could not check npm for the latest ${name} version: ${error.message}`);
      console.error(
        "This check needs network access to https://registry.npmjs.org. AgentKit SEO never checks for updates on its own; it only runs when you call 'agentkit-seo update'."
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
    console.log(JSON.stringify({ name, current, latest, status }, null, 2));
    return;
  }

  console.log(name);
  console.log(`- installed: ${current}`);
  console.log(`- npm latest: ${latest}`);
  if (status === "current") {
    console.log("You are on the latest published version.");
  } else if (status === "outdated") {
    console.log(`An update is available: ${current} -> ${latest}`);
    console.log("Reinstall the skills from the latest package to update, for example:");
    console.log("  npx agentkit-seo@latest install --provider <provider> --force");
  } else if (status === "ahead") {
    console.log("Your local version is newer than the latest published release.");
  } else {
    console.log("Could not compare the versions automatically. Compare the values above manually.");
  }
}
