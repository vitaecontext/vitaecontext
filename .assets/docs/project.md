# VitaeContext project notes

This document records the architectural decisions, structural contracts, and validation rules for VitaeContext.

## 1. Brand and definition

VitaeContext gives AI agents a private, reusable source of truth about a person's career, then provides focused skills for turning that context into grounded professional work.

The project is career-context infrastructure. Platform-specific adaptation of that context is left to downstream tools.

## 2. Core principles

- **Private source of truth:** Career facts, stated goals, constraints, proof links, and claims to avoid stay in user-owned files.
- **Provider-agnostic:** Runtime skills install into Claude Code, Codex, Gemini CLI, Antigravity, OpenCode, Cursor, Windsurf, Roo Code, IBM Bob, Grok, and portable setups.
- **Stateless MCP server:** Model Context Protocol (MCP) server allows AI agents across any repository to access private Career Context and VitaeGraph without copying career files into individual projects.
- **Progressive disclosure:** Agents load one module and only the task-relevant references and wiki entries needed for that task.
- **Evidence-bounded outputs:** Claims are labeled as verified, from context, inferred, or needing evidence.
- **One canonical source:** The single runtime skill source is exported into each provider's required format.

## 3. Structure

The repository separates human docs, runtime skills, provider adapters, MCP, and core engine.

```text
hub/
.assets/docs/
skills/
  vitaecontext/
  vitaecontext-build/
  vitaecontext-vitaegraph/
providers/
  claude-code/
  codex/
  gemini-cli/
  antigravity/
  opencode/
  cursor/
  windsurf/
  roo-code/
  ibm-bob/
  grok/
  shared/
src/
bin/
mcp/
```

The `hub/` directory is the human-readable layer. It contains playbooks, templates, examples, source notes, and module READMEs.

Current hub modules:

- `hub/context-builder/`

VitaeGraph is intentionally not under `hub/`. Its root [`vitaegraph/`](../../vitaegraph/) directory is the product entrypoint for the graph artifact contract: schemas, graph model, and canonical Markdown templates.

The `skills/` directory is the standard Agent Skills source of truth. Each shared skill carries `SKILL.md`, local `references/`, local `wiki/`, and optional provider metadata.

Provider folders are adapters only. They contain install notes, wrapper commands, and provider metadata, not copied methodology.

## 4. Runtime graph

The intended read path is hierarchical:

```text
README.md
├── hub/<module>/README.md
│   └── hub/<module>/sources.md
└── skills/vitaecontext/wiki/vitaecontext.md
    └── vitaecontext-<module>/SKILL.md
        └── wiki/index.md
            └── wiki/knowledge.md
```

The root runtime wiki is the graph entrypoint for installed agents. Agents should read it before loading detailed module files when a task is broad, architectural, or package-related.

`llms.txt` is the concise LLM-facing map. `llms-full.txt` is the full bundled wiki context generated from the runtime wiki files.

`.assets/docs/getting-started.md` provides setup onboarding. `.assets/docs/end-to-end-workflows.md` demonstrates skill-ready agent workflows with sample inputs, prompts, multimodal material, expected deliverables, and graph navigation rules.

## 5. Skill modules

The package ships these shared skills:

- `vitaecontext`: orchestration, routing, package architecture, provider strategy
- `vitaecontext-build`: private professional source-of-truth files
- `vitaecontext-vitaegraph`: private hierarchical career knowledge graphs, record enrichment, validation, and selective retrieval

This modular shape solves the context-window problem: a VitaeGraph task should load the VitaeGraph skill, not the whole system.

Each user-facing module opens its `SKILL.md` from a role-grounded professional persona and runs a `## Self-review` step before returning, checking for fabricated facts, evidence-label accuracy, scope and goal alignment, and impact ordering.

The root orchestrator resolves the primary surface, task mode, mutation authority, evidence scope, and bounded depth before loading module detail. VitaeGraph separately routes create, deepen, maintain, validate, index, retrieve, and migrate operations so read-only graph work does not enter the full build workflow.

The source tree also contains `vitaecontext-wiki-maintenance` as a maintainer-only workflow for local source audits and wiki refreshes. It is not part of the installed user runtime bundle.

## 6. Install model

The stable contract is the shared skill folder name. Provider-specific command syntax is a convenience layer.

| Provider | Runtime shape |
| --- | --- |
| Claude Code | Skill folders under the Claude skills directory |
| Codex | Direct skill folders under `.agents/skills` and Codex skill paths, plus the repository-owned native plugin marketplace under `.agents/plugins/` |
| Gemini CLI | Extension with `GEMINI.md`, `gemini-extension.json`, skills, and namespaced commands |
| Antigravity CLI | Gemini-compatible plugin layout |
| OpenCode | Skill folders plus flat command wrappers |
| Cursor | Native `.cursor/skills/` |
| Windsurf | Native `.windsurf/skills/` |
| Roo Code | Native `.roo/skills/` |
| IBM Bob | Native `.ibm/skills/` |
| Grok | Native `.grok/skills/` |
| Shared | Portable skill-folder export |

Published-package installs default to user-level provider paths. Project-local installs remain available through `--project-root` or explicit `--target-dir` options.

## 7. Release and validation model

The npm package is the canonical registry artifact. GitHub releases mirror npm versions.

Before release:

1. Set the new version in `package.json`, then keep the version-bearing files in sync: `package.json`, `.claude-plugin/plugin.json`, the plugin entry in `.claude-plugin/marketplace.json`, `.agents/plugins/plugins/vitaecontext/.codex-plugin/plugin.json`, the root `gemini-extension.json`, and the provider `gemini-extension.json` files. `vitaecontext doctor` fails on any drift.
2. Update `CHANGELOG.md` and `.assets/docs/current-status.md`.
3. Run `npm test` and `npm run validate`.
4. Run provider export or install smoke tests.
5. Run `npm run check:codex-plugin` and `npm run validate:package`.
6. Push an annotated `vX.Y.Z` tag.

The publish workflow validates the package, checks tag/version alignment, publishes to npm with provenance, and creates the matching GitHub release.

## 8. Defined decisions

- Edit canonical runtime behavior in `skills/` first.
- Keep provider folders thin and generated where possible.
- Keep human-readable playbooks in `hub/`.
- Keep durable, conditional-load runtime knowledge in skill-local `wiki/` folders.
- Keep `llms.txt` concise and `llms-full.txt` synchronized with wiki sources.
- Do not commit Career Context files, user career exports, screenshots, or generated install output.
- Treat `llms.txt` as an emerging AI-readability convention, not as a search ranking guarantee.
