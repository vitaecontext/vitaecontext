import assert from "node:assert/strict";
import { test } from "node:test";

import { compareSemver } from "../.skills/export/lib/update.mjs";

test("compareSemver orders core versions", () => {
  assert.equal(compareSemver("1.0.0", "1.0.1"), -1);
  assert.equal(compareSemver("1.2.0", "1.1.9"), 1);
  assert.equal(compareSemver("2.0.0", "1.9.9"), 1);
  assert.equal(compareSemver("1.7.0", "1.7.0"), 0);
});

test("compareSemver treats a release as newer than its prerelease", () => {
  assert.equal(compareSemver("1.0.0-beta.1", "1.0.0"), -1);
  assert.equal(compareSemver("1.0.0", "1.0.0-beta.1"), 1);
});

test("compareSemver orders prereleases of the same core version", () => {
  assert.equal(compareSemver("1.0.0-alpha", "1.0.0-beta"), -1);
  assert.equal(compareSemver("1.0.0-beta", "1.0.0-beta"), 0);
});

test("compareSemver returns null for non-semver input", () => {
  assert.equal(compareSemver("latest", "1.0.0"), null);
  assert.equal(compareSemver("1.0.0", "v1.0.0"), null);
  assert.equal(compareSemver(undefined, "1.0.0"), null);
});
