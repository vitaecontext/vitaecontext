# STYLEGUIDE.md

> **Scope:** Authoring standards for Markdown files in this repository. This is binding for human contributors and AI agents.

---

## 1. Purpose and audience

This repository serves two readers:

- **Humans:** contributors, maintainers, reviewers, and end-users reading the Knowledge Hub.
- **AI agents:** Claude, Gemini, Codex, OpenCode, and other agents that load repo files as task context.

Write for both. When the needs conflict, prefer human readability because clear human prose is usually better agent context too.

## 2. Language and tone

- Write all files in English.
- Use plain, conversational English for a smart non-specialist reader.
- Avoid jargon unless it is the exact term a recruiter, search system, parser, or platform uses. Define it on first use.
- Prefer short active sentences.
- Use neutral, professional, direct prose.
- Do not use motivational language, hedging stacks, passive-aggressive notes, or filler.
- Do not use second person in rule definitions. Prefer imperative mood.

Examples:

- Good: `Write the summary in one paragraph.`
- Avoid: `You should write the summary in one paragraph.`
- Avoid: `It is important to note that...`

## 3. Emoji policy

Emoji are almost always prohibited.

The only allowed use is one emoji at the start of a blockquote for a critical warning or non-obvious gotcha that could cause real damage if missed.

```markdown
<!-- ALLOWED -->
> ⚠️ ATS parsers strip columns. Never use a two-column layout in a CV template.

<!-- NOT ALLOWED -->
- 🚀 Optimize your LinkedIn headline
- ✅ Make sure to add keywords
- 💡 Pro tip: use numbers in your bullet points
```

Use headings, structure, or bold terms instead of decorative emoji.

## 4. File classes

Different Markdown file classes use different schemas. Do not force one schema onto every file.

| File class | Examples | Required shape |
| --- | --- | --- |
| Editorial Knowledge Hub docs | `hub/<module>/*.md` | Hidden metadata, one H1, summary blockquote, numbered H2 sections, optional footer links |
| Runtime skill entrypoints | `.skills/agent-skill/*/SKILL.md` | Agent Skills frontmatter with `name` and `description`, then concise procedures |
| Runtime references | `.skills/agent-skill/*/references/*.md` | Lean Markdown with one H1 and focused procedural sections |
| Runtime wiki entries | `.skills/agent-skill/*/wiki/*.md` | LLM wiki metadata, one H1 matching `title`, confidence labels, review dates, source status, conditional-load sections |
| Provider adapter notes | `.skills/providers/*/install.md` | Lean install-target and provider-behavior notes |
| Public README | `README.md` | GitHub-facing overview, exempt from frontmatter and the hub template |
| Maintainer docs | `.assets/docs/*.md` | Practical maintainer notes, frontmatter optional |
| Templates and examples | `templates/*.md`, `examples/*.md`, module template folders | May contain placeholder structure needed by the artifact |

Runtime methodology belongs in `.skills/agent-skill/`. Human-readable methodology belongs in `hub/`. Provider notes stay thin and adapter-specific.

## 5. Editorial Knowledge Hub template

Editorial hub files use this order:

```text
<!-- hidden metadata comment -->
# Title
> Summary blockquote, 1-2 sentences.
---
## 1. Overview
## 2. Rules
## 3. Examples
## 4. Anti-Patterns
## 5. Sources
---
Footer cross-links
```

Optional sections may be omitted, but the order must not shift.

Required metadata:

```markdown
<!--
metadata:
  title: "Human-readable title of this file"
  platform: linkedin | github | portfolio | cv-ats | general
  objective: "One sentence describing what this file teaches or enforces."
  status: draft | review | stable
  last_updated: YYYY-MM-DD
  tags: [keyword1, keyword2]
  agent_priority: high | medium | low
-->
```

Metadata rules:

- `title` must match the H1 exactly.
- `platform` identifies the hub surface.
- `objective` helps agents decide whether to load the file.
- `status` means `draft` = do not rely on, `review` = open for feedback, `stable` = authoritative.
- `last_updated` uses ISO date format and changes on meaningful edits.
- `tags` are optional and should stay under five.
- `agent_priority` means `high` = mandatory when relevant, `medium` = read if relevant, `low` = reference only.

## 6. Headings and separators

- Use one H1 per file.
- Match the H1 to metadata `title` for editorial hub files and runtime wiki files.
- Use sentence case for headings below H1.
- Use numbered H2 sections in editorial hub files.
- Rename numbered section labels when useful, but keep the numbering.
- Use `---` only after the summary blockquote and before footer cross-links.
- Do not use horizontal rules as decoration.

Examples:

```markdown
<!-- CORRECT -->
# GitHub profile README optimization

## 1. Overview
## 2. Core rules

<!-- WRONG -->
# Github Profile Readme Optimization

## Core Rules
```

## 7. Markdown formatting

- Use bullets for unordered items.
- Use numbered lists only when sequence matters.
- Do not nest lists more than two levels deep.
- Each list item must be a complete thought.
- Do not start a list item as a lowercase continuation of the previous sentence.
- Use **bold** only for terms being defined or the subject of a rule statement.
- Use *italic* only for external document, tool, or platform names.
- Do not bold whole sentences for emphasis.
- Use fenced code blocks for copy-paste text, prompts, templates, config snippets, tool output, and good/bad examples.
- Always declare a code-block language, including `text`.
- Use tables only to compare items across the same attributes.
- Introduce every table with a prose sentence.
- Use inline links for external URLs and relative links for internal files.
- Do not use bare URLs in prose. Bare URLs are allowed only in code blocks or metadata examples.
- Do not hard-wrap prose, bullets, or metadata at arbitrary columns.

