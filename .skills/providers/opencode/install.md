# OpenCode adapter

## Preferred install targets

OpenCode can discover skills from multiple compatible locations, including:

- `.opencode/skills/<skill-name>/SKILL.md`
- `~/.config/opencode/skills/<skill-name>/SKILL.md`
- `.claude/skills/<skill-name>/SKILL.md`
- `~/.claude/skills/<skill-name>/SKILL.md`
- `.agents/skills/<skill-name>/SKILL.md`
- `~/.agents/skills/<skill-name>/SKILL.md`

Copy the shared skill runtime files so the local `references/` directory remains available at runtime. OpenAI/Codex-only metadata from `agents/` is excluded from generated OpenCode installs.

OpenCode custom commands are Markdown files in:

- `.opencode/commands/<command-name>.md`
- `~/.config/opencode/commands/<command-name>.md`

## Source-first workflow

Keep `.skills/agent-skill/` as the only canonical source tree, then install an OpenCode-friendly layout when needed. The OpenCode adapter notes belong in `.skills/providers/opencode/`.

For the published package, the default command is:

```bash
npx vitaecontext install --provider opencode
```

This installs the shared skills into:

- `~/.config/opencode/skills/`

It also installs the VitaeContext command wrappers into:

- `~/.config/opencode/commands/`

From a local checkout, use:

```bash
node .skills/export/scripts/vitaecontext.mjs install \
  --provider opencode
```

For project-local installation, pass `--project-root`:

```bash
node .skills/export/scripts/vitaecontext.mjs install \
  --provider opencode \
  --project-root .
```

- `.opencode/skills/`
- `.opencode/commands/`

Use `export` only when you want a preview bundle or a packaging artifact.

## Invocation model

OpenCode has native skill discovery and also supports custom commands.

## Important constraint

The docs clearly describe flat custom command names from filenames, but they do not document the same clean colon namespace pattern for commands that Gemini CLI does. Because of that, the safest OpenCode command surface is flat:

- `/vitaecontext-context`
- `/vitaecontext-vitaegraph`
- `/vitaecontext-linkedin`
- `/vitaecontext-github`
- `/vitaecontext-cv`
- `/vitaecontext-portfolio`
- `/vitaecontext-x`

## Practical recommendation

Prioritize native skill loading first. Command wrappers are now included as thin entrypoints that ask OpenCode to load the matching shared skill. Keep wrappers flat and mapped to shared skill names without inventing undocumented namespacing behavior.
