# Changelog

All notable changes to VitaeContext are documented here.

This project follows npm package versions and mirrors them with matching GitHub `v*` tags.

## 2.0.0 - 2026-07-11

### Changed

- Renamed the project, npm package, CLI, runtime skills, provider adapters, config paths, manifests, documentation, and generated distribution mirrors from AgentKit SEO to VitaeContext.
- Repositioned the project as reusable career context infrastructure for grounded AI work and documented VitaeGraph as its deeper structured-record layer.
- Added the VitaeContext visual assets and retained distinct, service-appropriate colors for repository badges.

### Compatibility

- Kept `agentkit-seo` as a deprecated executable alias that forwards to `vitaecontext` with a warning.
- Kept update and uninstall support for existing `agentkit-seo-install.json` manifests while new installs write `vitaecontext-install.json`.

## 1.9.2 - 2026-07-11

### Changed

- Added a shared runtime execution contract that resolves the owning surface, task mode, mutation authority, evidence scope, audit depth, and artifact verification before loading detailed module context.
- Expanded VitaeGraph runtime behavior into separate create, deepen, maintain, validate, index, retrieve, and migrate modes, with stable-ID maintenance rules, destructive-change previews, CLI degraded-mode reporting, and publication-consent boundaries.
- Aligned every downstream skill with the canonical VitaeGraph schema and moved graph-level target direction and claims-to-avoid handling back to `VITAEGRAPH.md`.
- Made installed skill links portable by using public URLs for human playbooks, repository source inventories, maintainer docs, and public LLM maps that provider installs do not ship locally.
- Anchored audit-score completion rates and fix-first calculations to reduce agent-to-agent scoring drift.
- Extended `doctor` to validate configured-skill routing, runtime self-review sections, portable relative links, and legacy VitaeGraph vocabulary.
- Added an internal-contract audit mode to the maintainer-only wiki workflow.

## 1.9.1 - 2026-07-07

### Changed

- Refreshed the VitaeContext and VitaeGraph README banners with lighter, clearer public branding.
- Included the new README banner asset directory in the npm package and removed stale package file entries for retired banner paths.
- Updated maintainer docs so the repository map reflects VitaeGraph as an installed product module and the current eight-skill runtime bundle.

## 1.9.0 - 2026-07-07

### Added

- Added VitaeGraph as the separate `vitaecontext-vitaegraph` runtime skill and root product subsystem, with schemas, canonical Markdown templates, provider wrappers, runtime wiki guidance, and package coverage.
- Added `graph init`, `graph validate`, and `graph index` commands using `~/.vitaecontext/vitaegraph` by default and an exact custom `--root` when supplied. They preserve Markdown as source, validate stable IDs, record types, parent and related-record links, duplicates, and internal links, and generate deterministic graph, lexical-index, and diagnostics JSON under `.generated/`.
- Added deterministic tests for VitaeGraph parsing, initialization, validation, indexing, CLI behavior, provider wrappers, and package coverage.

### Changed

- Standardized personal career context examples on the private `~/.vitaecontext/<name-surname>-career-context.md` convention across runtime guidance, provider wrappers, hub docs, generated mirrors, and the README.
- Included the public README and VitaeGraph visual assets in the npm package so packed documentation resolves its referenced images without adding private workspace data.
- Updated root routing and platform skills to consume selected VitaeGraph records when the user supplies an explicit path, while preserving the independent compact personal career context workflow.
- Redesigned VitaeGraph around hierarchical degree, course, thesis, project, role, and certification records. The canonical graph now uses parent containment and rich domain templates instead of evidence nodes, source ledgers, evidence references, or evidence-level metadata.
- Expanded the root VitaeGraph product entrypoint into a self-contained guide covering its architecture, installation, workspace model, authoring lifecycle, validation, generated artifacts, retrieval, and privacy boundaries.
- Added conditional per-node workflows that inventory sources before writing, finish one domain at a time, deepen every node through repeated extraction and synthesis passes, and enrich exact GitHub repository URLs through the bundled public fetcher.
- Updated the GitHub fetcher to create unique temporary report directories by default, enrich selected repositories through the unauthenticated GitHub API with homepage, topics, primary language, default branch, license, fork/archive state, and lifecycle timestamps, and retain public-page fallback warnings without adding volatile popularity counts.

## 1.8.3 - 2026-06-27

### Added

