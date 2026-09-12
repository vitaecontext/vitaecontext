# Provider matrix

This matrix captures adapter assumptions as of August 17, 2026. Verify current provider docs before changing install behavior, command syntax, or marketplace guidance.

| Provider | Shared skill-bundle fit | Custom command fit | Best user-facing module trigger |
| --- | --- | --- | --- |
| Claude Code | Strong | Strong for plugins; local command directories do not create colon namespacing | Direct skill use or marketplace plugin |
| Codex | Strong through direct skills and the generated native plugin bundle | Do not assume slash wrappers are the primary interface | Explicit skill selection such as `$vitaecontext-build` |
| Gemini CLI | Strong | Strong, with documented namespaced commands from nested paths | `/vitaecontext:context` |
| Antigravity CLI | Strong | Unknown at launch; imports Gemini extensions as plugins, but command names need live confirmation | Native plugin or skill discovery first; Gemini-style `/vitaecontext:context` remains TBD |
| OpenCode | Strong | Strong, with documented flat commands from Markdown filenames | Native skill loading or `/vitaecontext-context` |
| Cursor | Strong | Native Agent Skills in `.cursor/skills/` or stateless MCP server | Direct skill invocation or MCP tool/resource |
| Windsurf | Strong | Native Cascade Skills in `.windsurf/skills/` or stateless MCP server | Direct skill invocation or MCP tool/resource |
| Roo Code | Strong | Native Skills in `.roo/skills/` or stateless MCP server | Direct skill invocation or MCP tool/resource |
| IBM Bob | Strong | Native Skills in `.ibm/skills/` or stateless MCP server | Direct skill invocation or MCP tool/resource |
| Grok | Strong | Native Skills in `.grok/skills/` or stateless MCP server | Direct skill invocation or MCP tool/resource |
| Shared | Strong | Portable manual reuse | Direct file or prompt loading |

## Policy

Do not force one command syntax across all providers. Keep the shared skill names stable and let adapters expose the cleanest native interface each provider actually supports.

## Packaging policy

The provider-facing artifact should be the self-contained shared skill bundle. Provider adapters may add wrapper commands, installer metadata, or export layout, but they should not become alternate knowledge bases.

## Current command wrapper status

| Provider | Shipped command wrappers | Notes |
| --- | --- | --- |
| Claude Code | No | Exact `/vitaecontext:module` syntax should wait for a Claude plugin package. |
| Codex | No | Use direct installed skills or the repository native plugin; both expose the same shared skill names. |
| Gemini CLI | Yes | Extension bundle installs namespaced wrappers under `commands/vitaecontext/`. |
| Antigravity CLI | Yes | Plugin bundle installs Gemini-compatible wrappers under `commands/vitaecontext/`, but imported command syntax is TBD until confirmed in `agy`. |
| OpenCode | Yes | Flat wrappers are copied to `.opencode/commands/` or `~/.config/opencode/commands/`. |
| Cursor | No | Uses native `.cursor/skills/` or the stateless MCP command (`vitaecontext mcp`). |
| Windsurf | No | Uses native `.windsurf/skills/` or the stateless MCP command (`vitaecontext mcp`). |
| Roo Code | No | Uses native `.roo/skills/` or the stateless MCP command (`vitaecontext mcp`). |
| IBM Bob | No | Uses native `.ibm/skills/` or the stateless MCP command (`vitaecontext mcp`). |
| Grok | No | Uses native `.grok/skills/` or the stateless MCP command (`vitaecontext mcp`). |
| Shared | No | Portable skill folders with `SKILL.md` for manual packaging or custom integration. |
