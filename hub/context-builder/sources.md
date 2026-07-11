<!--
metadata:
  title: "Context Builder sources"
  platform: "general"
  objective: "Centralized official and spec sources for Career Context files, persistent instructions, imports, and skill-style context loading."
  status: "review"
  last_updated: "2026-05-27"
  tags: ["aco", "sources", "agents", "context"]
  agent_priority: "low"
-->

# Context Builder sources

> This file lists official agent-tool documentation and published specs that support the Career Context file methodology. Project-specific section names and storage defaults are VitaeContext methodology unless an external source is listed.

---

## 1. Overview

The `context-builder` module adapts the same durable-context pattern used by coding agents for `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, custom instructions, and skills. Official provider docs support the general pattern; VitaeContext owns the career-specific schema.

## 2. Source table

| Source | URL | Type | Covers | Confidence |
|---|---|---|---|---|
| OpenAI Developers: Custom instructions with AGENTS.md | https://developers.openai.com/codex/guides/agents-md | official-docs | Codex `AGENTS.md` discovery, global and project scopes, override files, merge order, size limits, validation workflow | stable |
| Claude Code Docs: Memory | https://docs.anthropic.com/en/docs/claude-code/memory | official-docs | `CLAUDE.md` scope, startup loading, imports, local/private memory, path-scoped context, AGENTS.md interoperability | stable |
| Gemini CLI Docs: Provide Context with GEMINI.md Files | https://google-gemini.github.io/gemini-cli/docs/cli/gemini-md.html | official-docs | `GEMINI.md` hierarchy, global and project context, imports, `/memory` commands, configurable context filenames | stable |
| GitHub Docs: About customizing GitHub Copilot responses | https://docs.github.com/en/copilot/concepts/prompting/response-customization | official-docs | Repository custom instructions, scope, concise instruction guidance, repeated context inclusion | stable |
| GitHub Docs: Copilot customization cheat sheet | https://docs.github.com/en/copilot/reference/customization-cheat-sheet | official-docs | Custom instructions, prompt files, custom agents, and agent skills as separate context mechanisms | likely |
| AGENTS.md specification | https://agents.md/ | spec | Vendor-neutral `AGENTS.md` convention and repository instruction-file pattern | likely |
| CommonMark specification | https://spec.commonmark.org/ | spec | Markdown syntax baseline for portable plain-text context files | stable |

## 3. Claims without external platform sources

VitaeContext-specific names such as `Career Context file`, `QUICK REFERENCE`, `VERIFIED FACTS`, semantic tags, and the recommended `~/.vitaecontext/<name-surname>-career-context.md` path are project methodology. Treat them as repo-grounded, not external platform behavior.

No clean official external source was found for career-specific context-file schemas, cross-platform resume/profile factual ledgers, or guaranteed agent adherence to Career Context files. Treat adherence claims as `likely` or `inferred`.

---

See also: [Context Builder](./README.md) and [runtime knowledge](../../.skills/agent-skill/vitaecontext-build/wiki/knowledge.md).
