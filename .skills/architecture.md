# Agent skill architecture

This directory stores the portable skill bundles, provider adapters, and export tooling for `AgentKit SEO`.

## Recommended structure

```text
.skills/
  agent-skill/
    agentkit-seo/
    agentkit-seo-agent-context-optimization/
    agentkit-seo-cv-ats/
    agentkit-seo-github/
    agentkit-seo-linkedin/
    agentkit-seo-web-portfolio/
    agentkit-seo-x-twitter/
  providers/
    claude-code/
    codex/
    gemini-cli/
    antigravity/
    opencode/
  export/
    export-config.json
    scripts/
```

## Why the shared skills are namespaced

The portable skill folders use names like `agentkit-seo-linkedin` instead of plain `linkedin` for three reasons:

1. They avoid collisions with unrelated skills in a user's global skill directory.
2. OpenCode documents a stricter contract where the skill `name` must match the containing folder name.
3. Provider adapters can still expose a cleaner command surface on top, such as `/agentkit-seo:linkedin`, where that syntax is actually supported.

## Four layers

1. Repo hub: Human-readable editorial docs under `hub/`.
2. Portable skill bundle: Self-contained skills in `.skills/agent-skill/` using `SKILL.md` and `references/`, with optional agent-specific metadata such as `agents/openai.yaml` for OpenAI/Codex interfaces.
3. Provider adapter: Install notes, wrappers, or provider-specific templates in `.skills/providers/<provider>/`.
4. Export layer: Generated provider-facing layouts produced from `.skills/export/`.

## Design rules

1. Keep one portable source of truth in `.skills/agent-skill/`.
2. Treat provider folders as adapters, not as the canonical workflow logic.
3. Keep `SKILL.md` lean and procedural; move durable factual guidance into the local `references/` directory inside each skill.
4. Do not make shared skills depend on `hub/` docs at runtime.
5. Use provider-specific slash commands only as thin wrappers that point the agent at the correct shared skill.
6. Do not assume one invocation style works everywhere. The slash namespace model is provider-dependent.
7. Keep provider packaging generated wherever possible; do not hand-maintain a second canonical copy of the skill tree at the repo root.
8. Exclude provider-specific metadata from provider bundles that do not use it. For example, Gemini CLI, Antigravity CLI, Claude Code, OpenCode, and the generic shared export should not receive OpenAI-only `agents/` metadata.

## Packaging stance

The shared skills should be installable on their own without requiring the entire repository checkout. The repo hub remains the editorial workspace, but the portable runtime artifact is the `.skills/agent-skill/` tree.

When a provider expects a different directory layout, install or export that layout from the canonical `.skills` source tree instead of editing provider folders by hand. The reference CLI lives at:

- `.skills/export/export-config.json`
- `.skills/export/scripts/agentkit-seo.mjs`

Current supported direct install targets are:

- `claude-code`
- `codex`
- `gemini-cli`
- `antigravity`
- `opencode`

Codex installs mirror skills into both `~/.agents/skills/` and `~/.codex/skills/` (or `CODEX_HOME/skills`) to cover current and legacy discovery paths.

Gemini CLI installs as an extension at `~/.gemini/extensions/agentkit-seo`. The extension includes `gemini-extension.json`, a `GEMINI.md` context file, shared skill folders under `skills/`, and namespaced command wrappers under `commands/agentkit-seo/`. Gemini exposes those wrappers as commands such as `/agentkit-seo:linkedin`. A `--project-root` install can still preview the same generated extension layout inside a repository, but the active Gemini extension discovery path is the user extension directory.

Antigravity CLI installs as a plugin at `~/.gemini/antigravity-cli/plugins/agentkit-seo`. The plugin uses the Gemini-compatible extension structure because Antigravity imports Gemini CLI extensions with `agy plugin import gemini` and stages plugins under `~/.gemini/antigravity-cli/plugins`. The exact imported command syntax in `agy` is still TBD, so keep the command wrappers thin and verify runtime invocation before making stronger claims.

OpenCode installs include both shared skill folders and thin flat command wrappers. The wrappers live in `.skills/providers/opencode/commands/` and map commands such as `/agentkit-seo-linkedin` to the corresponding shared skill.

Direct install example:

```bash
node .skills/export/scripts/agentkit-seo.mjs install \
  --provider claude-code \
  --project-root .
```

Current supported export targets are:

- `shared`
- `claude-code`
- `codex`
- `gemini-cli`
- `antigravity`
- `opencode`

Keep Gemini extension files generated from `.skills/providers/gemini-cli/`, Antigravity plugin files generated from `.skills/providers/antigravity/`, and all runtime methodology in the canonical `.skills/agent-skill/` source tree. Do not maintain provider-specific copies of the skill methodology.

Preview export example:

```bash
node .skills/export/scripts/agentkit-seo.mjs export \
  --provider claude-code \
  --output /tmp/agentkit-seo-bundles
```

## Root files and distribution

Keep the source of truth inside `.skills/`. Root-level packaging files should exist only when they unlock a real distribution channel.

Today that means:

- a minimal root `package.json` is justified if we want an `npx`-friendly CLI for installing, exporting, or packaging the shared skills
- a root `gemini-extension.json`, `GEMINI.md`, `commands/`, and `skills/` layout is justified when publishing the repository itself as a Gemini CLI gallery extension

Human-readable playbooks, templates, examples, and source notes belong under `hub/`. Do not place editorial module folders at the repository root.

Generate provider-facing manifests only when we intentionally publish a provider-specific release artifact.

---

See also: [repository architecture map](../.assets/docs/architecture-map.md), [maintainer guide](../MAINTAINING.md), and [root runtime wiki](./agent-skill/agentkit-seo/wiki/agentkit-seo.md).
