import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, "package.json"), "utf8"));

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, rel), "utf8"));
}

test("plugin.json name and version match package.json", () => {
  const plugin = readJson(".claude-plugin/plugin.json");
  assert.equal(plugin.name, pkg.name);
  assert.equal(plugin.version, pkg.version);
});

test("marketplace.json has a matching plugin entry in sync with package.json", () => {
  const marketplace = readJson(".claude-plugin/marketplace.json");
  assert.ok(Array.isArray(marketplace.plugins), "plugins must be an array");
  const entry = marketplace.plugins.find((plugin) => plugin.name === pkg.name);
  assert.ok(entry, `expected a plugin entry named ${pkg.name}`);
  assert.equal(entry.version, pkg.version);
  assert.equal(entry.source, "./");
});

test(".claude-plugin is shipped in the npm files allowlist", () => {
  assert.ok(pkg.files.includes(".claude-plugin"));
});

test("native Codex plugin and marketplace match package metadata", () => {
  const codexPlugin = readJson(".agents/plugins/plugins/vitaecontext/.codex-plugin/plugin.json");
  const codexMarketplace = readJson(".agents/plugins/marketplace.json");
  const entry = codexMarketplace.plugins.find((candidate) => candidate.name === pkg.name);
  assert.ok(entry, `expected a native Codex marketplace entry named ${pkg.name}`);
  assert.equal(codexPlugin.name, pkg.name);
  assert.equal(codexPlugin.version, pkg.version);
  assert.equal(codexPlugin.skills, "./skills/");
  assert.equal(entry.source.path, "./plugins/vitaecontext");
  assert.equal(entry.policy.installation, "AVAILABLE");
  assert.equal(entry.policy.authentication, "ON_INSTALL");
  assert.equal(pkg.files.includes(".agents/plugins"), true);
});
