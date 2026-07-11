<!--
metadata:
  title: "Agent workflow for context file users"
  platform: "general"
  objective: "Explains how to invoke the context file in an agent session, how to combine it with Skill submodules, and what good output looks like for each major task type."
  status: "draft"
  last_updated: "2026-04-28"
  tags: ["context-file", "workflow", "prompting", "agent", "skill"]
  agent_priority: "medium"
-->

# Agent workflow for context file users

> Practical instructions for using a Career Context file in an agent session, covering invocation patterns, Skill submodule routing, prompt templates, and output quality criteria for the four most common career tasks.

---

## 1. Overview

This file is for users who have already built a Career Context file following the rules in [context-file-spec.md](./context-file-spec.md). It explains how to load the file into an agent session, how to write effective task prompts, and how to combine the context file with platform-specific Skill submodules. The outcome of following this workflow is accurate, platform-ready career outputs that require minimal editing.

## 2. Invoking the context file

### 2.1 The basic invocation pattern

Every session that uses the context file follows the same three-step pattern.

**Step 1 — Load the context file.** Provide the file to the agent as context before stating your task. In most coding agents, this means opening the file in the same working directory and referencing it explicitly in your prompt, or passing it using the agent's file attachment mechanism. In chat-based agents, paste the full file content directly into the session.

**Step 2 — State the task with constraints.** Name the output type, the target platform or role, and any hard constraints (word count, format, target audience). The more specific the constraints, the less the agent needs to guess.

**Step 3 — Evaluate and iterate.** Use the quality criteria in section 5 of this file to assess the output. If a section is weak, ask the agent to revise it by naming the specific fact or section in the context file that should be drawn on more heavily.

### 2.2 File discovery convention

The safest way to use a context file is to pass the path explicitly in the prompt. This avoids accidental use of an old or unrelated profile.

**Rule:** Prefer an explicit path when invoking the skill, for example `Use the context file at ~/career/name-surname-career-context.md`.

**Recommendation:** If the user wants a portable default location, suggest `~/.vitaecontext/<name-surname>-career-context.md`. The generic fallback `~/.vitaecontext/context.md` is acceptable only when the user prefers a neutral filename. Agents may check a default path only after the user asks to use it or confirms that the path is correct.

**Rule:** Do not search the user's entire filesystem for a context file. If no explicit path or confirmed default exists, ask the user for the file path.

**Rule:** Do not assume file-writing permission. Before creating or overwriting the context file, ask the user to choose a storage mode: local workspace file, explicit path, portable default, or in-chat draft.

**Rule:** For large context files, prefer writing to a confirmed file path or producing targeted diffs. Use in-chat full drafts only when the user asks for them, and split long drafts by section.

### 2.3 What the agent can and cannot do without additional input

The agent can generate, reword, tailor, and format outputs using the facts in the context file. It can select the most relevant subset of your experience for a given role, apply platform-specific formatting rules from a Skill submodule, and produce outputs in the correct tone and length.

The agent cannot verify facts that are not in the file. If a skill is listed in the Skills index but has no supporting evidence in a course, project, or role section, the agent cannot justify it in a cover letter. The agent also cannot make positioning decisions that are not stated in the file. If the QUICK REFERENCE block lists two target roles, the agent will generate content appropriate to both unless you specify which one to prioritize in the task prompt. Finally, the agent cannot know about professional developments that occurred after the file was last updated. The context file is the agent's only source of truth for your career record.

## 3. Prompt templates for common tasks

Each template below shows the full structure of a task prompt. Fill in the bracketed placeholders. Load your context file into the session before submitting the prompt.

### 3.1 Cover letter

```text
Using my context file, write a cover letter for the following job description.

Job description:
[Paste the full job description here]

Constraints:
- Maximum length: [e.g., 400 words]
- Tone: professional, direct, first person
- Emphasize: [e.g., the eBPF kernel research and the post-quantum cryptography thesis]
- Do not mention: [e.g., unrelated coursework, internships outside the target domain]
- Target reader: [e.g., a hiring manager at a security research lab]

Base every claim strictly on verified facts in the context file.
Do not add skills, projects, or roles that are not in the file.
```

### 3.2 LinkedIn section rewrite

