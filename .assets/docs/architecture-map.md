# VitaeContext architecture map

> This file is the maintainer and agent work map for the repository. Read it before changing runtime skills, provider adapters, package commands, docs, or release automation.

---

## 1. Purpose

This repository has two jobs:

- Maintain the canonical runtime package published as `vitaecontext`, including its `vitaecontext mcp` command and installed `vitaecontext-mcp` executable.
- Keep the human-readable project docs aligned with the runtime behavior.

The most important rule is simple: edit the canonical source in `skills/` first, then update the adapter, docs, and validation surface that depend on it.

## 2. Agent quick start

For a cold-start agent, use this read order:

1. Read this file to identify the correct layer and files.
2. Read `.assets/docs/getting-started.md` when the task starts from unclear user intent or onboarding.
3. Read `.assets/docs/end-to-end-workflows.md` when the task needs demo prompts, sample inputs, and expected deliverables.
4. Read `.assets/docs/current-status.md` to understand what is already live.
5. Read `.assets/docs/STYLEGUIDE.md` before editing Markdown, docs, examples, or templates.
6. Read `skills/vitaecontext/wiki/vitaecontext.md` when the task is broad, architectural, package-related, or about graph navigation.
7. Read only the relevant module `SKILL.md`, `wiki/index.md`, `wiki/knowledge.md`, and `references/` files for the target platform.
8. Make the smallest scoped edit that satisfies the task.
9. Run the validation listed in the change map before proposing a commit or release.

Do not load every skill module by default. Route to one module unless the task is explicitly cross-platform.

## 3. Repository layers

| Layer | Canonical path | Purpose | Edit when |
| --- | --- | --- | --- |
| Project overview | `README.md` | Public GitHub overview, problem narrative, install commands, module list, and links to release/privacy docs | Public package behavior, install flow, or project positioning changes |
| Human-readable hub | `hub/` | Editorial playbooks, templates, examples, and source-traceable methodology for humans | Public playbook content, examples, templates, or source notes change |
| VitaeGraph product subsystem | `vitaegraph/` | Independently readable product entrypoint with the public specification, schemas, graph model, and canonical templates for private user-side graphs | VitaeGraph artifact format or initialization templates change |
| MCP server subsystem | `mcp/` | Model Context Protocol server docs, client configs, and schema specification | MCP server capabilities or protocol interface changes |
| Maintainer docs | `.assets/docs/` | Internal project notes, status, style rules, and this architecture map | Maintainer-facing process or architecture changes |
| Runtime skills | `skills/` | Standard Agent Skills source, references, and wiki knowledge shipped to users | Skill behavior, routing, references, wiki entries, or module methodology changes |
| Provider adapters | `providers/` | Provider-specific install notes, wrappers, manifests, and command templates | A provider needs different activation, layout, metadata, or wrapper commands |
| Core engine & CLI | `src/`, `bin/` | Install, export, doctor, version, MCP, Career Context, VitaeGraph, and template commands | Package behavior, install targets, generated layouts, or diagnostics change |
| Release automation | `.github/workflows/` | Validation and npm publication workflows | CI, release checks, package publication, or tag behavior changes |
| Public release notes | `CHANGELOG.md` | User-facing release history | Any package-visible behavior changes |
| Package metadata | `package.json` | npm package metadata, bin command, scripts, and version | CLI, dependencies, package files, scripts, or version changes |
| Claude Code plugin marketplace | `.claude-plugin/marketplace.json`, `.claude-plugin/plugin.json` | `/plugin` install channel and plugin manifest, validated by `doctor` against `package.json` | Plugin metadata, marketplace listing, or version changes |
| Codex plugin marketplace | `.agents/plugins/` | Repository marketplace, native plugin manifest, and generated mirror of the configured runtime skills | Codex plugin metadata or runtime skill source changes |
| CLI unit tests | `test/` | Deterministic `node:test` suite for the CLI library and MCP server, run by `npm test` in CI | CLI or MCP behavior in semver, arg parsing, package-file matching, install-root, or uninstall paths changes |

