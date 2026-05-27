# AgentKit SEO architecture map

> This file is the maintainer and agent work map for the repository. Read it before changing runtime skills, provider adapters, package commands, docs, or release automation.

---

## 1. Purpose

This repository has two jobs:

- Maintain the canonical runtime skill package published as `agentkit-seo`.
- Keep the human-readable project docs aligned with the runtime behavior.

The most important rule is simple: edit the canonical source first, then update the adapter, docs, and validation surface that depend on it.

## 2. Agent quick start

For a cold-start agent, use this read order:

1. Read this file to identify the correct layer and files.
2. Read `.assets/docs/current-status.md` to understand what is already live.
3. Read `.assets/docs/STYLEGUIDE.md` before editing Markdown, docs, examples, or templates.
4. Read `.skills/architecture.md` before changing runtime skills, provider adapters, export behavior, or install behavior.
5. Read `.skills/agent-skill/agentkit-seo/wiki/agentkit-seo.md` when the task is broad, architectural, package-related, or about graph navigation.
6. Read only the relevant module `SKILL.md`, `wiki/index.md`, `wiki/knowledge.md`, and `references/` files for the target platform.
7. Make the smallest scoped edit that satisfies the task.
8. Run the validation listed in the change map before proposing a commit or release.

Do not load every skill module by default. Route to one module unless the task is explicitly cross-platform.

## 3. Repository layers

| Layer | Canonical path | Purpose | Edit when |
| --- | --- | --- | --- |
| Project overview | `README.md` | Public GitHub overview, problem narrative, install commands, module list, and links to release/privacy docs | Public package behavior, install flow, or project positioning changes |
| Human-readable hub | `hub/` | Editorial playbooks, templates, examples, and source-traceable methodology for humans | Public playbook content, examples, templates, or source notes change |
| Maintainer docs | `.assets/docs/` | Internal project notes, status, style rules, and this architecture map | Maintainer-facing process or architecture changes |
| Runtime skills | `.skills/agent-skill/` | Portable skill source, references, and wiki knowledge shipped to users | Skill behavior, routing, references, wiki entries, or module methodology changes |
| Provider adapters | `.skills/providers/` | Provider-specific install notes, wrappers, manifests, and command templates | A provider needs different activation, layout, metadata, or wrapper commands |
| Export CLI | `.skills/export/` | Install, export, doctor, version, and template commands | Package behavior, install targets, generated layouts, or diagnostics change |
| Gemini-compatible root mirror | `skills/`, `commands/`, `GEMINI.md`, `gemini-extension.json` | Generated root distribution layout for Gemini-compatible discovery | Regenerate from canonical source after runtime skill or command changes |
| Release automation | `.github/workflows/` | Validation and npm publication workflows | CI, release checks, package publication, or tag behavior changes |
| Public release notes | `CHANGELOG.md` | User-facing release history | Any package-visible behavior changes |
| Package metadata | `package.json` | npm package metadata, bin command, scripts, and version | CLI, dependencies, package files, scripts, or version changes |

## 4. Source-of-truth rules

Runtime methodology belongs in `.skills/agent-skill/`.

Durable runtime knowledge that is too detailed for `SKILL.md` belongs in each skill's `wiki/` folder. Keep wiki entries conditional-load friendly and maintain their metadata so `agentkit-seo doctor` can validate them.

The runtime graph entrypoint is `.skills/agent-skill/agentkit-seo/wiki/agentkit-seo.md`. Use it to choose the correct module before loading detailed module wiki, reference, or hub files.

Human-readable methodology belongs in `hub/`. Keep the root directory focused on project metadata and distribution entrypoints.

Provider folders are adapters. Keep them thin. Do not copy full methodology into provider wrappers or install notes.

The export CLI should generate or copy provider-facing layouts from the canonical skill source. Do not maintain a second full skill tree in a provider folder.

The docs explain what exists. They do not replace runtime skill instructions.

The website is a separate public surface. Keep repo docs accurate first, then mirror user-facing changes to the website when needed.

## 5. Common change map

Use this table to decide what to edit for common tasks.

| Task | Primary files | Usually also update | Validation |
| --- | --- | --- | --- |
| Change a platform skill workflow | `.skills/agent-skill/agentkit-seo-<module>/SKILL.md`, `.skills/agent-skill/agentkit-seo-<module>/references/`, `.skills/agent-skill/agentkit-seo-<module>/wiki/` | Related `README.md` module row, `.assets/docs/current-status.md`, `CHANGELOG.md` | `npm run validate` |
| Change a human-readable playbook | `hub/<module>/` | Related runtime skill reference if behavior changes, `README.md`, `.assets/docs/current-status.md` | Link/path smoke check, `npm run validate` if runtime behavior changes |
| Add a new skill module | `.skills/agent-skill/agentkit-seo-<module>/` | `.skills/export/export-config.json`, provider wrappers, `README.md`, `.assets/docs/project.md`, `.assets/docs/current-status.md`, `CHANGELOG.md` | `npm run validate`, export all providers |
| Change provider install behavior | `.skills/providers/<provider>/`, `.skills/export/export-config.json`, `.skills/export/scripts/agentkit-seo.mjs` | Provider docs in `README.md`, `.skills/architecture.md`, `.assets/docs/current-status.md`, `CHANGELOG.md` | Provider install smoke test |
| Change CLI commands | `.skills/export/scripts/agentkit-seo.mjs` | `README.md`, `.assets/docs/current-status.md`, `CHANGELOG.md` | CLI command smoke test, `npm pack --dry-run` |
| Change context-file template behavior | `.skills/export/scripts/agentkit-seo.mjs`, `.skills/agent-skill/agentkit-seo-agent-context-optimization/references/` | `README.md`, relevant examples/templates, `CHANGELOG.md` | `agentkit-seo template context` smoke test |
| Change runtime wiki graph or `llms.txt` files | `.skills/agent-skill/*/wiki/`, `llms.txt`, `llms-full.txt` | Generated root `skills/` mirror, `README.md`, `.assets/docs/current-status.md` | `npm run validate`, `npm pack --dry-run` |
| Change packaging files | `package.json`, `.npmignore` if added later | `.github/workflows/npm-publish.yml`, `README.md`, `CHANGELOG.md` | `npm pack --dry-run` |
| Prepare a release | `package.json`, provider manifests with explicit versions, `CHANGELOG.md`, `.assets/docs/current-status.md` | Git tag and GitHub release after validation | Full release checklist |
| Change CI or publication | `.github/workflows/` | `.assets/docs/current-status.md`, release docs if behavior changed | GitHub Actions run on pushed branch/tag |

