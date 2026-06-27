# AgentKit SEO current status

This file is the maintainer snapshot for what is live, what is packaged, and what remains open. Keep public positioning in `README.md`; keep operational status here.

## As of 2026-06-27

### Public surfaces

- Source repo: `https://github.com/agentkit-seo/agentkit-seo`
- Website and human-readable hub: `https://agentkit-seo.github.io/`
- npm package: `https://www.npmjs.com/package/agentkit-seo`
- Current package version: `agentkit-seo@1.8.3`

Published release line:

- `v0.1.0` through `v0.1.4`
- `v1.5.0` through `v1.5.3`
- `v1.6.0` through `v1.6.1`
- `v1.7.0`
- `v1.8.0` through `v1.8.3`

### Current architecture

- `.skills/agent-skill/` is the canonical runtime source.
- `.skills/providers/` contains thin provider adapters.
- `.skills/export/` contains the install, export, doctor, list, version, and template CLI.
- `hub/` contains human-readable playbooks, templates, examples, and source notes.
- `.assets/docs/` contains maintainer docs, status, architecture, and Markdown rules.
- `llms.txt` and `llms-full.txt` expose the LLM-facing map and bundled wiki layer.
- `.skills/agent-skill/agentkit-seo/wiki/agentkit-seo.md` is the runtime graph entrypoint for installed agents.
- `.assets/docs/getting-started.md` provides setup onboarding, and `.assets/docs/end-to-end-workflows.md` provides skill-ready demos with prompts, inputs, and expected deliverables.
- `DESIGN.md` is the human and recruiter-facing design overview: applied agentic-AI concepts mapped to their source and location, a knowledge-graph diagram, and a release-by-release evolution record.
- Root `skills/`, `commands/`, `GEMINI.md`, and `gemini-extension.json` are generated Gemini-compatible distribution artifacts stored in the repo intentionally.

### Shipped skill coverage

The installable user bundle ships seven portable runtime skill bundles:

- `agentkit-seo`
- `agentkit-seo-agent-context-optimization`
- `agentkit-seo-cv-ats`
- `agentkit-seo-github`
- `agentkit-seo-linkedin`
- `agentkit-seo-web-portfolio`
- `agentkit-seo-x-twitter`

Each runtime module carries:

- `SKILL.md`, with a role-grounded professional persona in its overview and a `## Self-review` step that checks the draft for fabricated facts, evidence-label accuracy, scope and goal alignment, and impact ordering before returning
- local `references/`, including an `audit-scoring.md` weighted 0-100 triage scorecard on the GitHub, LinkedIn, CV/ATS, and web-portfolio modules (an internal prioritization heuristic, not a platform ranking)
- local `wiki/` entries where durable constraints, confidence labels, failure modes, and audit rules belong
- `license` and a `metadata` block (homepage, repository) in frontmatter so provenance travels with the installed skill

The `agentkit-seo-agent-context-optimization` module additionally captures the user's direction, not only their history: a `Goals and targeting` section in the context-file spec, template, and intake records ideal role, current focus, what they want to work on next, growth direction, target locations (or `No restriction`), interests, evidence boundaries, positioning constraints, and claims to avoid as stated intent kept separate from verified facts.

The `agentkit-seo-github` module includes a tokenless public-profile fetcher. It reads public GitHub HTML and raw repository files without requesting a user token, distinguishes pinned repositories from the popular-repository fallback, defaults to three selected repositories, and emits Markdown plus JSON with extraction warnings when public markup cannot be interpreted confidently.

### Install and distribution status

Working install targets:

| Provider | Install shape | Notes |
| --- | --- | --- |
| `claude-code` | Skill folders under `~/.claude/skills/` | Shared skill folders, no provider-specific methodology copy |
| `codex` | Skill folders under `~/.agents/skills/` and `CODEX_HOME/skills` or `~/.codex/skills/` | Covers current and legacy discovery paths |
| `gemini-cli` | Extension under `~/.gemini/extensions/agentkit-seo/` | Includes `GEMINI.md`, `gemini-extension.json`, skills, and namespaced commands |
| `antigravity` | Plugin under `~/.gemini/antigravity-cli/plugins/agentkit-seo/` | Uses Gemini-compatible plugin layout; exact runtime command surfacing still needs live confirmation |
| `opencode` | Skills plus flat command wrappers | Commands map to shared skill names |
| `shared` | Portable skill bundle export | Useful for manual or future provider integration |

The npm CLI install path is complemented by a Claude Code plugin-marketplace channel: `.claude-plugin/marketplace.json` and `.claude-plugin/plugin.json` let users run `/plugin marketplace add agentkit-seo/agentkit-seo` and `/plugin install agentkit-seo@agentkit-seo`.

Working CLI surfaces:

- `agentkit-seo version`
- `agentkit-seo update` (compares either the running package or an installed provider manifest against the npm registry latest; explicit, network-only, never automatic; supports `--provider`, `--json`, and `--timeout`)
- `agentkit-seo doctor`
- `agentkit-seo list providers`
- `agentkit-seo list skills`
- `agentkit-seo list commands --provider <provider>`
- `agentkit-seo template context`
- `agentkit-seo install --provider <provider>`
- `agentkit-seo uninstall --provider <provider>` (manifest-driven removal of installed skills, command wrappers, and manifest; supports `--dry-run` and `--force`)
- `agentkit-seo export --provider <provider|all>`

Every install writes `agentkit-seo-install.json` with package version, provider, skills, commands, and target paths.

### LLM wiki and graph status

The runtime wiki layer is installed and exported with provider bundles.

- `llms.txt` is the concise package map.
- `llms-full.txt` concatenates the root wiki, module wiki indexes, and module knowledge files.
- The root runtime wiki explains the graph navigation contract before agents load module details.
- Module `SKILL.md` files use `## Wiki context` to declare when wiki files should be loaded.
- `agentkit-seo doctor` validates wiki metadata, review dates, links, module/folder matches, skill wiki-context sections, skill description convention (what plus when, within 1024 characters) and `license` field, the Claude Code marketplace and plugin manifests, Gemini mirror coverage, and package `files` inclusion for LLM-facing files.
- `agentkit-seo-wiki-maintenance` exists in the source tree as a maintainer-only local audit workflow; it is not part of the seven installed runtime skills.

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
- The npm publish workflow verifies tag/version alignment and creates the matching GitHub release.

Website automation:

- The website repo deploys to GitHub Pages from `main` through its Pages workflow.

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

- benchmark or eval suites
- elaborate showcase assets
- background latest-version checks inside installed agents
- broad marketplace-specific rewrites before provider behavior is confirmed

### Open gaps

- Gemini CLI gallery listing still depends on external crawler/listing behavior after tagged releases.
- Antigravity CLI command syntax needs live `agy` confirmation.
- The main source repo still needs a dedicated GitHub social preview.
- Installed skills can prompt an explicit `agentkit-seo update --provider <provider>` check against npm, but they still do not perform background update checks at agent runtime.
- Public demo assets and before/after examples are still sparse.
- Fully automated unattended wiki refresh from live official sources is not shipped; source-tree assisted maintenance is available through the maintainer-only wiki-maintenance skill.

---

See also: [getting-started.md](./getting-started.md), [end-to-end-workflows.md](./end-to-end-workflows.md), [architecture-map.md](./architecture-map.md), [STYLEGUIDE.md](./STYLEGUIDE.md), [project.md](./project.md), and [MAINTAINING.md](../../MAINTAINING.md).