## 4. Source-of-truth rules

Runtime methodology belongs in `skills/`.

Durable runtime knowledge that is too detailed for `SKILL.md` belongs in each skill's `wiki/` folder. Keep wiki entries conditional-load friendly and maintain their metadata so `vitaecontext doctor` can validate them.

The runtime graph entrypoint is `skills/vitaecontext/wiki/vitaecontext.md`. Use it to choose the correct module before loading detailed module wiki, reference, or hub files.

Human-readable methodology belongs in `hub/`. Keep the root directory focused on project metadata and distribution entrypoints.

Provider folders are adapters. Keep them thin. Do not copy full methodology into provider wrappers or install notes.

The docs explain what exists. They do not replace runtime skill instructions.

The website is a separate public surface. Keep repo docs accurate first, then mirror user-facing changes to the website when needed.

## 5. Common change map

Use this table to decide what to edit for common tasks.

| Task | Primary files | Usually also update | Validation |
| --- | --- | --- | --- |
| Change a platform skill workflow | `skills/vitaecontext-<module>/SKILL.md`, `skills/vitaecontext-<module>/references/`, `skills/vitaecontext-<module>/wiki/` | Related `README.md` module row, `.assets/docs/current-status.md`, `CHANGELOG.md` | `npm run validate` |
| Change a human-readable playbook | `hub/<module>/` | Related runtime skill reference if behavior changes, `README.md`, `.assets/docs/current-status.md` | Link/path smoke check, `npm run validate` if runtime behavior changes |
| Add a new skill module | `skills/vitaecontext-<module>/` | `src/export-config.json`, provider wrappers, `README.md`, `.assets/docs/project.md`, `.assets/docs/current-status.md`, `CHANGELOG.md` | `npm run validate`, export all providers |
| Change VitaeGraph behavior | `vitaegraph/`, `skills/vitaecontext-vitaegraph/`, `src/vitaegraph/` | Root routing, provider wrappers, mirrors, public docs, tests | VitaeGraph smoke tests, `npm run validate`, export all providers |
| Change MCP server behavior | `src/mcp/`, `mcp/`, `bin/vitaecontext-mcp.mjs` | `mcp/README.md`, `README.md`, `CHANGELOG.md` | `node --test test/mcp-server.test.mjs test/mcp-package.test.mjs`, `npm run validate` |
| Change provider install behavior | `providers/<provider>/`, `src/export-config.json`, `bin/vitaecontext.mjs` | Provider docs in `README.md`, `.assets/docs/current-status.md`, `CHANGELOG.md` | Provider install smoke test |
| Change CLI commands | `bin/vitaecontext.mjs`, `src/<subsystem>/` | `README.md`, `.assets/docs/current-status.md`, `CHANGELOG.md` | CLI command smoke test, `npm run validate:package` |
| Change Career Context lifecycle behavior | `src/context/`, `skills/vitaecontext-build/references/` | `README.md`, relevant examples/templates, `CHANGELOG.md` | Context CLI tests, fictional example validation |
| Change runtime wiki graph or `llms.txt` files | `skills/*/wiki/`, `llms.txt`, `llms-full.txt` | `README.md`, `.assets/docs/current-status.md` | `npm run validate`, `npm pack --dry-run` |
| Change packaging files | `package.json`, `.npmignore` if added later | `.github/workflows/npm-publish.yml`, `README.md`, `CHANGELOG.md` | `npm pack --dry-run` |
| Prepare a release | `package.json`, provider manifests with explicit versions, `CHANGELOG.md`, `.assets/docs/current-status.md` | Git tag and GitHub release after validation | Full release checklist |
| Change CI or publication | `.github/workflows/` | `.assets/docs/current-status.md`, release docs if behavior changed | GitHub Actions run on pushed branch/tag |

## 6. Provider map

