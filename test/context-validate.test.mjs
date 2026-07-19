import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import { parseContextDocument, validateContextFile } from "../.skills/export/lib/context/parse.mjs";
import { summarizeContext } from "../.skills/export/lib/context/summary.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const fictionalExample = path.join(
  repoRoot,
  "hub",
  "context-builder",
  "examples",
  "alex-morgan-fictional-career-context.md"
);

test("fictional public example satisfies the Career Context contract", () => {
  const result = validateContextFile(fictionalExample);
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.warnings, []);
  assert.equal(result.quickReference.name, "Alex Morgan");
});

test("Career Context validation reports structure, placeholder, YAML, and chronology errors", () => {
  const result = parseContextDocument(`# [Your name]

## EDUCATION

## QUICK REFERENCE
\`\`\`yaml
name:
  nested: value
\`\`\`

<!-- VERIFIED FACTS: role=2026 -->

## LANGUAGES

Worked from 2026-2024.
`);
  assert.equal(result.valid, false);
  const codes = new Set(result.errors.map((entry) => entry.code));
  for (const expected of [
    "h1_descriptor",
    "quick_reference_position",
    "quick_reference_yaml",
    "missing_quick_field",
    "missing_section",
    "placeholder",
    "reversed_date_range"
  ]) assert.equal(codes.has(expected), true, `missing ${expected}`);
});

test("bounded summaries select only surface-relevant sections", () => {
  const result = summarizeContext(fictionalExample, "github");
  assert.match(result.content, /## PROFESSIONAL EXPERIENCE/);
  assert.match(result.content, /## SKILLS INDEX/);
  assert.doesNotMatch(result.content, /## LANGUAGES/);
  assert.doesNotMatch(result.content, /## QUICK REFERENCE[\s\S]*## QUICK REFERENCE/);
});

test("validation warns when a personal context sits inside a Git workspace", () => {
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), "context-git-"));
  fs.mkdirSync(path.join(workspace, ".git"));
  const target = path.join(workspace, "career-context.md");
  const source = fs.readFileSync(fictionalExample, "utf8").replace(/<!-- FICTIONAL EXAMPLE:[\s\S]*?-->/, "");
  fs.writeFileSync(target, source);
  const result = validateContextFile(target);
  assert.equal(result.warnings.some((entry) => entry.code === "tracked_workspace_path"), true);
});
