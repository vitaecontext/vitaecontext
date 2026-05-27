# STYLEGUIDE.md

> **Scope:** This file defines the authoring standards for Markdown files in this repository.
> It is a binding reference for human contributors and a mandatory first-read for any AI agent working on this codebase.

---

## 1. Purpose & Audience

This repository serves two distinct readers simultaneously:

- **Humans** — contributors who write and review content, and end-users who read the Knowledge Hub to improve their digital presence.
- **AI Agents** — Claude, Gemini, Codex, or any other coding/writing agent that ingests this repo as context to perform optimization tasks.

Every authoring decision in this guide is made with both audiences in mind. When the two needs conflict, **human readability takes priority**, because a human-readable file is almost always also a well-structured file for an LLM.

---

## 2. Language & Tone

### 2.1 Language
- All files are written in **English**. No exceptions.
- Use **plain, conversational English**. Write as if explaining to a smart colleague who is not an expert in the topic yet.
- Avoid jargon unless it is the exact term a hiring manager or search algorithm would use (in that case, define it on first use).
- Prefer **short sentences** (under 25 words). If a sentence needs a second comma, split it.
- Prefer **active voice**: "The agent reads this file" not "This file is read by the agent."

### 2.2 Tone
- Neutral and professional. Not corporate, not casual.
- Direct. No filler phrases like "It is important to note that..." — just state the fact.
- Never use the second person ("you") in rule definitions. Prefer imperative mood: "Write the summary in one paragraph" not "You should write the summary in one paragraph."

### 2.3 Prohibited Patterns
- No motivational language ("Amazing!", "Supercharge your career!").
- No hedging stacks ("might possibly tend to").
- No passive-aggressive notes ("obviously", "simply", "just").

---

## 3. Emoji Policy

Emoji are almost always **prohibited**.

The only permitted use is a single emoji placed at the start of a `> blockquote` that marks a **critical warning or a non-obvious gotcha** — something that would cause real damage if missed.

```markdown
<!-- ALLOWED -->
> ⚠️ ATS parsers strip columns. Never use a two-column layout in a CV template.

<!-- NOT ALLOWED -->
- 🚀 Optimize your LinkedIn headline
- ✅ Make sure to add keywords
- 💡 Pro tip: use numbers in your bullet points
```

If you feel the urge to use an emoji to make a list item stand out, use **bold text** or restructure the content so the important point has its own heading.

---

## 4. File Architecture (The Universal Template)

Editorial Knowledge Hub files follow this exact structure. The sections must appear in this order. Optional sections may be omitted, but their position in the order must not shift.

```
[Hidden metadata comment]   ← always required for editorial Knowledge Hub files
# Title                     ← always required, H1, one per file
> Summary blockquote        ← always required, 1-2 sentences max
---
## 1. Overview              ← always required
## 2. Rules                 ← always required (rename to fit context)
## 3. Examples              ← optional but strongly recommended
## 4. Anti-Patterns         ← optional
## 5. Sources               ← optional, required if claims need citation
---
[Footer note]               ← optional, for cross-links only
```

### 4.1 Hidden metadata

Every editorial Knowledge Hub file begins with an HTML comment containing YAML-like metadata. This keeps GitHub and VS Code Markdown previews focused on the visible document while preserving machine-readable routing metadata for agents and maintainers.

All fields below are required unless marked optional.

```markdown
<!--
metadata:
  title: "Human-readable title of this file"
  platform: linkedin | github | portfolio | cv-ats | general
  objective: "One sentence: what this file teaches or enforces."
  status: draft | review | stable
  last_updated: YYYY-MM-DD
  tags: [keyword1, keyword2]        # optional, max 5 tags
  agent_priority: high | medium | low   # how critical this file is for agent context
-->
```

**Field definitions:**

| Field | Description |
|---|---|
| `title` | Matches the H1 heading exactly. |
| `platform` | Which section of the Knowledge Hub this belongs to. |
| `objective` | One sentence. The agent uses this to decide if it needs to read the full file. |
| `status` | `draft` = do not rely on; `review` = open for feedback; `stable` = authoritative. |
| `last_updated` | ISO date. Update on every meaningful edit. |
| `agent_priority` | `high` = agent must read before acting; `medium` = read if relevant; `low` = reference only. |

### 4.2 Title (H1)

One H1 per file. It must be identical to the `title` field in the metadata comment. Do not use title case for heading levels H2 and below — use sentence case.

```markdown
<!-- CORRECT -->
# GitHub profile README optimization

## Core rules
### Length and structure

<!-- WRONG -->
# Github Profile Readme Optimization

## Core Rules
### Length And Structure
```

### 4.3 Summary Blockquote

Immediately after the H1, write one blockquote of 1–2 sentences. This is the file's TL;DR. An agent scanning the repo reads this before deciding whether to load the full file.

```markdown
# CV and ATS optimization

> This file defines the rules for writing CVs that pass Applicant Tracking Systems
> used by companies like Apple, Anthropic, and Google, based on formats that have
> passed real screening rounds.
```

### 4.4 Section Headings

