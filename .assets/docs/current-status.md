# AgentKit SEO Current Status

This file is the maintainer snapshot for the current state of AgentKit SEO. It records what is live, what is automated, and what still remains open without turning the public `README.md` into an internal log.

## As of 2026-05-19

### Public surfaces

AgentKit SEO currently has two live public surfaces:

- source repo: `https://github.com/agentkit-seo/agentkit-seo`
- website / human-readable hub: `https://agentkit-seo.github.io/`

The npm package is live at:

- `https://www.npmjs.com/package/agentkit-seo`

Current release candidate:

- `agentkit-seo@1.5.1`

GitHub releases currently published or pending:

- `v0.1.0`
- `v0.1.1`
- `v0.1.2`
- `v0.1.3`
- `v0.1.4`
- `v1.5.0`
- `v1.5.1` pending release

### Core architecture

- `.skills/agent-skill/` is the canonical source of truth for the runtime skill system.
- `.skills/providers/` contains provider-specific adapter notes and install shapes.
- `.skills/export/` contains the install/export CLI.
- the repo root and module folders remain the human-readable editorial layer
- the public site mirrors the human-readable layer for crawlability, indexing, and public navigation
- `.assets/docs/STYLEGUIDE.md` remains the schema reference for repo Markdown authoring
- `.assets/docs/architecture-map.md` is the maintainer and agent work map for where to edit, validate, and release changes

### Skill coverage

The shared portable skills currently shipped are:

- `agentkit-seo`
- `agentkit-seo-agent-context-optimization`
- `agentkit-seo-linkedin`
- `agentkit-seo-github`
- `agentkit-seo-cv-ats`
- `agentkit-seo-web-portfolio`
- `agentkit-seo-x-twitter`

Each runtime module is self-contained through:

- `SKILL.md`
- local `references/`
- provider-agnostic structure suitable for export and install

### Current install and distribution status

Working today:

- direct install for `codex`
- Codex installs mirror skills into both `~/.agents/skills/` and `~/.codex/skills/` for compatibility
- direct install for `claude-code`
- direct extension install for `gemini-cli`
- repository-root Gemini CLI extension layout for gallery discovery and direct GitHub installs
- direct install for `opencode`
- shared bundle export
- provider-shaped export bundles
- published npm package usage through `npx agentkit-seo ...`
- direct GitHub install through `npx github:agentkit-seo/agentkit-seo ...`
- local maintainer execution through `npx . ...` and `npm exec --package ./. -- ...`
- CLI diagnostics through `agentkit-seo version` and `agentkit-seo doctor`
- install-time provider detection warnings for clean-machine setups
- guided context-file scaffolding through `agentkit-seo template context`
- local install manifests through `agentkit-seo-install.json`

Provider-facing command shapes available today:

- Gemini CLI namespaced commands such as `/agentkit-seo:linkedin`
- OpenCode flat wrappers such as `/agentkit-seo-linkedin`

Gemini marketplace preparation now includes:

- `gemini-extension.json` at the repository root
- `GEMINI.md` at the repository root
- root `commands/agentkit-seo/` wrappers
- root `skills/` bundles that match the generated Gemini extension layout
- the required GitHub topic `gemini-cli-extension`

### Website status

The public website is live and acts as the human-readable knowledge hub.

Current role of the site:

- public project overview
- skill pages
- playbooks
- provider pages
- installation and usage docs
- changelog and contact routes

The site is statically built with Astro and deployed to GitHub Pages.

### Indexing and discoverability status

The current public indexing baseline is in place:

- canonical site URL configured in Astro
- `robots.txt` allows crawling and exposes the sitemap
- `sitemap.xml` is generated from public routes, skill routes, and playbooks
- `llms.txt` provides a public-safe AI-readable summary and route map
- the main repo has its website URL set to the live site

The OG preview asset for the site was corrected and regenerated to fix layout overflow and inconsistent preview styling.

### Automation status

Three main GitHub Actions pipelines now exist:

#### 1. Site deployment pipeline

Repo:

- `agentkit-seo/agentkit-seo.github.io`

Workflow:

- `.github/workflows/deploy-pages.yml`

Current behavior:

- triggers on pushes to `main`
- installs dependencies
- runs the Astro build
- uploads the `dist` artifact
- deploys to GitHub Pages

#### 2. npm publish pipeline

Repo:

- `agentkit-seo/agentkit-seo`

Workflow:

- `.github/workflows/npm-publish.yml`

Current behavior:

- triggers on tags matching `v*`
- verifies the pushed tag matches `package.json`
- validates package layout through `npm run validate`
- runs `npm pack --dry-run`
- publishes to npm with provenance
- creates the matching GitHub release on success

Required secret:

- `NPM_TOKEN`

Important note:

- the token must work for non-interactive CI publishing; earlier failures were caused by npm `EOTP` until the token setup was corrected

#### 3. Package validation pipeline

Repo:

- `agentkit-seo/agentkit-seo`

Workflow:

- `.github/workflows/validate.yml`

Current behavior:

- triggers on pushes and pull requests targeting `main`
- runs `npm run validate`
- checks the CLI `version` command
- exports all provider bundles
- smoke-installs Codex and Gemini CLI bundles into `/tmp`
- runs `npm pack --dry-run`

### Repo and docs work already completed

Completed repository work includes:

- npm badge/link added to the main `README.md`
- maintainer architecture map added for agents working across skills, providers, docs, package metadata, and release automation
- public playbook links added to the root module table and module README files
- web portfolio runtime and hub guidance expanded for structured-data accuracy, metadata consistency, preview images, author identity, and realistic SEO expectations
- install docs aligned with the published package
- canonical `npx agentkit-seo install --provider codex` flow documented
- direct GitHub invocation documented
- maintainer local install flow documented
- `SECURITY.md` added
- `.github/CODEOWNERS` added
- GitHub release flow created and verified
- npm publish workflow now verifies that pushed `v*` tags match `package.json`
- npm publish workflow now runs the CLI doctor before packaging
- push and pull request validation workflow added
- `CHANGELOG.md` added for public release tracking
- CLI version, doctor, context template, and install manifest support added
- package validation now checks that runtime skill and provider assets are included in the npm `files` list
- GitHub organization profile README updated with clickable maintainer badges

### Current process boundaries

This project is still prioritizing:

- shared skill quality
- provider install reliability
- package clarity
- public documentation clarity
- website discoverability

This project is not currently prioritizing:

- benchmark or eval suites
- polished showcase/demo assets
- online latest-version update detection inside Codex itself

### Remaining gaps

Important gaps still open:

- Gemini CLI gallery listing is pending crawler detection after the tagged release
- the main repo does not yet have a separately configured custom GitHub social preview
- installed skills expose local package metadata, but do not yet compare against npm latest
- demo assets and before/after public examples are still missing