## 6. Provider map

| Provider | Runtime source | Adapter source | Installed shape |
| --- | --- | --- | --- |
| Shared bundle | `.skills/agent-skill/` | `.skills/export/export-config.json` | Portable folders with `SKILL.md` |
| Claude Code | `.skills/agent-skill/` | [`.skills/providers/claude-code/install.md`](../../.skills/providers/claude-code/install.md) | Skills under `~/.claude/skills/` |
| Codex | `.skills/agent-skill/` | [`.skills/providers/codex/install.md`](../../.skills/providers/codex/install.md) | Skills under `~/.agents/skills/` plus `CODEX_HOME/skills` or `~/.codex/skills/` |
| Gemini CLI | `.skills/agent-skill/` | [`.skills/providers/gemini-cli/install.md`](../../.skills/providers/gemini-cli/install.md) | Extension under `~/.gemini/extensions/agentkit-seo/` |
| Antigravity CLI | `.skills/agent-skill/` | [`.skills/providers/antigravity/install.md`](../../.skills/providers/antigravity/install.md) | Plugin under `~/.gemini/antigravity-cli/plugins/agentkit-seo/` |
| OpenCode | `.skills/agent-skill/` | [`.skills/providers/opencode/install.md`](../../.skills/providers/opencode/install.md) | Skills plus flat command wrappers |

Provider wrappers must route to the shared skill names:

- `agentkit-seo`
- `agentkit-seo-agent-context-optimization`
- `agentkit-seo-cv-ats`
- `agentkit-seo-github`
- `agentkit-seo-linkedin`
- `agentkit-seo-web-portfolio`
- `agentkit-seo-x-twitter`

## 7. Release checklist

Before pushing a release tag:

1. Update `package.json`.
2. Update any provider manifest with an explicit package version.
3. Move public changes from `CHANGELOG.md` `Unreleased` into the new version section.
4. Update `.assets/docs/current-status.md` with the current package version and release list.
5. Run `npm run validate`.
6. Run CLI smoke tests for changed commands.
7. Run provider export or install smoke tests for changed providers.
8. Run `npm pack --dry-run`.
9. Commit the release files.
10. Create and push the matching annotated `vX.Y.Z` tag.

The npm publish workflow runs only after the tag is pushed.

## 8. Agent operating rules

Read `.assets/docs/STYLEGUIDE.md` before editing Markdown conventions.

Read `.skills/architecture.md` before changing the skill or provider architecture.

Read `.assets/docs/current-status.md` before recommending next work.

Read `.skills/agent-skill/agentkit-seo/wiki/agentkit-seo.md` before broad graph, package, install, or module-routing work.

Prefer narrow edits. Do not rewrite unrelated docs while touching a specific skill, provider, or CLI command.

Keep generated or installed output out of commits unless the repository intentionally stores that artifact.

The repo intentionally stores the root Gemini-compatible `skills/`, `commands/`, `GEMINI.md`, and `gemini-extension.json` mirror. Refresh those through the export/install tooling instead of hand-editing them.

When changing package behavior, update both user-facing docs and maintainer status notes in the same branch.

When changing provider behavior, test at least one generated or installed provider layout before release.

## 9. Quick command reference

```bash
npm run validate
node .skills/export/scripts/agentkit-seo.mjs version
node .skills/export/scripts/agentkit-seo.mjs doctor
node .skills/export/scripts/agentkit-seo.mjs export --provider all --output /tmp/agentkit-seo-export --force
node .skills/export/scripts/agentkit-seo.mjs install --provider codex --target-dir /tmp/agentkit-seo-codex --force
node .skills/export/scripts/agentkit-seo.mjs install --provider gemini-cli --target-dir /tmp/agentkit-seo-gemini --force
node .skills/export/scripts/agentkit-seo.mjs install --provider antigravity --target-dir /tmp/agentkit-seo-antigravity --force
npm pack --dry-run
```

---

See also: [current-status.md](./current-status.md), [STYLEGUIDE.md](./STYLEGUIDE.md), [project.md](./project.md), and [MAINTAINING.md](../../MAINTAINING.md).