Use numbered H2 sections (`## 1. Overview`, `## 2. Rules`, etc.). Numbering makes cross-references unambiguous for both humans and agents.

Rename the section labels to fit the file's content, but keep the numbering:

| Default label | When to rename it |
|---|---|
| `## 2. Rules` | Rename to `## 2. Best practices` for advisory content, `## 2. Constraints` for hard technical limits. |
| `## 3. Examples` | Rename to `## 3. Templates` if the content is a reusable block. |

### 4.5 Horizontal Rules

Use `---` only in two places:
1. After the summary blockquote, before the first H2 section.
2. As a footer separator, before any cross-link notes at the end of the file.

Do not use `---` as a visual decoration between sections. Use headings instead.

### 4.6 File classes and schema boundaries

This repository contains several Markdown file classes. They do not all use the same schema.

| File class | Examples | Required schema |
|---|---|---|
| Editorial Knowledge Hub docs | `hub/linkedin/*.md`, `hub/github/*.md`, `hub/cv-ats/*.md`, `hub/web-portfolio/*.md`, `hub/x-twitter/*.md`, `hub/agent-context-optimization/*.md` | Full Universal Template from section 4 with hidden metadata comments |
| Runtime skill entrypoints | `.skills/agent-skill/*/SKILL.md` | Agent Skills frontmatter with `name` and `description`, followed by concise procedural instructions |
| Runtime skill references | `.skills/agent-skill/*/references/*.md` | Lean Markdown optimized for agent loading; H1 plus focused procedural sections |
| Runtime skill wiki entries | `.skills/agent-skill/*/wiki/*.md` | LLM wiki metadata block, one H1 matching `title`, confidence labels, review dates, source status, and conditional-load friendly sections |
| Provider adapter notes | `.skills/providers/*/install.md` | Lean Markdown describing install targets and provider-specific behavior |
| Public repository README | `README.md` | GitHub-facing project overview; exempt from frontmatter and the Universal Template |
| Local planning and status docs | `.assets/docs/*.md` | Practical maintainer notes; frontmatter optional |
| Templates and examples | `templates/*.md`, `examples/*.md` | May intentionally contain multiple headings or placeholder structure needed by the artifact |

Do not force runtime skill references into the editorial schema. Their purpose is to minimize context cost and provide procedural guidance at runtime. Do not put long-lived skill methodology in provider adapter notes.

---

## 5. Formatting Rules

### 5.1 Lists

Use bullet lists for unordered items. Use numbered lists only when **sequence matters** (steps, ranked priorities). Do not nest lists more than two levels deep.

Every list item must be a complete thought. Do not start a list item with a lowercase continuation of the previous sentence.

```markdown
<!-- CORRECT -->
Write the headline in the first person:
- Include the target job title.
- Add one concrete skill or credential.
- Keep it under 120 characters.

<!-- WRONG -->
The headline should be written in the first person and
- include the target job title,
- add one concrete skill,
- keep it short.
```

### 5.2 Bold and Italic

- **Bold** (`**text**`): Use only for terms being defined for the first time, or for the subject of a rule statement.
- *Italic* (`*text*`): Use only for titles of external documents, tools, or platforms (e.g., *LinkedIn*, *Obsidian*).
- Do not bold entire sentences for emphasis. Restructure instead.

### 5.3 Code Blocks

