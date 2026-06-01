import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import {
  expandUserPath,
  normalizeRelativePath,
  packageFileIncludes,
  semverish,
  trimTrailingSlash,
  uniquePaths
} from "../.skills/export/lib/filesystem.mjs";

test("semverish accepts release and prerelease versions", () => {
  assert.equal(semverish("1.0.0"), true);
  assert.equal(semverish("1.7.0"), true);
  assert.equal(semverish("1.0.0-beta.1"), true);
  assert.equal(semverish("1.0.0+build.5"), true);
});

test("semverish rejects malformed versions", () => {
  assert.equal(semverish("1.0"), false);
  assert.equal(semverish("v1.0.0"), false);
  assert.equal(semverish("1.0.0.0"), false);
  assert.equal(semverish("latest"), false);
  assert.equal(semverish(""), false);
});

test("trimTrailingSlash normalizes separators and trailing slashes", () => {
  assert.equal(trimTrailingSlash("hub/github/"), "hub/github");
  assert.equal(trimTrailingSlash("hub/github///"), "hub/github");
  assert.equal(trimTrailingSlash("hub/github"), "hub/github");
});

test("normalizeRelativePath converts OS separators to forward slashes", () => {
  const native = ["hub", "github", "README.md"].join(path.sep);
  assert.equal(normalizeRelativePath(native), "hub/github/README.md");
});

test("expandUserPath resolves the home directory", () => {
  assert.equal(expandUserPath("~"), os.homedir());
  assert.equal(expandUserPath("~/.claude/skills"), path.join(os.homedir(), ".claude/skills"));
  assert.equal(expandUserPath("/tmp/x"), "/tmp/x");
});

test("uniquePaths dedupes resolved paths and drops empties", () => {
  const result = uniquePaths(["/tmp/a", "/tmp/a", "", null, "/tmp/b"]);
  assert.deepEqual(result, [path.resolve("/tmp/a"), path.resolve("/tmp/b")]);
});

test("packageFileIncludes matches exact entries and parent directories", () => {
  const files = [".skills/export", "hub", "README.md"];
  assert.equal(packageFileIncludes(files, "README.md"), true);
  assert.equal(packageFileIncludes(files, ".skills/export/lib/doctor.mjs"), true);
  assert.equal(packageFileIncludes(files, "hub/github/README.md"), true);
  assert.equal(packageFileIncludes(files, ".skills/agent-skill"), false);
});
