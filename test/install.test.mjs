import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import fs from "node:fs";

import { installProvider, resolveInstallRoot } from "../.skills/export/lib/install.mjs";

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

test("install preflight leaves no partial output when a later source is missing", () => {
  const sourceRoot = fs.mkdtempSync(path.join(os.tmpdir(), "install-source-"));
  const targetRoot = fs.mkdtempSync(path.join(os.tmpdir(), "install-target-"));
  fs.mkdirSync(path.join(sourceRoot, "first"));
  fs.writeFileSync(path.join(sourceRoot, "first", "SKILL.md"), "# first\n");
  const config = {
    package: { name: "vitaecontext", version: "2.1.0" },
    skills: [
      { name: "first", source: "first" },
      { name: "missing", source: "missing" }
    ],
    providers: { shared: { layout: "shared", target: "skills" } }
  };
  assert.throws(
    () => installProvider(sourceRoot, "shared", config, { "target-dir": targetRoot }),
    /Install source does not exist/
  );
  assert.equal(fs.existsSync(path.join(targetRoot, "first")), false);
  assert.equal(fs.existsSync(path.join(targetRoot, "vitaecontext-install.json")), false);
});

test("install preflight detects a command conflict before copying skills", () => {
  const sourceRoot = fs.mkdtempSync(path.join(os.tmpdir(), "install-command-source-"));
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "install-command-project-"));
  fs.mkdirSync(path.join(sourceRoot, "skill"));
  fs.writeFileSync(path.join(sourceRoot, "skill", "SKILL.md"), "# skill\n");
  fs.writeFileSync(path.join(sourceRoot, "command.md"), "command\n");
  const commandRoot = path.join(projectRoot, ".tool", "commands");
  fs.mkdirSync(commandRoot, { recursive: true });
  fs.writeFileSync(path.join(commandRoot, "command.md"), "existing\n");
  const config = {
    package: { name: "vitaecontext", version: "2.1.0" },
    skills: [{ name: "skill", source: "skill" }],
    providers: {
      tool: {
        layout: "skill-folders",
        target: ".tool/skills",
        commandTarget: ".tool/commands",
        commands: [{ name: "command", source: "command.md" }]
      }
    }
  };
  assert.throws(
    () => installProvider(sourceRoot, "tool", config, { "project-root": projectRoot }),
    /Install target already exists/
  );
  assert.equal(fs.existsSync(path.join(projectRoot, ".tool", "skills", "skill")), false);
  assert.equal(fs.readFileSync(path.join(commandRoot, "command.md"), "utf8"), "existing\n");
});

test("install rollback removes earlier copies when a later commit fails", () => {
  const sourceRoot = fs.mkdtempSync(path.join(os.tmpdir(), "install-rollback-source-"));
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "install-rollback-project-"));
  fs.mkdirSync(path.join(sourceRoot, "skill"));
  fs.writeFileSync(path.join(sourceRoot, "skill", "SKILL.md"), "# skill\n");
  fs.writeFileSync(path.join(sourceRoot, "command.md"), "command\n");
  fs.mkdirSync(path.join(projectRoot, ".tool", "skills", "skill"), { recursive: true });
  fs.writeFileSync(path.join(projectRoot, ".tool", "skills", "skill", "SKILL.md"), "# previous skill\n");
  fs.writeFileSync(path.join(projectRoot, ".tool", "blocked"), "not a directory\n");
  const config = {
    package: { name: "vitaecontext", version: "2.1.0" },
    skills: [{ name: "skill", source: "skill" }],
    providers: {
      tool: {
        layout: "skill-folders",
        target: ".tool/skills",
        commandTarget: ".tool/blocked/commands",
        commands: [{ name: "command", source: "command.md" }]
      }
    }
  };
  assert.throws(
    () => installProvider(sourceRoot, "tool", config, { "project-root": projectRoot, force: true }),
    /ENOTDIR|not a directory/i
  );
  assert.equal(
    fs.readFileSync(path.join(projectRoot, ".tool", "skills", "skill", "SKILL.md"), "utf8"),
    "# previous skill\n"
  );
  assert.equal(fs.existsSync(path.join(projectRoot, ".tool", "skills", "vitaecontext-install.json")), false);
  assert.equal(fs.readFileSync(path.join(projectRoot, ".tool", "blocked"), "utf8"), "not a directory\n");
});
