# VitaeContext project brief

VitaeContext is a two-surface system: a public human-readable website and an installable npm skill package for coding agents. It covers personal branding, SEO/AEO, ATS-safe CV workflows, agent-readable career context, and a bundled LLM wiki for durable platform knowledge.

## 1. Vision

VitaeContext lets a user install a focused skill bundle into their preferred coding agent, point it at career material, and receive grounded optimization work for LinkedIn, GitHub, CVs, portfolios, X/Twitter, and reusable professional context files.

The core workflow is context first. The Career Context file is private and acts like a `CLAUDE.md` or `AGENTS.md` for a person's career: verified facts, constraints, target roles, links, achievements, and positioning live in one reusable Markdown source of truth outside this repository. The file also records the user's direction in a `Goals and targeting` section: ideal role, current focus, what they want to work on next, growth direction, target locations (or no restriction), interests, evidence boundaries, positioning constraints, and claims to avoid. These entries stay as stated intent separate from verified facts so downstream skills can aim output without inventing experience.

## 2. Public surfaces

| Surface | URL | Purpose |
| --- | --- | --- |
| Website | `https://vitaecontext.github.io/` | Public human-readable hub, playbooks, provider pages, and project docs |
| npm package | `https://www.npmjs.com/package/vitaecontext` | Installable CLI and provider-shaped skill bundles |
| Source repo | `https://github.com/vitaecontext/vitaecontext` | Canonical authoring, packaging, validation, and release source |

## 3. Repository architecture

The repository separates human docs, runtime skills, provider adapters, and export tooling.

```text
hub/
.assets/docs/
.skills/
  agent-skill/
    vitaecontext/
    vitaecontext-build/
    vitaecontext-cv/
    vitaecontext-github/
    vitaecontext-linkedin/
    vitaecontext-vitaegraph/
    vitaecontext-portfolio/
    vitaecontext-x/
  providers/
    claude-code/
    codex/
    gemini-cli/
    antigravity/
    opencode/
  export/
```

The `hub/` directory is the human-readable layer. It contains playbooks, templates, examples, source notes, and module READMEs.

Current hub modules:

- `hub/context-builder/`
- `hub/cv-ats/`
- `hub/github/`
- `hub/linkedin/`
- `hub/web-portfolio/`
- `hub/x-twitter/`

VitaeGraph is intentionally not under `hub/`. Its root [`vitaegraph/`](../../vitaegraph/) directory is the product entrypoint for the graph artifact contract: schemas, graph model, and canonical Markdown templates.

The `.skills/agent-skill/` directory is the runtime source of truth. Each shared skill carries `SKILL.md`, local `references/`, local `wiki/`, and optional provider metadata.

Provider folders are adapters only. They contain install notes, wrapper commands, and provider metadata, not copied methodology.

## 4. Runtime graph

The intended read path is hierarchical:

```text
README.md
├── hub/<module>/README.md
│   └── hub/<module>/sources.md
└── .skills/agent-skill/vitaecontext/wiki/vitaecontext.md
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
- `vitaecontext-cv`: ATS-safe CV and resume work
- `vitaecontext-github`: GitHub profile, repository, search, and agent-readiness work
- `vitaecontext-linkedin`: LinkedIn profile, search, positioning, and activity work
- `vitaecontext-vitaegraph`: private hierarchical career knowledge graphs, record enrichment, validation, and selective retrieval
- `vitaecontext-portfolio`: portfolio SEO, metadata, structured data, AI retrieval, and crawlability
- `vitaecontext-x`: X/Twitter profile, posting, Premium, and engagement guidance

This modular shape solves the context-window problem: a LinkedIn task should load the LinkedIn skill, not the whole system.

Each user-facing module opens its `SKILL.md` from a role-grounded professional persona (for example a hiring manager and maintainer for GitHub, a technical recruiter for LinkedIn) and runs a `## Self-review` step before returning, checking for fabricated facts, evidence-label accuracy, scope and goal alignment, and impact ordering. The GitHub, LinkedIn, CV/ATS, and web-portfolio modules also ship an `audit-scoring.md` weighted 0-100 triage scorecard used strictly as an internal prioritization heuristic, not a platform ranking.

The root orchestrator resolves the primary surface, task mode, mutation authority, evidence scope, and bounded depth before loading module detail. VitaeGraph separately routes create, deepen, maintain, validate, index, retrieve, and migrate operations so read-only graph work does not enter the full build workflow.

The source tree also contains `vitaecontext-wiki-maintenance` as a maintainer-only workflow for local source audits and wiki refreshes. It is not part of the installed user runtime bundle.

## 6. Install model

The stable contract is the shared skill folder name. Provider-specific command syntax is a convenience layer.

| Provider | Runtime shape |
| --- | --- |
| Claude Code | Skill folders under the Claude skills directory |
| Codex | Skill folders under `.agents/skills` and Codex skill paths |
| Gemini CLI | Extension with `GEMINI.md`, `gemini-extension.json`, skills, and namespaced commands |
| Antigravity CLI | Gemini-compatible plugin layout |
| OpenCode | Skill folders plus flat command wrappers |
| Shared | Portable skill-folder export |

Published-package installs default to user-level provider paths. Project-local installs remain available through `--project-root` or explicit `--target-dir` options.

## 7. Release and validation model

The npm package is the canonical registry artifact. GitHub releases mirror npm versions.

Before release:

1. Set the new version in `package.json`, then keep the six version-bearing files in sync: `package.json`, `.claude-plugin/plugin.json`, the plugin entry in `.claude-plugin/marketplace.json`, the root `gemini-extension.json`, and the two provider `gemini-extension.json` files (the Gemini manifests are refreshed by regenerating the mirror through the export CLI). `vitaecontext doctor` fails on any drift.
2. Update `CHANGELOG.md` and `.assets/docs/current-status.md`.
3. Run `npm test` and `npm run validate`.
4. Run provider export or install smoke tests.
5. Run `npm pack --dry-run`.
6. Push an annotated `vX.Y.Z` tag.

The publish workflow validates the package, checks tag/version alignment, publishes to npm with provenance, and creates the matching GitHub release.

## 8. Defined decisions

- Edit canonical runtime behavior in `.skills/agent-skill/` first.
- Keep provider folders thin and generated where possible.
- Keep human-readable playbooks in `hub/`.
- Keep durable, conditional-load runtime knowledge in skill-local `wiki/` folders.
- Keep `llms.txt` concise and `llms-full.txt` synchronized with wiki sources.
- Do not commit Career Context files, user career exports, screenshots, or generated install output.
- Treat `llms.txt` as an emerging AI-readability convention, not as a search ranking guarantee.

## 9. Later work

- Confirm Antigravity command syntax in a live `agy` environment.
- Track Gemini gallery listing behavior after release crawler updates.
- Finalize and upload a dedicated GitHub social preview for the source repo.
- Add selective demos or before/after examples when they improve public communication.
- The `vitaecontext update --provider <provider>` flow lets installed agents surface an explicit provider-version check without adding background network behavior.
- Consider more automation around the existing maintainer-only wiki refresh workflow.

---

See also: [getting-started.md](./getting-started.md), [end-to-end-workflows.md](./end-to-end-workflows.md), [architecture-map.md](./architecture-map.md), [STYLEGUIDE.md](./STYLEGUIDE.md), [current-status.md](./current-status.md), and [MAINTAINING.md](../../MAINTAINING.md).