Allowed hard-wrap exceptions:

- fenced code blocks, templates, and verbatim examples
- Markdown tables
- blockquotes where each line is intentionally quoted
- semantically indented continuation lines

## 8. Content rules

The `## 1. Overview` section answers three questions in 3-5 plain sentences:

1. What is this file about?
2. Who or what is the primary audience?
3. What outcome does following it produce?

Label hard constraints and softer guidance explicitly:

```markdown
**Rule:** Do not use a two-column layout in any CV template.

**Recommendation:** Keep the summary section under 80 words for fast-paced roles.
```

Example blocks must include:

- A label before the block: `Good example:` or `Bad example:`.
- A comment inside the block explaining why it is good or bad.
- A real-world context when relevant.

Limit examples to three per section. Split the file when more are needed.

Anti-pattern entries use this shape:

```markdown
### Anti-pattern name

**What it looks like:** A short description or quoted example.
**Why it fails:** One or two sentences.
**What to do instead:** A direct replacement or corrected approach.
```

If a file makes factual claims about an algorithm, ATS, provider, or platform behavior, cite a source in `## 5. Sources`:

```markdown
- [Source title](url) — one-sentence description of what this source confirms.
```

Do not cite sources inline in editorial hub files.

## 9. Agent instructions

Before editing:

1. Read this file.
2. Read `.assets/docs/architecture-map.md`.
3. Read `.skills/architecture.md` before changing runtime skills, providers, export behavior, or install behavior.
4. Read only relevant platform files.
5. Use `agent_priority: high` files as mandatory context for the relevant module.

When generating or editing Markdown:

- Match the correct file-class schema.
- Set complete hidden metadata for editorial hub files.
- Set `status: draft` for new editorial files unless told otherwise.
- Use Agent Skills frontmatter for runtime `SKILL.md` files. The `description` must state both what the skill does and when to use it: write one or two sentences of capability, then a "Use when ..." clause listing concrete triggers. Keep it within 1024 characters and push detail into `references/`. Also set a `license` field and a `metadata` block (homepage, repository) so provenance travels with the installed skill. `vitaecontext doctor` enforces the presence, length, "when" clause, and `license`.
- Keep runtime references lean, procedural, and self-contained.
- Use the current date for `last_updated`.
- Do not add sections outside the relevant template.
- Do not remove existing sections from a file being edited unless the user asked for a refactor.

Constraints:

- Do not modify files with `status: stable` unless the user explicitly authorizes it.
- Do not infer platform-specific rules. If a rule is absent from the relevant docs, ask or label the claim.
- Do not generate unverifiable content for `hub/cv-ats/` or any `hub/<module>/sources.md`.
- When scope is unclear, output a proposed diff or change summary instead of writing directly.

## 10. User-asset edits

When asked to optimize a user's asset, default to a dry run unless the user asks for direct edits:

```text
FILE: path/to/asset.md
ACTION: [replace | add | remove]
BEFORE: original content block
AFTER: proposed content block
REASON: rule or source that justifies this change
```

For portfolio code edits, default to a dry run or review plan unless direct edits are authorized. If direct edits are authorized:

1. Identify target files and intended SEO, AEO, accessibility, or metadata outcome.
2. Preserve existing visual design and application logic unless a redesign was requested.
3. Prefer metadata, structured data, crawlability, semantic HTML, and content improvements before layout changes.
4. Run available build, lint, test, or preview commands.
5. Report commands that could not be run and remaining risk.

Use this summary for code edits:

```text
FILES CHANGED:
- path/to/file

SEO/AEO PURPOSE:
- what the change improves

BEHAVIORAL RISK:
- expected risk level and why

VERIFICATION:
- commands run or manual checks performed
```

## 11. Naming conventions

All filenames are lowercase and hyphen-separated. Do not use spaces, underscores, or camelCase.

| Directory | Pattern | Example |
| --- | --- | --- |
| `hub/linkedin/` | `[section-name].md` | `headline-strategy.md` |
| `hub/github/` | `[asset-or-topic].md` | `profile-readme.md` |
| `hub/web-portfolio/` | `[concern].md` | `metadata-and-snippets.md` |
| `hub/cv-ats/` | `[topic].md` | `formatting-rules.md` |
| `hub/<module>/sources.md` | `sources.md` | `sources.md` |

## 12. Contribution checklist

Before opening a pull request or committing:

1. Verify editorial metadata or runtime frontmatter is complete.
2. Verify the file follows the correct file-class structure.
3. Check language against the prohibited patterns.
4. Verify factual claims have sources.
5. Set new editorial files to `status: review`; move to `stable` only after a second contributor approves.
6. Run the smallest relevant validation from `.assets/docs/architecture-map.md`.

---

See also: [architecture-map.md](./architecture-map.md), [current-status.md](./current-status.md), [project.md](./project.md), and [MAINTAINING.md](../../MAINTAINING.md).
