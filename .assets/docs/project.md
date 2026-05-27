# AgentKit SEO project brief

AgentKit SEO is a two-surface system: a public human-readable website and an installable npm skill package for coding agents. It covers personal branding, SEO/AEO, ATS-safe CV workflows, agent-readable career context, and a bundled LLM wiki for durable platform knowledge.

## 1. Vision

AgentKit SEO lets a user install a focused skill bundle into their preferred coding agent, point it at career material, and receive grounded optimization work for LinkedIn, GitHub, CVs, portfolios, X/Twitter, and reusable professional context files.

The core workflow is context first. A private agent context file acts like a `CLAUDE.md` or `AGENTS.md` for a person's career: verified facts, constraints, target roles, links, achievements, and positioning live in one reusable Markdown source of truth outside this repository.

## 2. Public surfaces

| Surface | URL | Purpose |
| --- | --- | --- |
| Website | `https://agentkit-seo.github.io/` | Public human-readable hub, playbooks, provider pages, and project docs |
| npm package | `https://www.npmjs.com/package/agentkit-seo` | Installable CLI and provider-shaped skill bundles |
| Source repo | `https://github.com/agentkit-seo/agentkit-seo` | Canonical authoring, packaging, validation, and release source |

## 3. Repository architecture

The repository separates human docs, runtime skills, provider adapters, and export tooling.

```text
hub/
.assets/docs/
.skills/
  agent-skill/
    agentkit-seo/
    agentkit-seo-agent-context-optimization/
    agentkit-seo-cv-ats/
    agentkit-seo-github/
    agentkit-seo-linkedin/
    agentkit-seo-web-portfolio/
    agentkit-seo-x-twitter/
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

- `hub/agent-context-optimization/`
- `hub/cv-ats/`
- `hub/github/`
- `hub/linkedin/`
- `hub/web-portfolio/`
- `hub/x-twitter/`

The `.skills/agent-skill/` directory is the runtime source of truth. Each shared skill carries `SKILL.md`, local `references/`, local `wiki/`, and optional provider metadata.

Provider folders are adapters only. They contain install notes, wrapper commands, and provider metadata, not copied methodology.

## 4. Runtime graph

The intended read path is hierarchical:

```text
README.md
├── hub/<module>/README.md
│   └── hub/<module>/sources.md
└── .skills/agent-skill/agentkit-seo/wiki/agentkit-seo.md
    └── agentkit-seo-<module>/SKILL.md
        └── wiki/index.md
            └── wiki/knowledge.md
```

The root runtime wiki is the graph entrypoint for installed agents. Agents should read it before loading detailed module files when a task is broad, architectural, or package-related.

`llms.txt` is the concise LLM-facing map. `llms-full.txt` is the full bundled wiki context generated from the runtime wiki files.

## 5. Skill modules

The package ships these shared skills:

- `agentkit-seo`: orchestration, routing, package architecture, provider strategy
- `agentkit-seo-agent-context-optimization`: private professional source-of-truth files
- `agentkit-seo-cv-ats`: ATS-safe CV and resume work
- `agentkit-seo-github`: GitHub profile, repository, search, and agent-readiness work
- `agentkit-seo-linkedin`: LinkedIn profile, search, positioning, and activity work
- `agentkit-seo-web-portfolio`: portfolio SEO, metadata, structured data, AI retrieval, and crawlability
- `agentkit-seo-x-twitter`: X/Twitter profile, posting, Premium, and engagement guidance

This modular shape solves the context-window problem: a LinkedIn task should load the LinkedIn skill, not the whole system.

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

1. Update package and provider manifest versions.
2. Update `CHANGELOG.md` and `.assets/docs/current-status.md`.
3. Run `npm run validate`.
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
- Do not commit private agent context files, user career exports, screenshots, or generated install output.
- Treat `llms.txt` as an emerging AI-readability convention, not as a search ranking guarantee.

## 9. Later work

- Confirm Antigravity command syntax in a live `agy` environment.
- Track Gemini gallery listing behavior after release crawler updates.
- Add a dedicated GitHub social preview for the source repo.
- Add selective demos or before/after examples when they improve public communication.
- Consider online latest-version checks for installed agents.
- Build maintainer workflow automation for refreshing wiki entries from official sources.

---

See also: [architecture-map.md](./architecture-map.md), [STYLEGUIDE.md](./STYLEGUIDE.md), [current-status.md](./current-status.md), and [MAINTAINING.md](../../MAINTAINING.md).