- Added a public workflow overview and a grounded-optimization visual to explain how raw career material becomes evidence-bounded platform output.

### Changed

- Restructured the README around the problem, workflow, grounding, quick start, modules, installation, and documentation, with a smaller set of linked project-status badges.
- Renamed the user-facing `agent context file` concept to `Career Context file` across runtime skills, provider adapters, public guidance, and generated mirrors while preserving stable technical identifiers and the `Context Builder` module name.
- Clarified that users supply raw career material to an AI agent, which invokes `vitaecontext-build` to create and maintain the Career Context file.

## 1.8.2 - 2026-06-24

### Added

- Added a tokenless GitHub public-profile fetcher to the `vitaecontext-github` skill. It extracts public profile fields, distinguishes pinned repositories from GitHub's popular-repository fallback, retrieves recent source repositories and bounded README excerpts, and writes compact Markdown plus structured JSON reports.

### Changed

- Reworked the GitHub fetcher to remove shell execution and Git CLI calls, validate profile input, use semantic HTML landmarks instead of exact class strings, retry bounded public requests, default to the three-repository audit depth, preserve partial-result warnings, and use English comments and output throughout.
- Added deterministic tests for profile, showcase, repository-list, pagination, input-validation, HTML-cleaning, and report-boundary behavior.

## 1.8.1 - 2026-06-21

### Changed

- Extended career direction awareness across the agent-context runtime, public spec, and guided template with growth direction, emerging interests, evidence boundaries, positioning constraints, and claims to avoid. Downstream platform skills now use future direction for emphasis while keeping public claims grounded in verified evidence.

## 1.8.0 - 2026-06-07

### Added

- Added `DESIGN.md`, a human and recruiter-facing overview that maps each applied agentic-AI concept (career context file, LLM Wiki, progressive disclosure, Markdown knowledge graph, evidence labeling, one-source-many-adapters) to its origin and to where it lives in the source tree, with a knowledge-graph diagram and a release-by-release record of how the design evolved.
- Added a `Design principles` section to `README.md` with a concept table and a Mermaid knowledge-graph diagram, plus a `Design` navigation link and a `getting-started.md` path entry.
- Added a `node:test` unit suite under `test/` covering semver comparison, CLI flag parsing, package-file matching, install-root resolution, and uninstall path collection, wired into CI through an `npm test` step in `validate.yml`.
- Named AI-answer-engine readiness (GEO/AEO) as an applied concept in `README.md` and `DESIGN.md`, mapped to the existing per-module AI-readability guidance and labeled as an evolving practice with no ranking guarantee.
- Added a one-source-to-many-adapters distribution diagram to the `README.md` repository layout section.
- Added Claude Code plugin-marketplace distribution: `.claude-plugin/marketplace.json` and `.claude-plugin/plugin.json` so the skills install through `/plugin marketplace add` and `/plugin install`, included in the npm package and validated by `doctor`.
- Added an `audit-scoring.md` reference to the GitHub, LinkedIn, CV/ATS, and web-portfolio skills: a weighted 0-100 triage scorecard with bands and a prioritized fix-first ranking, explicitly labeled as an internal prioritization heuristic rather than a platform ranking, and wired into each skill's response shape.
- Added `license` and a `metadata` block (homepage, repository) to every runtime `SKILL.md` frontmatter so provenance travels with the installed skill.
- Added a `Goals and targeting` section to the agent-context-file spec, template, and intake workflow, capturing the user's ideal role, current focus, what they want to work on next, target locations (or `No restriction`), interests, and constraints as stated intent kept separate from verified facts, so downstream skills can aim output without inventing experience.
- Added a professional-persona lens to each skill's overview (for example, hiring manager and open-source maintainer for GitHub, technical recruiter for LinkedIn) to focus the agent's perspective.
- Added a `Self-review` step to every skill: before returning, the agent checks the draft for fabricated facts, correct evidence labels, scope and goal alignment, and impact ordering, and flags any failure it cannot fix.

### Changed

- Corrected the LLM Wiki attribution in `README.md` and `DESIGN.md`: the wiki is compiled and kept current by a maintainer agent and read by runtime agents instead of re-derived per query, and documented how the design deliberately adapts Karpathy's personal-second-brain concept to a shipped, versioned knowledge pack.

