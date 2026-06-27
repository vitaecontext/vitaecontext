# Repository instructions for GitHub Copilot

Follow the repository map in `.assets/docs/architecture-map.md` before suggesting broad changes.

## Repository model

- `.skills/agent-skill/` is the canonical portable skill source.
- `.skills/providers/` contains provider adapters only.
- `.skills/export/` contains the CLI used for export, install, doctor, version, and template commands.
- Human-readable Knowledge Hub docs live under `hub/`, such as `hub/github/`, `hub/linkedin/`, `hub/cv-ats/`, `hub/web-portfolio/`, and `hub/x-twitter/`.
- `.assets/docs/STYLEGUIDE.md` defines Markdown conventions for docs, examples, templates, and references.

## Coding and documentation rules

- Keep edits scoped to the requested layer.
- Do not duplicate runtime methodology into provider adapter folders.
- Do not invent platform ranking behavior or unsupported SEO/ATS claims.
- Do not commit personal career context files or user career data.
- Use plain Markdown and concise instructions for agent-facing files.

## Validation

Prefer these checks when touching package behavior, provider output, or release surfaces:

```bash
npm run validate
node .skills/export/scripts/agentkit-seo.mjs version
node .skills/export/scripts/agentkit-seo.mjs export --provider all --output /tmp/agentkit-seo-export --force
npm pack --dry-run
```
