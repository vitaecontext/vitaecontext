import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "..");
const cli = path.join(repoRoot, ".skills", "export", "scripts", "vitaecontext.mjs");
const example = path.join(repoRoot, "hub", "context-builder", "examples", "alex-morgan-fictional-career-context.md");

test("context CLI initializes the private default path", () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "context-home-"));
  const output = execFileSync(process.execPath, [cli, "context", "init"], {
    encoding: "utf8",
    env: { ...process.env, HOME: home, USERPROFILE: home }
  });
  assert.match(output, /Initialized Career Context/);
  assert.equal(fs.existsSync(path.join(home, ".vitaecontext", "career-context.md")), true);
});

test("context CLI validates and summarizes a valid file as JSON", () => {
  const validation = JSON.parse(execFileSync(process.execPath, [cli, "context", "validate", example, "--json"], { encoding: "utf8" }));
  assert.equal(validation.valid, true);
  const summary = JSON.parse(execFileSync(process.execPath, [cli, "context", "summary", example, "--for", "cv", "--json"], { encoding: "utf8" }));
  assert.equal(summary.surface, "cv");
  assert.match(summary.content, /## EDUCATION/);
});

test("context summary expands a user-relative output path", () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "context-summary-home-"));
  execFileSync(process.execPath, [cli, "context", "summary", example, "--for", "github", "--output", "~/.vitaecontext/github.md"], {
    env: { ...process.env, HOME: home, USERPROFILE: home }
  });
  assert.equal(fs.existsSync(path.join(home, ".vitaecontext", "github.md")), true);
});

test("context CLI returns a non-zero status and diagnostics for an unfinished starter", () => {
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), "context-cli-"));
  const target = path.join(workspace, "context.md");
  execFileSync(process.execPath, [cli, "context", "init", "--output", target]);
  const result = spawnSync(process.execPath, [cli, "context", "validate", target, "--json"], { encoding: "utf8" });
  assert.equal(result.status, 1);
  const diagnostics = JSON.parse(result.stdout);
  assert.equal(diagnostics.valid, false);
  assert.equal(diagnostics.errors.some((entry) => entry.code === "placeholder"), true);
});
