import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import { parseContextDocument } from "../src/context/parse.mjs";
import { installProvider, resolveInstallRoot, resolveAdditionalSkillInstallRoots } from "../src/install.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const config = JSON.parse(fs.readFileSync(path.join(repoRoot, "src/export-config.json"), "utf8"));

function careerContext(scope) {
  return [
    "# Casey Lee - Research engineer",
    "",
    "```text",
    "## Hidden heading",
    "```",
    "",
    "## QUICK REFERENCE",
    "```yaml",
    "name: Casey Lee",
    "positioning_summary: Research engineer",
    "```",
    scope,
    "<!-- VERIFIED FACTS: role=2025 -->",
    "## Goals and targeting",
    "Research engineering.",
    "## Experience",
    "### [ROLE] Research intern",
    "TL;DR: Built a prototype.",
    "## Skills index",
    "Research."
  ].join("\n");
}

test("closed fences preserve raw section boundaries and a one-line scope", () => {
  const result = parseContextDocument(careerContext("Private evidence-backed career context."));
  assert.equal(result.valid, true);
  const quick = result.sections.find(section => section.normalized === "quick reference");
  assert.match(quick.content, /^## QUICK REFERENCE\n/);
  assert.doesNotMatch(quick.content, /## Goals and targeting/);
  assert.equal(result.sections.some(section => section.title === "Hidden heading"), false);
});

test("a comment and the next H2 do not count as a scope declaration", () => {
  const result = parseContextDocument(careerContext(""));
  assert.equal(result.valid, false);
  assert.equal(result.errors.some(entry => entry.code === "missing_scope_declaration"), true);
});

test("Pi targets are explicit and do not mirror into shared skills", () => {
  const spec = config.providers.pi;
  const old = process.env.PI_CODING_AGENT_DIR;
  const custom = path.join(os.tmpdir(), "pi-custom");
  try {
    delete process.env.PI_CODING_AGENT_DIR;
    assert.equal(resolveInstallRoot({}, spec, "pi"), path.resolve(os.homedir(), ".pi/agent/skills"));
    process.env.PI_CODING_AGENT_DIR = custom;
    assert.equal(resolveInstallRoot({}, spec, "pi"), path.resolve(custom, "skills"));
    assert.equal(resolveInstallRoot({"project-root": custom}, spec, "pi"), path.resolve(custom, ".pi/skills"));
    assert.equal(resolveInstallRoot({"target-dir": custom}, spec, "pi"), path.resolve(custom));
    assert.deepEqual(resolveAdditionalSkillInstallRoots({}, spec), []);
  } finally {
    if (old === undefined) delete process.env.PI_CODING_AGENT_DIR;
    else process.env.PI_CODING_AGENT_DIR = old;
  }
});

test("Pi project install ships all canonical skills and a manifest", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "vitaecontext-pi-"));
  try {
    installProvider(repoRoot, "pi", config, {"project-root": root});
    const target = path.join(root, ".pi", "skills");
    for (const skill of config.skills) {
      assert.equal(fs.existsSync(path.join(target, skill.name, "SKILL.md")), true);
      assert.equal(fs.existsSync(path.join(target, skill.name, "references")), true);
      assert.equal(fs.existsSync(path.join(target, skill.name, "wiki")), true);
    }
    const manifest = JSON.parse(fs.readFileSync(path.join(target, "vitaecontext-install.json"), "utf8"));
    assert.equal(manifest.provider, "pi");
    assert.deepEqual(manifest.skill_targets, [target]);
    assert.equal(fs.existsSync(path.join(root, ".agents")), false);
  } finally {
    fs.rmSync(root, {recursive: true, force: true});
  }
});
