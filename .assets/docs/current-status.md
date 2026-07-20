# VitaeContext current status

This file is the maintainer snapshot for what is live, what is packaged, and what remains open. Keep public positioning in `README.md`; keep operational status here.

## As of 2026-07-19

### Public surfaces

- Source repo: `https://github.com/vitaecontext/vitaecontext`
- Website and human-readable hub: `https://vitaecontext.github.io/`
- npm package: `https://www.npmjs.com/package/vitaecontext`
- Current package version: `vitaecontext@2.1.0`

Published release line:

- `v0.1.0` through `v0.1.4`
- `v1.5.0` through `v1.5.3`
- `v1.6.0` through `v1.6.1`
- `v1.7.0`
- `v1.8.0` through `v1.8.3`
- `v1.9.0` through `v1.9.2`
- `v2.0.0`

Prepared next release:

- `v2.1.0` is prepared in the source tree and requires the matching release tag before it is available from npm.

### Current architecture

- `.skills/agent-skill/` is the canonical runtime source.
- `.skills/providers/` contains thin provider adapters.
- `.skills/export/` contains the install, export, doctor, list, version, Career Context, VitaeGraph, and template CLI.
- `hub/` contains human-readable playbooks, templates, examples, and source notes.
- `.assets/docs/` contains maintainer docs, status, architecture, and Markdown rules.
- `llms.txt` and `llms-full.txt` expose the LLM-facing map and bundled wiki layer.
- `.skills/agent-skill/vitaecontext/wiki/vitaecontext.md` is the runtime graph entrypoint for installed agents.
- `.assets/docs/getting-started.md` provides setup onboarding, and `.assets/docs/end-to-end-workflows.md` provides skill-ready demos with prompts, inputs, and expected deliverables.
- `DESIGN.md` is the human and recruiter-facing design overview: applied agentic-AI concepts mapped to their source and location, a knowledge-graph diagram, and a release-by-release evolution record.
- Root `skills/`, `commands/`, `GEMINI.md`, and `gemini-extension.json` are generated Gemini-compatible distribution artifacts stored in the repo intentionally.
- Root `vitaegraph/` is the shipped product entrypoint for VitaeGraph schemas and canonical templates. Private user graphs remain outside the repository.

### Shipped skill coverage

The installable user bundle ships eight portable runtime skill bundles:

- `vitaecontext`
- `vitaecontext-build`
- `vitaecontext-cv`
- `vitaecontext-github`
- `vitaecontext-linkedin`
- `vitaecontext-vitaegraph`
- `vitaecontext-portfolio`
- `vitaecontext-x`

Each runtime module carries:

- `SKILL.md`, with a role-grounded professional persona in its overview and a `## Self-review` step that checks the draft for fabricated facts, evidence-label accuracy, scope and goal alignment, and impact ordering before returning
- local `references/`, including an `audit-scoring.md` weighted 0-100 triage scorecard on the GitHub, LinkedIn, CV/ATS, and web-portfolio modules (an internal prioritization heuristic, not a platform ranking)
- local `wiki/` entries where durable constraints, confidence labels, failure modes, and audit rules belong
- `license` and a `metadata` block (homepage, repository) in frontmatter so provenance travels with the installed skill

The root orchestrator resolves surface, task mode, mutation authority, evidence scope, and depth before loading module detail. Runtime links stay inside the portable skill bundle or use public URLs for repository-only material.

VitaeGraph routes create, deepen, maintain, validate, index, retrieve, and migrate operations separately. It previews destructive or many-record changes, preserves stable IDs, treats `visibility: public` as eligibility rather than publication consent, and reports degraded manual checks when the graph CLI is unavailable.

The `vitaecontext-build` module additionally captures the user's direction, not only their history: a `Goals and targeting` section in the context-file spec, template, and intake records ideal role, current focus, what they want to work on next, growth direction, target locations (or `No restriction`), interests, evidence boundaries, positioning constraints, and claims to avoid as stated intent kept separate from verified facts.

