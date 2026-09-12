# VitaeContext getting started

This guide gives new users and new contributors the shortest safe path through the repository (current release line: vitaecontext 2.3.0). It explains which files to read first, which commands to run, and when to switch from human docs to runtime skill files.

## 1. Choose the right path

Use this table before opening deeper files.

| Goal | Start with | Then read |
| --- | --- | --- |
| Install VitaeContext into an agent tool | [README.md](../../README.md) | First install |
| Connect any agent workspace via MCP | [mcp/README.md](../../mcp/README.md) | [Client configuration examples](../../mcp/config-examples/) |
| See what a skill-ready agent can do | [end-to-end-workflows.md](./end-to-end-workflows.md) | The matching runtime skill |
| Build a Career Context file | [hub/context-builder/README.md](../../hub/context-builder/README.md) | [Context Builder skill](../../skills/vitaecontext-build/SKILL.md) |
| Build, maintain, validate, or retrieve a detailed private career graph | [vitaegraph/README.md](../../vitaegraph/README.md) | [VitaeGraph skill](../../skills/vitaecontext-vitaegraph/SKILL.md) |
| Understand the design thinking and concepts applied | [DESIGN.md](../../DESIGN.md) | [architecture-map.md](./architecture-map.md) |
| Understand the repo architecture | [architecture-map.md](./architecture-map.md) | [Project overview](../../README.md) |
| Understand the runtime knowledge graph | [root runtime wiki](../../skills/vitaecontext/wiki/vitaecontext.md) | [llms.txt](../../llms.txt) |
| Maintain or release the package | [MAINTAINING.md](../../MAINTAINING.md) | [current-status.md](./current-status.md) |

## 2. Repository layers

VitaeContext has two documentation branches plus the VitaeGraph and MCP product contracts.

Human layer:

```text
README.md
└── hub/<module>/README.md
    └── hub/<module>/sources.md
```

Runtime layer:

```text
skills/vitaecontext/wiki/vitaecontext.md
└── skills/vitaecontext-<module>/SKILL.md
    └── wiki/index.md
        └── wiki/knowledge.md
```

VitaeGraph product layer:

```text
vitaegraph/README.md
├── schema/
└── templates/
```

MCP server layer:

```text
mcp/README.md
├── config-examples/
└── schema/
```

The human layer explains playbooks, templates, examples, and source ledgers. The runtime layer is what installed agents use to decide which skill and wiki entries to load.

## 3. Fast CLI path

Run the smallest command that matches your immediate goal:

```bash
# 1. Check version
node bin/vitaecontext.mjs version

# 2. Check repo health
node bin/vitaecontext.mjs doctor

# 3. Initialize a private Career Context file
node bin/vitaecontext.mjs context init

# 4. Initialize a private VitaeGraph
node bin/vitaecontext.mjs graph init

# 5. Start the MCP server over stdio
node bin/vitaecontext-mcp.mjs
```

## 4. Suggested first prompts

### Prompt A: Bootstrap Career Context from an existing CV

```text
Help me initialize my private Career Context using VitaeContext.
Ask for the missing required sections one at a time and validate the output.
```

### Prompt B: Tailor CV for a specific role

```text
Load my Career Context and tailor a CV draft for a Senior Distributed Systems Engineer role.
Ground every claim in verified context. Flag missing evidence rather than inventing it.
```

## 5. How agents should navigate

For broad or unclear tasks, agents should read in this order:

1. [README.md](../../README.md) for the project surface.
2. [architecture-map.md](./architecture-map.md) for repository layers.
3. [root runtime wiki](../../skills/vitaecontext/wiki/vitaecontext.md) for graph navigation.
4. One relevant module `SKILL.md`.
5. That module's `wiki/index.md`.
6. That module's `wiki/knowledge.md` only when detailed constraints are needed.
7. The matching `hub/<module>/README.md` and `sources.md` when human playbook or source provenance is needed.

Do not load every module by default. Choose one branch unless the task is explicitly cross-platform.

## 6. Contributor path

For source changes, use this order:

1. Read [architecture-map.md](./architecture-map.md).
2. Read [STYLEGUIDE.md](./STYLEGUIDE.md) before Markdown edits.
3. Edit the canonical source first (`skills/`, `src/`, `providers/`, `mcp/`).
4. Update dependent docs, wiki entries, mirrors, package metadata, or release notes when behavior changes.
5. Run the smallest relevant validation from [architecture-map.md](./architecture-map.md).

## 7. See also

- [End-to-end demos](./end-to-end-workflows.md)
- [Architecture map](./architecture-map.md)
- [Current status](./current-status.md)
- [Project notes](./project.md)
- [Maintainer guide](../../MAINTAINING.md)
