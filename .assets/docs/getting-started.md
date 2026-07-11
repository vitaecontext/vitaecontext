# VitaeContext getting started

This guide gives new users and new contributors the shortest safe path through the repository. It explains which files to read first, which commands to run, and when to switch from human docs to runtime skill files.

## 1. Choose the right path

Use this table before opening deeper files.

| Goal | Start with | Then read |
| --- | --- | --- |
| Install VitaeContext into an agent tool | [README.md](../../README.md) | First install |
| See what a skill-ready agent can do | [end-to-end-workflows.md](./end-to-end-workflows.md) | The matching runtime skill |
| Build a Career Context file | [hub/context-builder/README.md](../../hub/context-builder/README.md) | [Context Builder skill](../../.skills/agent-skill/vitaecontext-build/SKILL.md) |
| Build, maintain, validate, or retrieve a detailed private career graph | [vitaegraph/README.md](../../vitaegraph/README.md) | [VitaeGraph skill](../../.skills/agent-skill/vitaecontext-vitaegraph/SKILL.md) |
| Optimize one public surface | The matching `hub/<module>/README.md` | The matching `.skills/agent-skill/vitaecontext-<module>/SKILL.md` |
| Understand the design thinking and concepts applied | [DESIGN.md](../../DESIGN.md) | [architecture-map.md](./architecture-map.md) |
| Understand the repo architecture | [architecture-map.md](./architecture-map.md) | [.skills/architecture.md](../../.skills/architecture.md) |
| Understand the runtime knowledge graph | [root runtime wiki](../../.skills/agent-skill/vitaecontext/wiki/vitaecontext.md) | [llms.txt](../../llms.txt) |
| Maintain or release the package | [MAINTAINING.md](../../MAINTAINING.md) | [current-status.md](./current-status.md) |

## 2. Repository layers

VitaeContext has two documentation branches plus the VitaeGraph product contract.

Human layer:

```text
README.md
└── hub/<module>/README.md
    └── hub/<module>/sources.md
```

Runtime layer:

```text
.skills/agent-skill/vitaecontext/wiki/vitaecontext.md
└── .skills/agent-skill/vitaecontext-<module>/SKILL.md
    └── wiki/index.md
        └── wiki/knowledge.md
```

VitaeGraph product layer:

```text
vitaegraph/README.md
├── schema/
└── templates/
```

The human layer explains playbooks, templates, examples, and source ledgers. The runtime layer is what installed agents use to decide which skill and wiki entries to load.

## 3. First install

Check the package version:

```bash
npx vitaecontext version
```

Expected output:

```text
vitaecontext 1.9.1
Portable agent skills for career context, VitaeGraph, LinkedIn, GitHub, CV/ATS, portfolio SEO, and X.
```

Install the skills for one provider:

```bash
npx vitaecontext install --provider codex
```

Expected shape:

```text
Installed 8 skill folder(s) for codex
- target: <codex skill directory>
- manifest: <codex skill directory>/vitaecontext-install.json
```

List supported providers when choosing a target:

```bash
npx vitaecontext list providers
```

Expected output:

```text
antigravity
claude-code
codex
gemini-cli
opencode
shared
```

Check whether a newer package is published before reinstalling:

```bash
npx vitaecontext update
```

This compares your local package version against the npm registry latest. To check a provider install instead, run `npx vitaecontext@latest update --provider codex` and preserve any custom `--project-root` or `--target-dir` flags. The check runs only when invoked and needs network access; there is no background or automatic check. To update, reinstall from the latest package.

Remove an install with the same provider and destination flags used to install it:

```bash
npx vitaecontext uninstall --provider codex
```

Uninstall reads the install manifest and removes only the VitaeContext skill folders, command wrappers, and manifest. Use `--dry-run` to preview removals before deleting anything.

## 4. First use

Create the Career Context file template outside the repository:

```bash
npx vitaecontext template context --output ~/.vitaecontext/my-context.md
```

Expected shape:

```text
Wrote context template to ~/.vitaecontext/my-context.md
```

Give trusted raw material to the agent and invoke the Context Builder skill to create the Career Context file:

```text
Use vitaecontext-build to create my Career Context file.
I can provide my CV, LinkedIn sections, GitHub URL, portfolio URL, project notes,
screenshots, or any other career material you need.
```

Then use one platform skill:

```text
Use vitaecontext-github to audit my GitHub profile for hiring visibility.
Use my Career Context file at ~/.vitaecontext/my-context.md.
```

For detailed multi-file records, initialize a separate private VitaeGraph and ask the skill to select the smallest lifecycle mode:

```bash
npx vitaecontext graph init
```

```text
Use vitaecontext-vitaegraph to deepen the project records in
~/.vitaecontext/vitaegraph from these explicit repositories and notes.
Do not modify unrelated domains. Validate and index after the update.
```

## 5. How agents should navigate

For broad or unclear tasks, agents should read in this order:

1. [README.md](../../README.md) for the project surface.
2. [architecture-map.md](./architecture-map.md) for repository layers.
3. [root runtime wiki](../../.skills/agent-skill/vitaecontext/wiki/vitaecontext.md) for graph navigation.
4. One relevant module `SKILL.md`.
5. That module's `wiki/index.md`.
6. That module's `wiki/knowledge.md` only when detailed constraints are needed.
7. The matching `hub/<module>/README.md` and `sources.md` when human playbook or source provenance is needed.

Do not load every module by default. Choose one branch unless the task is explicitly cross-platform.

## 6. Contributor path

For source changes, use this order:

1. Read [architecture-map.md](./architecture-map.md).
2. Read [STYLEGUIDE.md](./STYLEGUIDE.md) before Markdown edits.
3. Read [.skills/architecture.md](../../.skills/architecture.md) before runtime, provider, export, or install changes.
4. Edit the canonical source first.
5. Update dependent docs, wiki entries, mirrors, package metadata, or release notes when behavior changes.
6. Run the smallest relevant validation from [architecture-map.md](./architecture-map.md).

## 7. See also

- [End-to-end demos](./end-to-end-workflows.md)
- [Architecture map](./architecture-map.md)
- [Current status](./current-status.md)
- [Project notes](./project.md)
- [Maintainer guide](../../MAINTAINING.md)
