# Codex adapter

## Preferred install target

Keep Codex compatibility centered on the shared `SKILL.md` folders and the `agents/openai.yaml` metadata already bundled in each shared skill.

In practice, the reusable source of truth is:

- `.skills/agent-skill/<skill-name>/SKILL.md`
- `.skills/agent-skill/<skill-name>/references/`
- `.skills/agent-skill/<skill-name>/agents/openai.yaml`

## Source-first workflow

Do not hand-maintain a second Codex skill tree. Author in `.skills/agent-skill/`, keep Codex adapter notes in `.skills/providers/codex/`, then install a Codex-facing layout when needed. The native plugin mirror under `.agents/plugins/plugins/vitaecontext/skills/` is generated with `npm run sync:codex-plugin`.

For the published package, the default command is:

```bash
npx vitaecontext install --provider codex
```

This installs the shared skills into:

- `~/.agents/skills/`
- `CODEX_HOME/skills` when `CODEX_HOME` is set, otherwise `~/.codex/skills/`

From a local checkout, use:

```bash
node .skills/export/scripts/vitaecontext.mjs install \
  --provider codex
```

For project-local installation, pass `--project-root`:

```bash
node .skills/export/scripts/vitaecontext.mjs install \
  --provider codex \
  --project-root .
```

- `.agents/skills/`
- `.codex/skills/`

Use `export` only when you want a preview bundle or a packaging artifact.

## Native plugin marketplace

The repository includes a Codex marketplace and plugin bundle in `.agents/plugins/`. From a local clone:

```bash
codex plugin marketplace add .agents/plugins
codex plugin add vitaecontext@vitaecontext
```

This is an additional distribution path, not a separate methodology source. Direct npm skill installation remains supported.

## Invocation model

Codex skills are better treated as explicit skills than as slash commands. Design the Codex experience around selecting or explicitly invoking the shared skill, for example:

- `$vitaecontext-linkedin`
- `$vitaecontext-github`
- `$vitaecontext-cv`
- `$vitaecontext-vitaegraph`

## Practical recommendation

Do not force a slash-command abstraction onto Codex. Keep the core workflow in the shared skills and let Codex use them through its native skill selection flow.