```text
Using my context file and the rules in the linkedin Skill submodule,
rewrite my LinkedIn [About | Headline | Experience entry for ROLE NAME].

Constraints:
- Target audience: [e.g., security research groups and senior engineering recruiters]
- Positioning: use the target_roles, growth_direction, evidence_boundaries, positioning_constraints, claims_to_avoid, and top_skills from the QUICK REFERENCE block and Goals and targeting section
- Length: follow the platform limits defined in the linkedin submodule
- Do not use the first person in the headline
- Include at least one quantified result

Reference the linkedin submodule formatting rules for section structure and keyword placement.
```

### 3.3 CV variant

```text
Using my context file and the rules in the cv-ats Skill submodule,
generate a one-page CV tailored for the following role:

Target role: [e.g., Cryptography Research Intern]
Target company type: [e.g., academic research lab, enterprise security vendor]

Selection rules:
- Include all entries tagged [THESIS], [ROLE], and [CERT] that are directly relevant
- Include the three most relevant [PROJECT] entries based on keyword overlap with the role
- Omit coursework that has no direct relevance to the target role
- Apply ATS formatting rules from the cv-ats submodule

Format: single column, no tables, machine-readable fonts only.
```

### 3.4 Interview preparation

```text
Using my context file, prepare five interview questions and model answers
for a [e.g., security analyst] role.

Requirements:
- Base every model answer strictly on facts from the context file
- Cite the specific project, grade, or result that supports each claim
- Use the STAR format (Situation, Task, Action, Result) for behavioral questions
- Keep each answer under 200 words

Do not invent results or technologies not present in the context file.
```

## 4. Combining the context file with Skill submodules

The Skill submodules in this repository contain platform-specific rules that the agent applies on top of the facts in your context file. Loading both together gives the agent both the content (from your context file) and the formatting and quality rules (from the submodule).

The table below shows the correct submodule to load for each common task.

| Task | Submodule to load |
|---|---|
| LinkedIn headline, About, or Experience | `linkedin` |
| GitHub profile README or repository README | `github` |
| CV or ATS optimization | `cv-ats` |
| Portfolio page copy | `web-portfolio` |
| X/Twitter profile, bio, pinned post, or posting plan | `x-twitter` |

**Rule:** Always load the context file first, then the submodule. If you load only the submodule, the agent has rules but no content. If you load only the context file, the agent has content but no platform-specific rules.

### 4.1 Example: ATS-optimized CV

To generate an ATS-optimized CV, load the context file and the `cv-ats` submodule together, then use the CV variant prompt template from section 3.3. The agent applies the keyword extraction rules, formatting constraints, and section ordering from the submodule to the content from your context file.

### 4.2 Example: LinkedIn About section

To rewrite the About section, load the context file and the `linkedin` submodule together, then use the LinkedIn section rewrite template from section 3.2. The agent applies character limits, keyword placement rules, and the platform's first-person conventions to the positioning data from your QUICK REFERENCE block and the body of your context file.

## 5. What good output looks like

Use the criteria below to evaluate each output type. If an output does not meet these criteria, ask the agent to revise it, citing the specific section of the context file that contains the missing detail.

### 5.1 Cover letter

A good cover letter output:
- Names at least one specific project or role from the context file in the first paragraph.
- Cites at least one quantified result (grade, ranking, accuracy rate, dataset size).
- Matches the target role's language without copying the job description verbatim.
- Stays within the requested word count.
- Contains no skills or claims that are not supported by evidence in the context file.

### 5.2 LinkedIn section

A good LinkedIn section output:
- Uses the exact positioning language from the QUICK REFERENCE block.
- Stays within the character limits defined in the `linkedin` submodule.
- Includes at least one keyword that appears in the `top_skills` field of the QUICK REFERENCE block.
- Does not begin with a first-person pronoun in the About section opener.

### 5.3 CV variant

A good CV variant output:
- Selects only entries directly relevant to the stated target role.
- Presents all dates in the format defined in the context file spec (Month Year, en-dash ranges).
- Uses single-column layout with no tables, graphics, or Unicode bold characters.
- Includes a skills section that maps directly to the Skills index in the context file.

### 5.4 Interview preparation

A good interview preparation output:
- Cites the specific project name, grade, or competition result that grounds each answer.
- Does not generalize beyond what is verifiable in the context file.
- Formats behavioral answers in STAR structure with a clearly stated, quantified result.

---

*Next step: Keep your file accurate over time in [Context file maintenance](./file-maintenance.md).*
