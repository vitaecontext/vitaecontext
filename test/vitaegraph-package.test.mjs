import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";

import { loadConfig } from "../.skills/export/lib/config.mjs";
import { packageFileIncludes } from "../.skills/export/lib/filesystem.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");

test("VitaeGraph is configured for every provider and npm packaging", () => {
  const config = loadConfig(repoRoot);
  assert.ok(config.skills.some((skill) => skill.name === "vitaecontext-vitaegraph"));
  for (const [provider, spec] of Object.entries(config.providers)) {
    assert.ok(spec.layout, `${provider} has a layout`);
  }
  const packageJson = JSON.parse(fs.readFileSync(path.join(repoRoot, "package.json"), "utf8"));
  assert.equal(packageFileIncludes(packageJson.files, "vitaegraph/templates/project.md"), true);
  assert.equal(
    packageFileIncludes(
      packageJson.files,
      ".skills/agent-skill/vitaecontext-vitaegraph/SKILL.md"
    ),
    true
  );
});

test("command-capable providers expose a VitaeGraph wrapper", () => {
  const config = loadConfig(repoRoot);
  for (const provider of ["gemini-cli", "antigravity", "opencode"]) {
    assert.ok(
      config.providers[provider].commands.some((command) => command.name.includes("vitaegraph")),
      `${provider} exposes VitaeGraph`
    );
  }
});