| Provider | Runtime source | Adapter source | Installed shape |
| --- | --- | --- | --- |
| Shared bundle | `skills/` | `src/export-config.json` | Portable folders with `SKILL.md` |
| Claude Code | `skills/` | [`providers/claude-code/install.md`](../../providers/claude-code/install.md) | Skills under `~/.claude/skills/` |
| Codex | `skills/` | [`providers/codex/install.md`](../../providers/codex/install.md) | Skills under `~/.agents/skills/` plus `CODEX_HOME/skills` or `~/.codex/skills/` |
| Gemini CLI | `skills/` | [`providers/gemini-cli/install.md`](../../providers/gemini-cli/install.md) | Extension under `~/.gemini/extensions/vitaecontext/` |
| Antigravity CLI | `skills/` | [`providers/antigravity/install.md`](../../providers/antigravity/install.md) | Plugin under `~/.gemini/antigravity-cli/plugins/vitaecontext/` |
| OpenCode | `skills/` | [`providers/opencode/install.md`](../../providers/opencode/install.md) | Skills plus flat command wrappers |
| Cursor | `skills/` | [`providers/cursor/install.md`](../../providers/cursor/install.md) | Skills under `.cursor/skills/` |
| Windsurf | `skills/` | [`providers/windsurf/install.md`](../../providers/windsurf/install.md) | Skills under `.windsurf/skills/` |
| Roo Code | `skills/` | [`providers/roo-code/install.md`](../../providers/roo-code/install.md) | Skills under `.roo/skills/` |
| IBM Bob | `skills/` | [`providers/ibm-bob/install.md`](../../providers/ibm-bob/install.md) | Skills under `.ibm/skills/` |
| xAI Grok | `skills/` | [`providers/grok/install.md`](../../providers/grok/install.md) | Skills under `.grok/skills/` |

Provider wrappers must route to the shared skill names:

- `vitaecontext`
- `vitaecontext-build`
- `vitaecontext-vitaegraph`

## 7. Release checklist

Before pushing a release tag:

1. Set the new version in `package.json`, then keep the version-bearing files in sync (`doctor` fails on drift): `package.json`, `.claude-plugin/plugin.json`, the plugin entry in `.claude-plugin/marketplace.json`, `.agents/plugins/plugins/vitaecontext/.codex-plugin/plugin.json`, the root `gemini-extension.json`, and the provider `gemini-extension.json` files. See [MAINTAINING.md](../../MAINTAINING.md#version-files-to-bump-on-release).
2. Move public changes from `CHANGELOG.md` `Unreleased` into the new version section.
3. Update `.assets/docs/current-status.md` with the current package version and release list.
4. Run `npm test` and `npm run validate`.
5. Run CLI smoke tests for changed commands.
6. Run provider export or install smoke tests for changed providers.
7. Run `npm run check:codex-plugin` and `npm run validate:package`.
8. Commit the release files.
9. Create and push the matching annotated `vX.Y.Z` tag.

The npm publish workflow runs only after the tag is pushed.

## 8. Quick command reference

```bash
npm run validate
node bin/vitaecontext.mjs version
node bin/vitaecontext.mjs doctor
node bin/vitaecontext.mjs export --provider all --output /tmp/vitaecontext-export --force
node bin/vitaecontext.mjs install --provider codex --target-dir /tmp/vitaecontext-codex --force
node bin/vitaecontext.mjs install --provider cursor --target-dir /tmp/vitaecontext-cursor --force
node bin/vitaecontext.mjs install --provider gemini-cli --target-dir /tmp/vitaecontext-gemini --force
node bin/vitaecontext.mjs install --provider antigravity --target-dir /tmp/vitaecontext-antigravity --force
npm pack --dry-run
```

---

See also: [getting-started.md](./getting-started.md), [end-to-end-workflows.md](./end-to-end-workflows.md), [current-status.md](./current-status.md), [STYLEGUIDE.md](./STYLEGUIDE.md), [project.md](./project.md), and [MAINTAINING.md](../../MAINTAINING.md).
