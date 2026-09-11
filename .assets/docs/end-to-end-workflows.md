# VitaeContext end-to-end demos

This file demonstrates what VitaeContext can do once an agent already has the skills installed and available. It assumes the user is working inside a provider agentic coding tool such as Claude Code, Codex, Gemini CLI, Antigravity, OpenCode, Cursor, Windsurf, Roo Code, IBM Bob, Grok, or another environment that can read files, inspect public URLs, process pasted text, and use screenshots when the provider supports image inputs.

These demos are not installation instructions. Use [getting-started.md](./getting-started.md) for setup and [architecture-map.md](./architecture-map.md) for maintainer validation.

## 1. Demo setup

The user starts with scattered career material:

```text
Inputs available:
- current CV as PDF, DOCX text, LaTeX, or Markdown
- LinkedIn profile export, pasted sections, or screenshots
- GitHub profile URL and selected repository URLs
- portfolio URL or local source folder
- X/Twitter profile URL, pinned post, recent posts, or screenshots
- target roles or job descriptions
- project notes, metrics, demos, talks, articles, and proof links
```

The agent should first route through the root skill or the root runtime wiki, then load only the module needed for the current task.

```text
Use VitaeContext to plan the workflow before editing anything.
Inspect the available inputs, choose the relevant skill, and tell me which files,
screenshots, URLs, or pasted sections you need for the first pass.
Do not invent missing facts.
```

Expected agent output:

```text
- selected VitaeContext module
- inputs already usable
- smallest missing input set
- proposed first-pass workflow
- risks or inaccessible surfaces
```

## 2. Demo: create the Career Context file

Goal: give scattered career material to an agent and use `vitaecontext-build` to turn it into one private source of truth before optimizing public surfaces.

Example inputs:

```text
- ~/career/current-cv.pdf
- pasted LinkedIn About and Experience sections
- https://github.com/<user>
- https://<user>.github.io
- screenshots of LinkedIn Featured and Skills sections
- target role: security-focused software engineer
- project notes with metrics and proof links
```

Prompt:

```text
Use vitaecontext-build.

Create my Career Context file from these inputs:
- CV: ~/career/current-cv.pdf
- LinkedIn sections: pasted below
- GitHub: https://github.com/<user>
- Portfolio: https://<user>.github.io
- Screenshots: LinkedIn Featured and Skills sections attached
- Target role: security-focused software engineer
- Project notes: pasted below

Write the result to ~/.vitaecontext/<name>-context.md if file editing is available.
Separate verified facts, supplied context, inferences, and missing evidence.
Also capture my goals and targeting: ideal role, current focus, what I want to
work on next, growth direction, target locations (or no restriction), interests,
evidence boundaries, positioning constraints, claims to avoid, and constraints.
Ask before turning uncertain claims into public copy.
```

Expected output:

```text
- Career Context file draft or saved file path
- source ledger for every major claim
- conflicts found across CV, LinkedIn, GitHub, and portfolio material
- goals and targeting captured as stated intent, kept separate from verified facts
- evidence boundaries and claims to avoid for any future direction
- missing evidence list
- reusable positioning summary
- next recommended step
```

## 3. Demo: build and maintain a VitaeGraph

Goal: create or deepen detailed private career records without loading every domain, publishing private content, or flattening education and project relationships.

Example inputs:

```text
- exact graph path: ~/.vitaecontext/vitaegraph
- current CV or Career Context file
- selected project notes and repository URLs
- degree, course, or thesis material
- corrections to existing records
```

Prompt:

```text
Use vitaecontext-vitaegraph.

Graph: ~/.vitaecontext/vitaegraph
Mode: deepen
Scope: projects and the related degree only

Inspect only the CV, notes, and repositories I provide. Preserve stable IDs,
do not rewrite unrelated domains, and treat visibility metadata as something
to filter rather than publication consent. Validate and index after canonical
Markdown changes. If the graph CLI is unavailable, report the manual checks
without claiming machine validation passed.
```

Expected output:

```text
- selected mode, depth, exact graph path, and mutation scope
- records created, corrected, moved, or deepened
- repository enrichment and access limitations
- relationship, root-summary, and index changes
- validation and indexing results
- unresolved conflicts and open questions
- smallest downstream handoff
```

For validation or retrieval only, change `Mode` to `validate` or `retrieve`. Those modes are read-only unless repair is explicitly requested. For deletion, duplicate merging, or many-record migration, expect a preview before application.

## 4. See also

- [Getting started](./getting-started.md)
- [Architecture map](./architecture-map.md)
- [Root runtime wiki](../../skills/vitaecontext/wiki/vitaecontext.md)
- [Context Builder hub](../../hub/context-builder/README.md)
