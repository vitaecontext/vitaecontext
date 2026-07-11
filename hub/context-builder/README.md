<!--
metadata:
  title: "Context Builder"
  platform: "general"
  objective: "Navigation index for the context-builder folder, including the specification, workflow, maintenance guide, and template."
  status: "draft"
  last_updated: "2026-05-11"
  tags: ["context-file", "index", "navigation"]
  agent_priority: "medium"
-->

# Context Builder

> This folder defines the standard for building and maintaining a Career Context file: the private source of truth that keeps career-focused AI work grounded in verified facts.
> Public web page: [Context Builder playbook](https://vitaecontext.github.io/playbooks/context-builder/).

---

## 1. Overview

The fastest way to get generic career output is to give an agent scattered context. A CV in one message, a LinkedIn profile in another, a GitHub URL later, and a few corrections after the first bad draft.

This module fixes that by turning professional history and future direction into one structured Markdown file. The file describes a person's academic and professional record, target roles, growth direction, evidence boundaries, and positioning constraints in a format that both humans and AI agents can navigate reliably.

The intended use is simple: keep one canonical context file up to date, load it into an agent session, and combine it with the platform-specific modules in this repository when generating CVs, LinkedIn text, portfolio copy, or interview prep.

```text
Before:
"Here is my CV. Also my GitHub is different now. Actually ignore that old project."

After:
"Use my Career Context file as the source of truth, then audit my LinkedIn profile."
```

## 2. Use this module when

- A user does not yet have a Career Context file.
- Existing career material is scattered across CVs, LinkedIn, GitHub, notes, and portfolio pages.
- An agent needs one verified source of truth before rewriting public career material.
- A user wants to move toward a new role, domain, seniority level, or research direction without overclaiming.
- A context file already exists but has become stale, too long, or inconsistent.

## 3. Fast path

1. Read [why-context-files.md](./why-context-files.md) to understand the purpose.
2. Use [templates/context-file-template.md](./templates/context-file-template.md) to create the first draft.
3. Review [examples/renato-mignone-context-file-example.md](./examples/renato-mignone-context-file-example.md) to see a filled file based on a real profile with minor redactions for public use.
4. Check the draft against [context-file-spec.md](./context-file-spec.md).
5. Use [agent-workflow.md](./agent-workflow.md) when loading the file into an agent session.
6. Return to [file-maintenance.md](./file-maintenance.md) whenever new facts need to be added.

## 4. Directory contents

- [context-file-spec.md](./context-file-spec.md): The authoritative specification for structure, section order, semantic tags, and validation.
- [why-context-files.md](./why-context-files.md): The motivation document explaining why a context file outperforms copy-pasted raw text or agent memory.
- [agent-workflow.md](./agent-workflow.md): The operational guide for loading the file into agent sessions and combining it with other modules.
- [file-maintenance.md](./file-maintenance.md): The maintenance lifecycle for updates, token growth, goals, verified facts, and version history.
- [templates/context-file-template.md](./templates/context-file-template.md): A guided template for building a new Career Context file.
- [examples/renato-mignone-context-file-example.md](./examples/renato-mignone-context-file-example.md): A filled example copied from a real context file and lightly redacted where exact identifiers or verification-only details would be too specific for the public repo.

## 5. Usage for agents

When an AI agent is asked to work with a Career Context file:

1. Load [context-file-spec.md](./context-file-spec.md) before editing or validating the file.
2. Load [agent-workflow.md](./agent-workflow.md) when the task is about prompting or module routing.
3. Load [file-maintenance.md](./file-maintenance.md) when new content must be integrated into an existing file.
4. Treat the Career Context file itself as the factual source of truth, not the surrounding explanatory docs.

---

Runtime skill: [.skills/agent-skill/vitaecontext-build/SKILL.md](../../.skills/agent-skill/vitaecontext-build/SKILL.md). Source notes: [sources.md](./sources.md).