For a GitHub username or public profile or repository source, `vitaecontext-build` now routes retrieval through the installed sibling `vitaecontext-github` fetcher. The workflow consumes its bounded Markdown and JSON reports, preserves extraction warnings as evidence limitations, removes temporary output after use, and falls back to supplied material or another public fetch tool when the sibling skill or network is unavailable.

The `vitaecontext-github` module includes a tokenless public-profile fetcher. It combines the unauthenticated GitHub API, public profile HTML, and raw README files without requesting a user token; distinguishes pinned repositories from the popular-repository fallback; defaults to three selected repositories; and emits Markdown plus JSON with repository metadata and extraction warnings. It creates a unique operating-system temporary directory by default instead of writing reports into the current repository.

### Install and distribution status

Working install targets:

| Provider | Install shape | Notes |
| --- | --- | --- |
| `claude-code` | Skill folders under `~/.claude/skills/` | Shared skill folders, no provider-specific methodology copy |
| `codex` | Skill folders under `~/.agents/skills/` and `CODEX_HOME/skills` or `~/.codex/skills/` | Covers current and legacy discovery paths |
| `gemini-cli` | Extension under `~/.gemini/extensions/vitaecontext/` | Includes `GEMINI.md`, `gemini-extension.json`, skills, and namespaced commands |
| `antigravity` | Plugin under `~/.gemini/antigravity-cli/plugins/vitaecontext/` | Uses Gemini-compatible plugin layout; exact runtime command surfacing still needs live confirmation |
| `opencode` | Skills plus flat command wrappers | Commands map to shared skill names |
| `shared` | Portable skill bundle export | Useful for manual or future provider integration |

The npm CLI install path is complemented by a Claude Code plugin-marketplace channel: `.claude-plugin/marketplace.json` and `.claude-plugin/plugin.json` let users run `/plugin marketplace add vitaecontext/vitaecontext` and `/plugin install vitaecontext@vitaecontext`.

Working CLI surfaces:

- `vitaecontext version`
- `vitaecontext update` (compares either the running package or an installed provider manifest against the npm registry latest; explicit, network-only, never automatic; supports `--provider`, `--json`, and `--timeout`)
- `vitaecontext doctor`
- `vitaecontext list providers`
- `vitaecontext list skills`
- `vitaecontext list commands --provider <provider>`
- `vitaecontext template context`
- `vitaecontext context init [--output <career-context-file>]`
- `vitaecontext context validate <career-context-file> [--json]`
- `vitaecontext context summary <career-context-file> [--for <surface>] [--output <file>] [--json]`
- `vitaecontext graph init [--root <vitaegraph-directory>]`
- `vitaecontext graph validate [--root <vitaegraph-directory>]`
- `vitaecontext graph index [--root <vitaegraph-directory>]`
- `vitaecontext install --provider <provider>`
- `vitaecontext uninstall --provider <provider>` (manifest-driven removal of installed skills, command wrappers, and manifest; supports `--dry-run` and `--force`)
- `vitaecontext export --provider <provider|all>`

Every install writes `vitaecontext-install.json` with package version, provider, skills, commands, and target paths.

### LLM wiki and graph status

The runtime wiki layer is installed and exported with provider bundles.

VitaeGraph ships as a separate runtime skill and private user artifact at `~/.vitaecontext/vitaegraph` by default. A custom `--root` names the exact graph directory. Its canonical model uses dedicated project and role folders, degree subtrees containing thesis and university-course records, and separate certification records. The CLI validates stable IDs, record types, parent and related-record links, internal links, and duplicates, then writes deterministic graph, lexical-index, and diagnostics JSON only under `.generated/`.

The runtime skill inventories supplied material before writing, processes one supported domain at a time through conditionally loaded node workflows, and enriches projects from exact GitHub repository URLs through the bundled tokenless GitHub fetcher. The canonical graph does not create evidence nodes, source ledgers, evidence references, or evidence-level metadata.

