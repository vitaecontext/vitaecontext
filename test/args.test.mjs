import assert from "node:assert/strict";
import { test } from "node:test";

import { parseFlags } from "../.skills/export/lib/args.mjs";

test("parseFlags reads value flags", () => {
  const flags = parseFlags(["--provider", "claude-code", "--target-dir", "/tmp/x"]);
  assert.deepEqual(flags, { provider: "claude-code", "target-dir": "/tmp/x" });
});

test("parseFlags treats known boolean flags as true", () => {
  const flags = parseFlags(["--provider", "codex", "--force", "--dry-run", "--json"]);
  assert.deepEqual(flags, { provider: "codex", force: true, "dry-run": true, json: true });
});

test("parseFlags throws on a value flag with no value", () => {
  assert.throws(() => parseFlags(["--provider"]), /Missing value for flag: --provider/);
  assert.throws(() => parseFlags(["--provider", "--force"]), /Missing value for flag: --provider/);
});

test("parseFlags throws on a non-flag positional argument", () => {
  assert.throws(() => parseFlags(["provider"]), /Unexpected argument: provider/);
});

test("parseFlags returns an empty object for no arguments", () => {
  assert.deepEqual(parseFlags([]), {});
});
