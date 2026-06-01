import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import { resolveInstallRoot } from "../.skills/export/lib/install.mjs";

test("resolveInstallRoot lets an explicit --target-dir win", () => {
  const root = resolveInstallRoot({ "target-dir": "/tmp/x" }, { target: ".claude/skills" }, "claude-code");
  assert.equal(root, path.resolve("/tmp/x"));
});

test("resolveInstallRoot joins --project-root with the provider target", () => {
  const root = resolveInstallRoot({ "project-root": "/proj" }, { target: ".claude/skills" }, "claude-code");
  assert.equal(root, path.resolve("/proj", ".claude/skills"));
});

test("resolveInstallRoot falls back to the provider globalTarget", () => {
  const root = resolveInstallRoot({}, { globalTarget: "~/.claude/skills" }, "claude-code");
  assert.equal(root, path.resolve(os.homedir(), ".claude/skills"));
});

test("resolveInstallRoot requires a destination for shared installs", () => {
  assert.throws(
    () => resolveInstallRoot({}, { layout: "shared", target: "skills" }, "shared"),
    /Shared installs require --target-dir/
  );
});

test("resolveInstallRoot throws when no default target is configured", () => {
  assert.throws(
    () => resolveInstallRoot({}, { target: ".x/skills" }, "mystery"),
    /no default target is configured/
  );
});
