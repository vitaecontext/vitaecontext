# Changelog

All notable changes to AgentKit SEO are documented here.

This project follows npm package versions and mirrors them with matching GitHub `v*` tags.

## Unreleased

No unreleased changes yet.

## 1.5.3 - 2026-05-26

### Fixed

- Added Antigravity CLI's root `plugin.json` to generated `--provider antigravity` installs and exports so the plugin folder matches Antigravity's discovery layout.

## 1.5.2 - 2026-05-22

### Added

- Added native `--provider antigravity` install and export support using the Antigravity CLI plugin staging path under `~/.gemini/antigravity-cli/plugins/agentkit-seo/`.

### Changed

- Moved the human-readable playbook folders under `hub/` so the repository root stays focused on project metadata and provider distribution artifacts.
- Included the full `hub/` tree in the npm package so README module links and human-readable playbooks remain available from packed releases.

## 1.5.1 - 2026-05-19

### Changed

- Refactored the CLI entry script into smaller export-layer modules while preserving command flags and user-facing output.
- Included the repository-root Gemini CLI extension layout in the npm package so packed-package diagnostics match the published package contents.
- Ignored local `.agents/` runtime output to avoid accidentally committing generated agent install files.
- Codex installs now mirror skills into both `~/.agents/skills/` and `~/.codex/skills/` (or `CODEX_HOME/skills`) for compatibility.

## 1.5.0 - 2026-05-19

### Changed

- Hardened `agentkit-seo install` with provider detection warnings for clean-machine installs and clearer permission or missing-path failure messages.
- Extended `agentkit-seo doctor` to verify that the npm `files` list still includes the runtime skills, export CLI, provider adapters, and context template required for external installs.
- Added a repository-root Gemini CLI extension layout with `gemini-extension.json`, `GEMINI.md`, root `commands/`, and root `skills/` so gallery discovery and direct GitHub installs can use the repository as the extension root.
- Extended `agentkit-seo doctor` to verify the repository-root Gemini extension manifest, context file, commands, and bundled skills required for Gemini gallery distribution.

## 0.1.4 - 2026-05-11

### Added

- Added a maintainer architecture map for scoped edits, validation, provider boundaries, and release workflow.
- Added public playbook links to the root module table and human-readable module README files.

### Changed

- Strengthened the web portfolio skill and playbook guidance for JSON-LD, page-type schema accuracy, article freshness signals, metadata consistency, social preview images, author and publisher identity, breadcrumbs, and realistic SEO expectations.
- Included additional maintainer docs in the npm package file list.

## 0.1.3 - 2026-05-08

### Added

- Added `agentkit-seo version` for quick package identity checks.
- Added `agentkit-seo doctor` and `npm run validate` for package layout validation.
- Added `agentkit-seo template context` to scaffold the guided private context-file template.
- Added `agentkit-seo-install.json` manifests during provider installs.
- Added push and pull request validation through `.github/workflows/validate.yml`.

### Changed

- Synced provider metadata versions from `package.json` during export and install.
- Updated npm publish automation to validate the package layout before packaging.
- Included the guided context-file template in the npm package.

## 0.1.2 - 2026-05-05

### Changed

- Strengthened launch positioning and public README language.
- Added a complete agent-context-file example to support context-first workflows.
- Consolidated maintainer status notes for release and distribution tracking.

## 0.1.1 - 2026-05-05

### Changed

- Aligned install documentation with the published npm package.
- Documented direct npm, GitHub, and local maintainer install flows.

## 0.1.0 - 2026-05-05

### Added

- Published the initial npm package for AgentKit SEO.
- Added tag-based npm publish automation with GitHub release creation.
- Added repository policy files including `SECURITY.md` and `.github/CODEOWNERS`.
