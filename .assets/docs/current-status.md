# AgentKit SEO current status

This file is the maintainer snapshot for what is live, what is packaged, and what remains open. Keep public positioning in `README.md`; keep operational status here.

## As of 2026-05-27

### Public surfaces

- Source repo: `https://github.com/agentkit-seo/agentkit-seo`
- Website and human-readable hub: `https://agentkit-seo.github.io/`
- npm package: `https://www.npmjs.com/package/agentkit-seo`
- Current package version: `agentkit-seo@1.6.0`

Published release line:

- `v0.1.0` through `v0.1.4`
- `v1.5.0` through `v1.5.3`
- `v1.6.0`

### Current architecture

- `.skills/agent-skill/` is the canonical runtime source.
- `.skills/providers/` contains thin provider adapters.
- `.skills/export/` contains the install, export, doctor, list, version, and template CLI.
- `hub/` contains human-readable playbooks, templates, examples, and source notes.
- `.assets/docs/` contains maintainer docs, status, architecture, and Markdown rules.
- `llms.txt` and `llms-full.txt` expose the LLM-facing map and bundled wiki layer.
- `.skills/agent-skill/agentkit-seo/wiki/agentkit-seo.md` is the runtime graph entrypoint for installed agents.
- Root `skills/`, `commands/`, `GEMINI.md`, and `gemini-extension.json` are generated Gemini-compatible distribution artifacts stored in the repo intentionally.

### Shipped skill coverage

The npm package ships seven portable skill bundles:

- `agentkit-seo`
- `agentkit-seo-agent-context-optimization`
- `agentkit-seo-cv-ats`
- `agentkit-seo-github`
- `agentkit-seo-linkedin`
- `agentkit-seo-web-portfolio`
- `agentkit-seo-x-twitter`

Each runtime module carries:

- `SKILL.md`
- local `references/`
- local `wiki/` entries where durable constraints, confidence labels, failure modes, and audit rules belong

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

Working CLI surfaces:

- `agentkit-seo version`
- `agentkit-seo doctor`
- `agentkit-seo list providers`
- `agentkit-seo list skills`
- `agentkit-seo list commands --provider <provider>`
- `agentkit-seo template context`
- `agentkit-seo install --provider <provider>`
- `agentkit-seo export --provider <provider|all>`

Every install writes `agentkit-seo-install.json` with package version, provider, skills, commands, and target paths.

### LLM wiki and graph status

The runtime wiki layer is installed and exported with provider bundles.

- `llms.txt` is the concise package map.
- `llms-full.txt` concatenates the root wiki, module wiki indexes, and module knowledge files.
- The root runtime wiki explains the graph navigation contract before agents load module details.
- Module `SKILL.md` files use `## Wiki context` to declare when wiki files should be loaded.
- `agentkit-seo doctor` validates wiki metadata, review dates, links, module/folder matches, skill wiki-context sections, Gemini mirror coverage, and package `files` inclusion for LLM-facing files.

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
- online latest-version checks inside installed agents
- broad marketplace-specific rewrites before provider behavior is confirmed

### Open gaps

- Gemini CLI gallery listing still depends on external crawler/listing behavior after tagged releases.
- Antigravity CLI command syntax needs live `agy` confirmation.
- The main source repo still needs a dedicated GitHub social preview.
- Installed skills include local package metadata but do not compare against npm latest.
- Public demo assets and before/after examples are still sparse.
- Wiki refresh automation from live official sources is planned but not shipped.

---

See also: [architecture-map.md](./architecture-map.md), [STYLEGUIDE.md](./STYLEGUIDE.md), [project.md](./project.md), and [MAINTAINING.md](../../MAINTAINING.md).
