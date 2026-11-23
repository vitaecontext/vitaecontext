# Pi adapter

## Preferred install target

Install the shared skills into:

- `.pi/skills/` for project-local use
- `~/.pi/agent/skills/` for personal global use
- Or configure the stateless MCP server (`npx -y vitaecontext mcp` or the installed `vitaecontext.mjs mcp`) in your Pi configuration.

Copy the self-contained shared skill runtime files, including `SKILL.md`, `references/`, and `wiki/`.

## Source-first workflow

The canonical source of truth lives in `skills/`, while Pi adapter definitions live in `providers/pi/`.

If you want a Pi-ready layout installed globally from the published package, use:

```bash
npx vitaecontext install --provider pi
```

From a local checkout, use:

```bash
node bin/vitaecontext.mjs install --provider pi
```

This installs the shared skills into:

- `~/.pi/agent/skills/`

If `PI_CODING_AGENT_DIR` is set, the skills directory resolves relative to that environment variable instead of `~/.pi/agent/`.

If you want a layout installed directly into a project workspace, pass `--project-root`:

```bash
node bin/vitaecontext.mjs install \
  --provider pi \
  --project-root .
```

This installs the skills into `.pi/skills/`.

For cross-compatibility with tools that scan `~/.agents/skills/`, the installer also mirrors the bundle there by default. Use `--target-dir` to override either destination.

## Skill invocation model

Pi discovers installed skills automatically via recursive walk of `SKILL.md` files. After installation, restart the agent so the new skills appear in the prompt context.

## MCP integration

To enable seamless, workspace-agnostic access to your Career Context and VitaeGraph in Pi:

1. Configure the stateless MCP server in Pi settings (typically `settings.json -> mcpServers`).
2. Name: `vitaecontext`
3. Command: `npx -y vitaecontext mcp` (or the installed `vitaecontext mcp` if globally available).

This gives every subagent and chain step access to `vitaegraph://record/<id>` resources and the `career_context` tool without re-installing skills.