Use fenced code blocks (`
```
`) for:
- Any text that should be copy-pasted verbatim (prompts, templates, config snippets).
- Any example output that a tool or agent would produce.
- Bad examples marked with `<!-- WRONG -->` alongside good examples marked with `<!-- CORRECT -->`.

Always declare the language after the opening fence, even for plain text: `
```text
`.

### 5.4 Tables

Use tables only when comparing two or more items across the same set of attributes. Do not use tables as a substitute for a well-structured list.

Every table must have a header row. Column headers use sentence case. Tables must have a prose sentence introducing them.

### 5.5 Links

Use inline links `[anchor text](url)` for external URLs. Use relative links such as `[README](../../README.md)` for internal cross-references from this file.

Do not use bare URLs in prose. Bare URLs are allowed only inside code blocks or metadata examples.

### 5.6 Line Wrapping

Do not hard-wrap normal prose, list items, or metadata descriptions at an arbitrary column. Keep each sentence, bullet, or field value on one source line unless a real Markdown structure requires a line break.

Allowed exceptions:

- fenced code blocks, templates, and verbatim examples
- Markdown tables
- blockquotes where each line is intentionally quoted
- nested list items or continuation paragraphs where the indentation is semantic

---

## 6. Content Rules

### 6.1 The Overview Section

The `## 1. Overview` section answers three questions in plain prose (no lists):
1. What is this file about?
2. Who or what is the primary audience (a human editing their CV, an agent rewriting a README)?
3. What outcome does following this file produce?

Keep it to 3–5 sentences. It is not an introduction to the topic in general — it is a description of this specific file's scope.

### 6.2 Rules vs. Recommendations

Distinguish clearly between hard rules and recommendations. Use these exact labels:

- **Rule:** A constraint that must not be violated. Prefix with `Rule:` in bold.
- **Recommendation:** A best practice that should be followed unless there is a documented reason not to. Prefix with `Recommendation:` in bold.

```markdown
**Rule:** Do not use a two-column layout in any CV template.

**Recommendation:** Keep the summary section under 80 words for roles in fast-paced environments.
```

### 6.3 Examples

Good examples are the most valuable part of any file. Each example block must include:
1. A label in plain text before the code block: "Good example:" or "Bad example:".
2. A comment inside the code block explaining *why* it is good or bad.
3. A real-world context (target platform, job level, industry) where applicable.

Do not include more than three examples per section. If you need more, split the file.

### 6.4 Anti-Patterns

The `## 4. Anti-Patterns` section lists things that look correct but are wrong. Each entry follows this format:

```markdown
### Anti-pattern name

**What it looks like:** A short description or quoted example.
**Why it fails:** One or two sentences of explanation.
**What to do instead:** A direct replacement or corrected approach.
```

### 6.5 Sources

If a file makes a factual claim about how an algorithm, ATS, or platform works, it must cite a source in the `## 5. Sources` section. Format:

```markdown
- [Source title](url) — one-sentence description of what this source confirms.
```

Do not cite sources inline. All citations go in the Sources section.

---

## 7. Agent-Specific Instructions

This section is written directly for AI agents ingesting this repository as context.

### 7.1 How to read this repository

Before performing any task:

1. Read `.assets/docs/STYLEGUIDE.md` (this file) in full.
2. Read the `objective` field of every file in the relevant subdirectory before loading full file content. Use `agent_priority: high` files as mandatory context.

### 7.2 Output format

When generating or editing a `.md` file in this repository:

- Match the Universal Template in section 4 exactly for editorial Knowledge Hub files.
- Populate the hidden metadata comment completely for editorial Knowledge Hub files. Set `status: draft` unless explicitly told otherwise.
- For `.skills/agent-skill/*/SKILL.md`, use Agent Skills frontmatter with `name` and `description`.
- For `.skills/agent-skill/*/references/*.md`, keep files lean, procedural, and self-contained.
- Use `last_updated` set to the current date.
- Do not add sections that do not exist in the relevant file-class template.
- Do not remove existing sections from a file you are editing.

### 7.3 Constraints

- **Do not modify** any file with `status: stable` unless the user explicitly authorizes it.
- **Do not infer** platform-specific rules. If a rule is not in the relevant subdirectory file, ask before applying it.
- **Do not generate** content that cannot be verified against a source when working in the `hub/cv-ats/` directory or any `hub/<module>/sources.md` file.
- When in doubt about scope, output a diff or a proposed change summary instead of writing directly.

### 7.4 Dry-run output

When asked to optimize a user's asset (CV, README, LinkedIn section), default to a **dry-run format** unless told otherwise. A dry-run output contains:

```text
FILE: path/to/asset.md
ACTION: [replace | add | remove]
BEFORE: (original content block)
AFTER: (proposed content block)
REASON: (which rule from which file justifies this change)
```

Do not apply changes directly to user files without explicit confirmation.

### 7.5 Portfolio code-edit safety

When asked to modify a user's portfolio code, default to a dry-run or review plan unless the user explicitly asks for direct edits. If direct edits are authorized:

1. Identify the target files and intended SEO or accessibility outcome.
2. Preserve existing visual design and application logic unless the user asks for a redesign.
3. Prefer metadata, structured data, crawlability, semantic HTML, and content improvements before layout changes.
4. Run the available build, lint, test, or preview command after edits when the project provides one.
5. Report any command that could not be run and the remaining risk.

For HTML, CSS, JavaScript, TypeScript, or framework templates, include this change summary:

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

---

## 8. File Naming Conventions

| Directory | Naming pattern | Example |
|---|---|---|
| `/hub/linkedin/` | `[section-name].md` | `headline.md`, `about.md` |
| `/hub/github/` | `[asset-type].md` | `profile-readme.md`, `repo-readme.md` |
| `/hub/web-portfolio/` | `[concern].md` | `metadata-and-snippets.md`, `performance-and-mobile.md` |
| `/hub/cv-ats/` | `[topic].md` | `keyword-strategy.md`, `formatting-rules.md` |
| `/hub/<module>/sources.md` | `sources.md` | `sources.md` |

All filenames are lowercase, hyphen-separated. No spaces, no underscores, no camelCase.

---

## 9. Contribution Workflow

This guide is binding for both contributors.

Before opening a pull request or committing a file:

1. Verify the hidden metadata comment is complete and valid for editorial Knowledge Hub files, and verify Agent Skills frontmatter is complete for runtime `SKILL.md` files.
2. Verify the file follows the Universal Template (section 4) in the correct order.
3. Run a self-check against the prohibited patterns in section 2.3.
4. If the file makes factual claims, verify at least one source is listed.
5. Set `status: review` on new files. Only move to `stable` after the second contributor has approved.

If you are unsure whether a rule applies to your file, default to following it. Consistency matters more than edge-case flexibility.

---

See also: [architecture-map.md](./architecture-map.md), [current-status.md](./current-status.md), [project.md](./project.md), and [MAINTAINING.md](../../MAINTAINING.md).
