import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "..");
const cli = path.join(repoRoot, ".skills", "export", "scripts", "agentkit-seo.mjs");

test("graph CLI defaults to ~/.agentkit-seo/vitaegraph", () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "vitaegraph-home-"));
  const options = { encoding: "utf8", env: { ...process.env, HOME: home } };
  assert.match(execFileSync(process.execPath, [cli, "graph", "init"], options), /Initialized VitaeGraph/);
  assert.match(execFileSync(process.execPath, [cli, "graph", "validate"], options), /VitaeGraph valid/);
  assert.match(execFileSync(process.execPath, [cli, "graph", "index"], options), /Indexed 0 VitaeGraph node/);
  assert.equal(
    fs.existsSync(path.join(home, ".agentkit-seo", "vitaegraph", "VITAEGRAPH.md")),
    true
  );
});

test("graph CLI initializes, validates, and indexes", () => {
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), "vitaegraph-cli-"));
  const run = (args) =>
    execFileSync(process.execPath, [cli, ...args, "--root", workspace], { encoding: "utf8" });
  assert.match(run(["graph", "init"]), /Initialized VitaeGraph/);
  assert.match(run(["graph", "validate"]), /VitaeGraph valid/);
  assert.match(run(["graph", "index"]), /Indexed 0 VitaeGraph node/);
  assert.equal(
    fs.existsSync(path.join(workspace, ".generated", "graph.json")),
    true
  );
});
