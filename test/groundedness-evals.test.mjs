import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "..");
const scenarios = JSON.parse(fs.readFileSync(path.join(repoRoot, "evals", "groundedness", "scenarios.json"), "utf8"));
const config = JSON.parse(fs.readFileSync(path.join(repoRoot, ".skills", "export", "export-config.json"), "utf8"));
const skillSources = new Map(config.skills.map((skill) => [skill.name, path.join(repoRoot, skill.source, "SKILL.md")]));

test("groundedness fixtures are unique, fictional, and anchored to shipped runtime contracts", () => {
  assert.equal(scenarios.length >= 6, true);
  assert.equal(new Set(scenarios.map((scenario) => scenario.id)).size, scenarios.length);
  for (const scenario of scenarios) {
    assert.equal(skillSources.has(scenario.skill), true, `${scenario.id} uses an unshipped skill`);
    assert.equal(typeof scenario.prompt, "string");
    assert.equal(scenario.expected.length > 0, true);
    assert.equal(scenario.forbidden.length > 0, true);
    const skill = fs.readFileSync(skillSources.get(scenario.skill), "utf8");
    const escaped = scenario.contractPattern.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(skill.toLowerCase(), new RegExp(escaped), `${scenario.id} lost its runtime contract`);
  }
});