- Extended `vitaecontext update --provider <provider>` to read the installed provider manifest and compare that installed skill version against npm latest, so agents can suggest an explicit update check without background network behavior.
- Extended `vitaecontext doctor` to enforce the Agent Skills description convention: every configured skill must declare a non-empty `description` within 1024 characters (warning over 500) that states when to use the skill, plus a `license` field; and to validate the Claude Code marketplace and plugin manifests against `package.json`. Documented the conventions in `STYLEGUIDE.md`.

## 1.7.0 - 2026-06-01

### Added

- Added `vitaecontext update`, an explicit, opt-in CLI command that compares the local package version against the npm registry latest and reports whether an update is available. It runs only when invoked, supports `--json` and `--timeout`, and never checks for updates automatically.
- Added `vitaecontext uninstall --provider <provider>`, which reads the install manifest and removes only the VitaeContext skill folders, command wrappers, and manifest it created. Shared skill directories keep unrelated skills; Gemini-style extension and plugin installs remove their dedicated directory. Supports `--dry-run` and `--force`.

## 1.6.1 - 2026-05-27

### Fixed

- Included maintainer graph entrypoints in the npm package file list and validation so README, `llms.txt`, and maintainer-doc links resolve from packed releases.

## 1.6.0 - 2026-05-27

### Added

- Added an LLM wiki layer with `wiki/` folders for all six platform modules, a root VitaeContext self-description, a conditional loading convention, shared evidence labels, and inline confidence labels.
- Added root `llms.txt` and `llms-full.txt` files and included them in the npm package.
- Added `MAINTAINING.md` with platform update chains, source quality rules, generated-file boundaries, and a contributor pull request checklist.

### Changed

- Extended `vitaecontext doctor` to validate wiki metadata, stale review dates, local wiki links, skill wiki context sections, Gemini mirror wiki presence, and package file coverage for LLM-facing files.
- Updated provider install and export copying so `wiki/` folders are included for all providers alongside `SKILL.md` and `references/`.
- Cleaned `hub/*/sources.md` inventories per module by removing third-party sources from stable support or downgrading unsupported claims to inferred or disputed handling.
- Rewrote the root `README.md` around the `AGENTS.md` career-context analogy, added an LLM Wiki section, and tightened the public landing-page structure for production use.

### Fixed

- Fixed the Gemini mirror export gap so generated `skills/` mirrors include matching `wiki/` folders.

## 1.5.3 - 2026-05-26

### Fixed

- Added Antigravity CLI's root `plugin.json` to generated `--provider antigravity` installs and exports so the plugin folder matches Antigravity's discovery layout.

## 1.5.2 - 2026-05-22

### Added

- Added native `--provider antigravity` install and export support using the Antigravity CLI plugin staging path under `~/.gemini/antigravity-cli/plugins/vitaecontext/`.

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

- Hardened `vitaecontext install` with provider detection warnings for clean-machine installs and clearer permission or missing-path failure messages.
- Extended `vitaecontext doctor` to verify that the npm `files` list still includes the runtime skills, export CLI, provider adapters, and context template required for external installs.
- Added a repository-root Gemini CLI extension layout with `gemini-extension.json`, `GEMINI.md`, root `commands/`, and root `skills/` so gallery discovery and direct GitHub installs can use the repository as the extension root.
- Extended `vitaecontext doctor` to verify the repository-root Gemini extension manifest, context file, commands, and bundled skills required for Gemini gallery distribution.

## 0.1.4 - 2026-05-11

### Added

- Added a maintainer architecture map for scoped edits, validation, provider boundaries, and release workflow.
- Added public playbook links to the root module table and human-readable module README files.

### Changed

- Strengthened the web portfolio skill and playbook guidance for JSON-LD, page-type schema accuracy, article freshness signals, metadata consistency, social preview images, author and publisher identity, breadcrumbs, and realistic SEO expectations.
- Included additional maintainer docs in the npm package file list.

## 0.1.3 - 2026-05-08

### Added

- Added `vitaecontext version` for quick package identity checks.
- Added `vitaecontext doctor` and `npm run validate` for package layout validation.
- Added `vitaecontext template context` to scaffold the guided private context-file template.
- Added `vitaecontext-install.json` manifests during provider installs.
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

- Published the initial npm package for VitaeContext.
- Added tag-based npm publish automation with GitHub release creation.
- Added repository policy files including `SECURITY.md` and `.github/CODEOWNERS`.
