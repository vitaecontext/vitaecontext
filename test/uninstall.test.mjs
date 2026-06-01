import assert from "node:assert/strict";
import path from "node:path";
import { test } from "node:test";

import { collectRemovals } from "../.skills/export/lib/uninstall.mjs";

const config = {
  skills: [{ name: "agentkit-seo" }, { name: "agentkit-seo-github" }],
  providers: {
    codex: { layout: "skill-folders" },
    "gemini-cli": {
      layout: "gemini-extension",
      commands: [{ name: "agentkit-seo:context", source: "a/b/context.toml" }]
    },
    opencode: {
      layout: "skill-folders",
      commands: [{ name: "agentkit-seo:github", source: "x/y/github.md" }]
    }
  }
};

test("gemini-extension layout removes only the dedicated install root", () => {
  const removals = collectRemovals(
    "/repo",
    "gemini-cli",
    config,
    {},
    { layout: "gemini-extension" },
    "/home/u/.gemini/extensions/agentkit-seo"
  );
  assert.deepEqual(removals, ["/home/u/.gemini/extensions/agentkit-seo"]);
});

test("skill-folders layout removes each skill folder and the manifest, leaving the shared dir", () => {
  const manifest = {
    layout: "skill-folders",
    skill_targets: ["/home/u/.codex/skills"],
    skills: ["agentkit-seo", "agentkit-seo-github"]
  };
  const removals = collectRemovals("/repo", "codex", config, {}, manifest, "/home/u/.codex/skills");
  assert.deepEqual(removals, [
    path.join("/home/u/.codex/skills", "agentkit-seo"),
    path.join("/home/u/.codex/skills", "agentkit-seo-github"),
    path.join("/home/u/.codex/skills", "agentkit-seo-install.json")
  ]);
});

test("skill-folders layout also removes command wrappers when the provider has commands", () => {
  const manifest = {
    layout: "skill-folders",
    skill_targets: ["/t/skills"],
    skills: ["agentkit-seo"],
    command_target: "/t/commands"
  };
  const removals = collectRemovals("/repo", "opencode", config, {}, manifest, "/t/skills");
  assert.deepEqual(removals, [
    path.join("/t/skills", "agentkit-seo"),
    path.join("/t/commands", "github.md"),
    path.join("/t/skills", "agentkit-seo-install.json")
  ]);
});

test("manifest skill list overrides the configured skills", () => {
  const manifest = {
    layout: "skill-folders",
    skill_targets: ["/t/skills"],
    skills: ["agentkit-seo-github"]
  };
  const removals = collectRemovals("/repo", "codex", config, {}, manifest, "/t/skills");
  assert.deepEqual(removals, [
    path.join("/t/skills", "agentkit-seo-github"),
    path.join("/t/skills", "agentkit-seo-install.json")
  ]);
});
