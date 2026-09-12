# Repository instructions for GitHub Copilot

Follow the repository map in `.assets/docs/architecture-map.md` before suggesting broad changes.

## Repository model

- `skills/` is the canonical portable Agent Skills source.
- `providers/` contains provider adapters only.
- `src/` and `bin/` contain the core engine, CLI, and stateless MCP server.
- `mcp/` contains Model Context Protocol documentation, configs, and schema contracts.
- Human-readable Knowledge Hub docs live under `hub/`, such as `hub/context-builder/`.
- `.assets/docs/STYLEGUIDE.md` defines Markdown conventions for docs, examples, templates, and references.

## Coding and documentation rules

- Keep edits scoped to the requested layer.
- Do not duplicate runtime methodology into provider adapter folders.
- Do not invent platform ranking behavior or unsupported SEO/ATS claims.
- Do not commit Career Context files or user career data.
- Use plain Markdown and concise instructions for agent-facing files.

## Validation

Prefer these checks when touching package behavior, provider output, or release surfaces:

```bash
npm run validate
node bin/vitaecontext.mjs version
node bin/vitaecontext.mjs export --provider all --output /tmp/vitaecontext-export --force
npm pack --dry-run
```