- `llms.txt` is the concise package map.
- `llms-full.txt` concatenates the root wiki, module wiki indexes, and module knowledge files.
- The root runtime wiki explains the graph navigation contract before agents load module details.
- Module `SKILL.md` files use `## Wiki context` to declare when wiki files should be loaded.
- `vitaecontext doctor` validates wiki metadata, review dates, links, module/folder matches, skill wiki-context sections, current wiki inclusion in `llms-full.txt`, skill description convention (what plus when, within 1024 characters), `license`, configured-skill routing, self-review sections, portable runtime links, the Claude Code marketplace and plugin manifests, Gemini mirror coverage, and package `files` inclusion for LLM-facing files.
- `vitaecontext-wiki-maintenance` exists in the source tree as a maintainer-only local audit workflow; it is not part of the eight installed runtime skills.

### Website and discovery status

The public website is live as the human-readable knowledge hub. It exposes:

- project overview
- skill pages
- playbooks
- provider pages
- installation and usage docs
- changelog and contact routes

Indexing baseline:

- canonical site URL configured
- `robots.txt` exposes the sitemap
- `sitemap.xml` covers public routes, skill routes, and playbooks
- public `llms.txt` and `llms-full.txt` exist for AI-readable discovery
- the main GitHub repo points to the live website

### Automation status

Main repo automation:

- `.github/workflows/validate.yml` runs validation on pushes and pull requests targeting `main`.
- `.github/workflows/npm-publish.yml` publishes to npm on pushed `v*` tags after validation and package dry-run checks.
- Package validation enforces a 5 MB compressed-size budget and checks relative links against the actual packed file list.
- Provider install tests cover preflight conflicts and rollback after a later commit failure.
- The npm publish workflow verifies tag/version alignment and creates the matching GitHub release.

Website automation:

- The website repo deploys to GitHub Pages from `main` through its Pages workflow.
- The website build checks its generated product contract, package version, and playbook hashes against a checked-out copy of the product repository before deployment.

Validation surfaces currently include:

- `npm test` (deterministic `node:test` unit suite for the CLI library and GitHub public-profile fetcher)
- `npm run validate`
- CLI version check
- provider export smoke test
- provider install smoke tests into `/tmp`
- `npm pack --dry-run`

### Current priorities

The project is currently prioritizing:

- shared skill quality
- provider install reliability
- package clarity
- public documentation clarity
- website discoverability
- source-backed wiki maintenance

The project is not currently prioritizing:

- large model benchmark suites beyond the compact fictional groundedness fixtures
- elaborate showcase assets
- background latest-version checks inside installed agents
- broad marketplace-specific rewrites before provider behavior is confirmed

### Open gaps

- Gemini CLI gallery listing still depends on external crawler/listing behavior after tagged releases.
- Antigravity CLI command syntax needs live `agy` confirmation.
- The VitaeContext GitHub social preview is stored at `.assets/image/preview/vitaecontext-social-preview.png`, and README banner assets live under `.assets/image/banners/`; upload the social preview through the GitHub repository settings when the repository identifier is migrated.
- Installed skills can prompt an explicit `vitaecontext update --provider <provider>` check against npm, but they still do not perform background update checks at agent runtime.
- The fictional end-to-end demo is intentionally compact; additional showcase assets should be added only when they demonstrate a distinct workflow.
- Fully automated unattended wiki refresh from live official sources is not shipped; source-tree assisted maintenance is available through the maintainer-only wiki-maintenance skill.

---

See also: [getting-started.md](./getting-started.md), [end-to-end-workflows.md](./end-to-end-workflows.md), [architecture-map.md](./architecture-map.md), [STYLEGUIDE.md](./STYLEGUIDE.md), [project.md](./project.md), and [MAINTAINING.md](../../MAINTAINING.md).
