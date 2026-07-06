import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import {
  parseFrontmatter,
  parseVitaeGraph
} from "../.skills/export/lib/vitaegraph/parse.mjs";

test("parseFrontmatter reads scalars and lists", () => {
  const parsed = parseFrontmatter(`---
type: course
id: course:example
parent: education:example
tags:
  - node
  - markdown
---
# Example
`);
  assert.equal(parsed.attributes.parent, "education:example");
  assert.deepEqual(parsed.attributes.tags, ["node", "markdown"]);
  assert.match(parsed.body, /# Example/);
});

test("parseVitaeGraph discovers hierarchical records and ignores generated Markdown", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "vitaegraph-parse-"));
  fs.mkdirSync(path.join(root, "education", "msc", "courses"), { recursive: true });
  fs.mkdirSync(path.join(root, ".generated"));
  fs.writeFileSync(
    path.join(root, "education", "msc", "education.md"),
    "---\ntype: education\nid: education:msc\ntitle: MSc\n---\n# MSc\n"
  );
  fs.writeFileSync(
    path.join(root, "education", "msc", "courses", "security.md"),
    "---\ntype: course\nid: course:security\ntitle: Security\nparent: education:msc\n---\n# Security\n"
  );
  fs.writeFileSync(path.join(root, ".generated", "ignored.md"), "# Ignore\n");
  const graph = parseVitaeGraph(root);
  assert.equal(graph.records.length, 2);
  assert.deepEqual(
    graph.pages.map((page) => page.path),
    ["education/msc/courses/security.md", "education/msc/education.md"]
  );
});
