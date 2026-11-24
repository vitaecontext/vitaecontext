# Pi adapter

## Install targets

Install the canonical shared skills with:

```bash
npx vitaecontext install --provider pi
```

The default user destination is `~/.pi/agent/skills/`. If `PI_CODING_AGENT_DIR` is set, the installer uses its `skills/` subdirectory instead. No additional shared directory is written.

To install into a project, use:

```bash
npx vitaecontext install --provider pi --project-root .
```

This writes to `.pi/skills/`. Use `--target-dir` for an explicit alternative. From a local checkout, replace `npx vitaecontext` with `node bin/vitaecontext.mjs`. The installer copies the three shared skill folders and their support files.

## Skill invocation

Pi discovers standard Agent Skills. Start Pi in the intended environment, trust the project if appropriate, and invoke `/skill:vitaecontext`, `/skill:vitaecontext-build`, or `/skill:vitaecontext-vitaegraph`. Use `/reload` after installation in an active session.

## Optional MCP integration

Recent Pi releases with built-in MCP support can register the stateless server separately:

```bash
pi mcp add vitaecontext -- npx -y vitaecontext mcp
pi mcp list
```

Pi stores user-level MCP configuration in `~/.pi/agent/mcp.json` by default. For older releases or an MCP adapter extension, consult that version's documentation. Skill installation does not configure or start MCP. Verify the connection and exposed tools before supplying private career context. Subagent access depends on the client's configuration.

## Sources

- [Pi skills documentation](https://docs.pi.dev/latest/skills) describes discovery and invocation.
- [Pi MCP documentation](https://docs.pi.dev/latest/mcp) describes server registration and connection checks.
