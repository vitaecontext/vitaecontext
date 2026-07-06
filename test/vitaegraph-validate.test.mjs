import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import { validateVitaeGraph } from "../.skills/export/lib/vitaegraph/validate.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "vitaegraph-validate-"));
  fs.writeFileSync(path.join(root, "VITAEGRAPH.md"), "# VitaeGraph\n[Index](index.md)\n");
  fs.writeFileSync(path.join(root, "index.md"), "# Index\n");
  return root;
}

function writeRecord(root, relativePath, frontmatter, heading = "Record") {
  const target = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `---\n${frontmatter}---\n# ${heading}\n`);
}

test("validation accepts hierarchical education, course, and project records", () => {
  const root = fixture();
  writeRecord(
    root,
    "education/msc/education.md",
    "type: education\nid: education:msc\ntitle: MSc\n"
  );
  writeRecord(
    root,
    "education/msc/courses/security.md",
    "type: course\nid: course:security\ntitle: Security\nparent: education:msc\nrelated_records:\n  - project:lab\n"
  );
  writeRecord(
    root,
    "projects/lab/project.md",
    "type: project\nid: project:lab\ntitle: Lab\n"
  );
  const result = validateVitaeGraph(root);
  assert.equal(result.valid, true, JSON.stringify(result.errors, null, 2));
  assert.equal(result.recordCount, 3);
});

test("validation detects duplicate IDs, missing parents, and broken links", () => {
  const root = fixture();
  writeRecord(
    root,
    "education/msc/courses/one.md",
    "type: course\nid: course:one\ntitle: One\nparent: education:missing\n",
    "One\n[Missing](missing.md)"
  );
  writeRecord(
    root,
    "education/msc/courses/two.md",
    "type: course\nid: course:one\ntitle: Two\nparent: education:missing\n"
  );
  const codes = validateVitaeGraph(root).errors.map((error) => error.code);
  assert.ok(codes.includes("duplicate_id"));
  assert.ok(codes.includes("missing_parent_reference"));
  assert.ok(codes.includes("broken_internal_link"));
});

test("validation rejects unknown record references and missing course parents", () => {
  const root = fixture();
  writeRecord(
    root,
    "education/msc/courses/security.md",
    "type: course\nid: course:security\ntitle: Security\nrelated_records:\n  - project:missing\n"
  );
  const codes = validateVitaeGraph(root).errors.map((error) => error.code);
  assert.ok(codes.includes("missing_record_reference"));
  assert.ok(codes.includes("missing_parent"));
});

test("validation rejects parent cycles and non-education course parents", () => {
  const root = fixture();
  writeRecord(
    root,
    "projects/one/project.md",
    "type: project\nid: project:one\ntitle: One\nparent: project:two\n"
  );
  writeRecord(
    root,
    "projects/two/project.md",
    "type: project\nid: project:two\ntitle: Two\nparent: project:one\n"
  );
  writeRecord(
    root,
    "education/msc/courses/security.md",
    "type: course\nid: course:security\ntitle: Security\nparent: project:one\n"
  );
  const codes = validateVitaeGraph(root).errors.map((error) => error.code);
  assert.ok(codes.includes("parent_cycle"));
  assert.ok(codes.includes("invalid_parent_type"));
});

test("validation enforces type prefixes, path types, visibility, and list fields", () => {
  const root = fixture();
  writeRecord(
    root,
    "projects/one/project.md",
    "type: award\nid: project:one\ntitle: One\nvisibility: shared\ntags: node\n"
  );
  const codes = validateVitaeGraph(root).errors.map((error) => error.code);
  assert.ok(codes.includes("record_id_type_mismatch"));
  assert.ok(codes.includes("record_type_directory_mismatch"));
  assert.ok(codes.includes("invalid_visibility"));
  assert.ok(codes.includes("invalid_list_field"));
});

test("validation warns about valid legacy flat layouts", () => {
  const root = fixture();
  writeRecord(root, "projects/one.md", "type: project\nid: project:one\ntitle: One\n");
  const result = validateVitaeGraph(root);
  assert.equal(result.valid, true);
  assert.ok(result.warnings.some((warning) => warning.code === "legacy_record_layout"));
});

test("validation reports malformed encoded internal links without crashing", () => {
  const root = fixture();
  fs.appendFileSync(path.join(root, "index.md"), "[Malformed](bad%ZZ.md)\n");
  const result = validateVitaeGraph(root);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.code === "invalid_internal_link"));
});

test("canonical templates use the new record model", () => {
  for (const template of [
    "project.md",
    "experience.md",
    "education.md",
    "course.md",
    "thesis.md",
    "certification.md",
    "award.md",
    "publication.md"
  ]) {
    const content = fs.readFileSync(path.join(repoRoot, "vitaegraph", "templates", template), "utf8");
    assert.doesNotMatch(content, /evidence_(?:level|refs)/);
    assert.match(content, /^---\ntype:/);
  }
});
