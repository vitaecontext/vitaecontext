# AGENTS.md

## Scope

These instructions apply to the whole repository.

## Start here

1. Read `.assets/docs/architecture-map.md` to identify the correct layer before editing.
2. Read `.assets/docs/STYLEGUIDE.md` before changing Markdown, examples, templates, or skill references.
3. Read `.skills/architecture.md` before changing runtime skills, provider adapters, export behavior, or install behavior.
4. Load only the relevant platform skill and references for the task.

## Source of truth

- Keep runtime methodology in `.skills/agent-skill/`.
- Keep provider folders thin. Treat `.skills/providers/` as adapter-specific install notes, wrapper commands, and metadata.
- Keep the export and install implementation in `.skills/export/`.
- Keep public project positioning, install commands, and module summaries in `README.md`.
- Do not commit personal career context files, user career exports, screenshots, or unstaged generated install output.

## Editing rules

- Prefer narrow edits that follow the existing repository structure.
- Keep Markdown plain, factual, and source-aware.
- Separate documented platform behavior from inference.
- Do not invent SEO, ATS, GitHub, LinkedIn, X, or provider ranking guarantees.
- Update dependent docs when package behavior, provider behavior, or public workflows change.
- When writing or updating `wiki/` entries inside `.skills/agent-skill/`, keep them factual, compact, and runtime-oriented. Each wiki file must start with the AgentKit SEO wiki metadata block, use only the allowed confidence values, update `last_reviewed` when claims are meaningfully checked, and mark stale, disputed, or source-dependent claims instead of presenting them as stable facts.

## Validation

Run the smallest relevant check for the change:

```bash
npm run validate
node .skills/export/scripts/agentkit-seo.mjs version
node .skills/export/scripts/agentkit-seo.mjs export --provider all --output /tmp/agentkit-seo-export --force
npm pack --dry-run
```
