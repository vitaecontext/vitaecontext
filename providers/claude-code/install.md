# Claude Code adapter

## Preferred install target

Install the shared skills into:

- `.claude/skills/<skill-name>/SKILL.md` for project-local use
- `~/.claude/skills/<skill-name>/SKILL.md` for personal global use

Copy the self-contained shared skill runtime files, not only the root `SKILL.md`. The local `references/` directory is part of the runtime bundle. OpenAI/Codex-only metadata from `agents/` is excluded from generated Claude Code installs.

## Source-first workflow

Do not treat `.claude/skills/` as the canonical authoring surface in this repository. The source of truth lives in `skills/`, while Claude adapter notes live in `providers/claude-code/`.

If you want a Claude-ready layout installed globally from the published package, use:

```bash
npx vitaecontext install --provider claude-code
```

From a local checkout, use:

```bash
node bin/vitaecontext.mjs install \
  --provider claude-code
```

This installs the shared skills into:

- `~/.claude/skills/`

If you want a Claude-ready layout installed directly into a project, pass `--project-root`:

```bash
node bin/vitaecontext.mjs install \
  --provider claude-code \
  --project-root .
```

This installs the shared skills into:

- `.claude/skills/`

If you want a preview bundle instead of writing directly into the project, use the `export` command and send it to a staging directory such as `/tmp/`.

## What works well

- Claude Code supports `SKILL.md`-based skills directly.
- Claude can auto-select a matching skill from its description.
- Claude also supports direct skill invocation by name.

## Important constraint

The exact `/vitaecontext:context` syntax is not the normal project-skill path for Claude Code. Local project commands live in `.claude/commands/`, but subdirectories do not create namespaced command names. The clean `plugin-name:skill-name` namespace exists for plugin skills.

## Practical recommendation

Use the shared skills directly:

- `vitaecontext-build`
- `vitaecontext-vitaegraph`

The repository also ships a native Claude plugin marketplace under `.claude-plugin/`.
