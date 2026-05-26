# Antigravity CLI adapter

## Preferred install targets

Install AgentKit SEO as an Antigravity CLI plugin:

- global plugin: `~/.gemini/antigravity-cli/plugins/agentkit-seo/`
- local generated-layout preview: `<project>/.gemini/antigravity-cli/plugins/agentkit-seo/`

The plugin uses the Gemini extension-compatible structure that Antigravity imports from Gemini CLI extensions:

- `plugin.json`
- `gemini-extension.json`
- `GEMINI.md`
- shared skills copied into `skills/<skill-name>/`
- commands copied into `commands/agentkit-seo/<module>.toml`

OpenAI/Codex-only metadata from `agents/` is excluded from generated Antigravity installs.

Antigravity CLI migration documentation and real user output indicate that imported Gemini CLI extensions are staged as plugins under `~/.gemini/antigravity-cli/plugins`. The exact in-session command surface for imported TOML commands is still settling. Treat Gemini-style commands such as `/agentkit-seo:linkedin` as the expected compatibility target, but verify in `agy` before documenting it as guaranteed.

## Install command

```bash
npx agentkit-seo install --provider antigravity
```

From a local checkout:

```bash
node .skills/export/scripts/agentkit-seo.mjs install \
  --provider antigravity
```

For a project-local generated-layout preview:

```bash
node .skills/export/scripts/agentkit-seo.mjs install \
  --provider antigravity \
  --project-root .
```

After installing or changing the plugin, restart Antigravity CLI. If commands do not appear, inspect `~/.gemini/antigravity-cli/cli.log` and compare the generated plugin layout with output from `agy plugin import gemini`.

## Migration path from Gemini CLI

Antigravity CLI provides a migration command for existing Gemini CLI extensions:

```bash
agy plugin import gemini
```

AgentKit SEO can also install directly to the Antigravity plugin staging path with `--provider antigravity`, which avoids requiring a separate Gemini CLI install first.

## Source-first workflow

Antigravity should still be authored from the shared `.skills/agent-skill/` source tree. Antigravity adapter notes belong in `.skills/providers/antigravity/`. The export layer keeps the shared skill bundle canonical first, then packages the Antigravity plugin as an adapter step on top.

That means the installable source content should continue to come from:

- `.skills/agent-skill/`
- `.skills/providers/antigravity/install.md`

instead of duplicating long-lived methodology in provider adapter files.

## Practical recommendation

1. Keep shared skill logic in `.skills/agent-skill/`.
2. Keep `GEMINI.md` concise and import only the shared skill entrypoints.
3. Keep command wrappers thin so reusable logic stays in the shared skills.
4. Recheck Antigravity CLI command syntax before marking slash-command invocation as stable.
