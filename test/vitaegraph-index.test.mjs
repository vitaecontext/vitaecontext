import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import {
  DEFAULT_VITAEGRAPH_ROOT,
  initializeVitaeGraph,
  resolveVitaeGraphRoot
} from "../.skills/export/lib/vitaegraph/init.mjs";
import {
  buildVitaeGraphArtifacts,
  writeVitaeGraphArtifacts
} from "../.skills/export/lib/vitaegraph/index.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");

test("initialization creates only the canonical starter files", () => {
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), "vitaegraph-init-"));
  const root = initializeVitaeGraph(repoRoot, workspace);
  assert.equal(root, workspace);
  assert.equal(fs.existsSync(path.join(root, "VITAEGRAPH.md")), true);
  assert.equal(fs.existsSync(path.join(root, "evidence")), false);
  assert.equal(fs.existsSync(path.join(root, "certifications")), true);
  assert.throws(() => initializeVitaeGraph(repoRoot, workspace), /Use --force/);
});

test("path resolution uses the default or the exact explicit directory", () => {
  assert.equal(resolveVitaeGraphRoot(), DEFAULT_VITAEGRAPH_ROOT);
  assert.equal(resolveVitaeGraphRoot("/tmp/custom-career-graph"), "/tmp/custom-career-graph");
  assert.equal(resolveVitaeGraphRoot("~/custom-career-graph"), path.join(os.homedir(), "custom-career-graph"));
});

test("graph and lexical artifacts are deterministic", () => {
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), "vitaegraph-index-"));
  const root = initializeVitaeGraph(repoRoot, workspace);
  fs.mkdirSync(path.join(root, "projects", "alpha"));
  fs.writeFileSync(
    path.join(root, "projects", "alpha", "project.md"),
    "---\ntype: project\nid: project:alpha\ntitle: Alpha Tool\ntags:\n  - node\n---\n# Alpha Tool\n\nBuilt a local Node tool.\n"
  );
  assert.deepEqual(buildVitaeGraphArtifacts(root), buildVitaeGraphArtifacts(root));
  writeVitaeGraphArtifacts(root);
  const first = fs.readFileSync(path.join(root, ".generated", "search-index.json"), "utf8");
  writeVitaeGraphArtifacts(root);
  const second = fs.readFileSync(path.join(root, ".generated", "search-index.json"), "utf8");
  assert.equal(first, second);
  assert.match(first, /"node": 2/);
});

test("failed indexing removes stale query artifacts and writes diagnostics", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "vitaegraph-invalid-index-"));
  initializeVitaeGraph(repoRoot, root);
  writeVitaeGraphArtifacts(root);
  fs.mkdirSync(path.join(root, "projects", "invalid"));
  fs.writeFileSync(
    path.join(root, "projects", "invalid", "project.md"),
    "---\ntype: project\nid: project:invalid\n---\n# Invalid\n"
  );
  assert.throws(() => writeVitaeGraphArtifacts(root), /validation failed/);
  assert.equal(fs.existsSync(path.join(root, ".generated", "graph.json")), false);
  assert.equal(fs.existsSync(path.join(root, ".generated", "search-index.json")), false);
  const diagnostics = JSON.parse(
    fs.readFileSync(path.join(root, ".generated", "diagnostics.json"), "utf8")
  );
  assert.equal(diagnostics.valid, false);
  assert.ok(diagnostics.errors.some((error) => error.code === "missing_field"));
});
