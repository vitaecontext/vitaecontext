# Gemini CLI adapter

## Preferred install targets

Install VitaeContext as a Gemini CLI extension:

- global extension: `~/.gemini/extensions/vitaecontext/`
- local generated-layout preview: `<project>/.gemini/extensions/vitaecontext/`

The extension contains:

- `gemini-extension.json`
- `GEMINI.md`
- shared skills copied into `skills/<skill-name>/`
- commands copied into `commands/vitaecontext/<module>.toml`

OpenAI/Codex-only metadata from `agents/` is excluded from generated Gemini CLI installs.

Gemini CLI exposes the nested command files as namespaced commands:

- `/vitaecontext:context`
- `/vitaecontext:vitaegraph`
- `/vitaecontext:linkedin`
- `/vitaecontext:github`
- `/vitaecontext:cv`
- `/vitaecontext:portfolio`
- `/vitaecontext:x`

After installing or changing the extension, restart Gemini CLI. For loose custom command files, Gemini also supports `/commands reload`, but extension changes are picked up on restart.

## Install command

```bash
npx vitaecontext install --provider gemini-cli
```

From a local checkout:

```bash
node .skills/export/scripts/vitaecontext.mjs install \
  --provider gemini-cli
```

For a project-local generated-layout preview:

```bash
node .skills/export/scripts/vitaecontext.mjs install \
  --provider gemini-cli \
  --project-root .
```

Gemini CLI discovers active extensions from the user extension directory, so the global install is the one users should expect Gemini to load automatically.

## Source-first workflow

Gemini should still be authored from the shared `.skills/agent-skill/` source tree. Gemini adapter notes belong in `.skills/providers/gemini-cli/`. The export layer keeps the shared skill bundle canonical first, then packages the Gemini extension as an adapter step on top.

That means the installable source content should continue to come from:

- `.skills/agent-skill/`
- `.skills/providers/gemini-cli/install.md`

instead of duplicating long-lived packaging files at the repo root by hand.

If we later publish a provider-facing installer, the root should only expose the minimal distribution adapter needed for that channel, not a second copy of the shared skills.

## Why Gemini CLI is a strong fit for namespaced commands

Gemini CLI documents namespaced custom commands derived from nested command file paths. That makes `/vitaecontext:linkedin` a good fit for Gemini CLI command wrappers.

## Practical recommendation

1. Keep shared skill logic in `.skills/agent-skill/`.
2. Keep `GEMINI.md` concise and import only the shared skill entrypoints.
3. Keep command wrappers thin so reusable logic stays in the shared skills.

## Distribution note

Gemini is the best first candidate for GitHub-URL installation because its extension tooling already supports installing from a GitHub repository URL or a local path. If a provider-packaged artifact is built first, start here.
