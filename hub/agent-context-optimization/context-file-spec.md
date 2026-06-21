<!--
metadata:
  title: "Agent context file specification"
  platform: "general"
  objective: "Defines the required structure, section order, formatting conventions, and agent-optimization rules for a personal agent context file."
  status: "draft"
  last_updated: "2026-04-24"
  tags: ["context-file", "specification", "agent-optimization", "formatting"]
  agent_priority: "high"
-->

# Agent context file specification

> Defines the required structure, section order, and formatting rules that every personal agent context file must follow to remain usable by both a human maintainer and an AI agent.

---

## 1. Overview

The agent context file is a single Markdown document containing a person's full professional record and stated career direction. It is the source of truth from which any career output can be generated: CVs, cover letters, LinkedIn sections, portfolio copy, and interview preparation material. Two readers use it simultaneously — a human who maintains it and an agent that extracts verified facts, goals, and positioning constraints from it. Every rule in this spec serves both readers. Following this spec produces a file that any agent can load, navigate by section tag, and use immediately without additional instructions.

The file can live wherever the user wants. Prefer an explicit user-chosen path. A useful portable convention is `~/.agentkit-seo/<name-surname>-seo-context.md`; a local workspace draft is also valid while the file is being created. Agents must confirm the destination before creating or overwriting the file. Because valid context files can become large, agents should prefer file writes or targeted diffs over full in-chat drafts; if file writing is unavailable, return a compact outline first and split the full Markdown draft by section only when requested.

## 2. File structure

The context file contains eleven sections in a fixed order. The table below defines the requirement status of each section.

| # | Section | Status |
|---|---|---|
| 1 | Title | Required |
| 2 | QUICK REFERENCE block | Required |
| 3 | Goals and targeting | Recommended |
| 4 | Scope declaration | Required |
| 5 | Education | Required |
| 6 | Professional experience | Conditional |
| 7 | Research and publications | Conditional |
| 8 | Skills index | Required |
| 9 | Certifications and achievements | Conditional |
| 10 | Languages | Required |
| 11 | Extracurricular and leadership | Optional |

**Required:** present in every valid context file. **Recommended:** include unless the user declines; it sharpens downstream targeting. **Conditional:** present if the described content exists. **Optional:** may be omitted.

### 2.1 Title

**Rule:** Use one H1 heading containing the person's full name and a one-phrase professional descriptor.

```markdown
# Firstname Lastname — Professional Descriptor
```

The descriptor reflects the person's positioning, not their current job title. It is the phrase an agent uses as a default tagline in generated outputs.

### 2.2 QUICK REFERENCE block

The **QUICK REFERENCE block** is the most critical section. Place it immediately after the title, before any prose. An agent completing most tasks — cover letters, CV summaries, bios — reads this block first and descends into the body only when it needs specific detail.

**Rule:** Write the block as a YAML fenced code block under an H2 heading labeled `QUICK REFERENCE`.

```yaml
name: Firstname Lastname
current_location: City, Country
target_roles: [Role A, Role B]
open_to_relocation: true/false
target_locations: [City, Country, Remote-Region]   # or [No restriction]
work_mode: remote/hybrid/onsite
positioning_summary: Current verified identity plus the direction the person is building toward
ideal_role: The role the person ultimately wants
current_focus: What the person is working on and improving now
want_to_work_on_next: Problems, domains, or responsibilities the person is aiming for
growth_direction: Future domain, seniority, or role family the person wants to move toward
emerging_interests: [topic1, topic2, topic3]
evidence_boundaries: Which direction claims are verified, emerging, or target development areas
positioning_constraints: How to frame transitions without overstating experience
claims_to_avoid: [claim that is not yet supported, claim that would distort the profile]
interests: [interest1, interest2, interest3]

education:
  - "[DEGREE] Degree Name | Institution | Grade | Month Year"
  - "[DEGREE] Degree Name | Institution | GPA x/y | exp. Month Year"

gpa_summary: "Course A: grade, Course B: grade, Course C: grade, ..."

professional:
  - "[ROLE] Job Title | Company | Period"

top_skills: [skill1, skill2, skill3]
tools: [tool1, tool2, tool3]

competitions:
  - "Result — Competition Name (Year)"

certifications:
  - "Cert Name | Issuer | Date | ID (if applicable)"

languages:
  - "Language: Level (Certificate if applicable)"

github: https://github.com/username
linkedin: https://linkedin.com/in/username
portfolio: https://yoursite.com
```

**Rule:** Use inline values or flat arrays only. Do not nest objects beyond the top level.

**Rule:** Omit any field that has no value. Do not write `null` or `N/A`.

**Recommendation:** List 8–15 entries in `top_skills`, ordered from most to least central to the person's positioning.

The `gpa_summary` field lists all graded courses on a single comma-separated line. This lets an agent retrieve the full academic record without leaving the block.

### 2.3 Goals and targeting

Place the **Goals and targeting** section immediately after the QUICK REFERENCE block. It records where the person wants to go, so downstream skills can aim role, tone, location, keyword choices, and proof selection.

**Rule:** This section holds stated intent and preferences, not verified facts. Keep it separate from the verified record and never convert an aspiration into claimed experience. Do not list it inside the `<!-- VERIFIED FACTS -->` comment.

```markdown
## Goals and targeting

**Ideal role:** The role the person ultimately wants.
**Current focus:** What the person is working on and improving now.
**Want to work on next:** Problems, domains, or responsibilities they are aiming for.
**Growth direction:** The future domain, role family, seniority, or positioning shift they are building toward.
**Target locations:** Cities, countries, remote or hybrid preference, relocation stance, or No restriction.
**Interests:** Professional and personal interests that shape direction.
**Evidence boundaries:** Which parts of the direction are already verified, which are emerging, and which are target development areas.
**Positioning constraints:** Rules for framing the transition without overstating experience.
**Claims to avoid:** Claims that should not appear in public copy unless new evidence is supplied.
**Constraints:** Visa, availability, role types to avoid, or No restriction.
```

**Rule:** Write `No restriction` where the person has no constraint rather than omitting the line, so an agent does not guess.

**Rule:** Use verified evidence as the foundation, future direction as the positioning target, and constraints as guardrails. For example, if a person has applied cryptography evidence and wants to move toward agentic AI security, public copy can say "building toward agentic AI security from applied security foundations" but must not claim mature agentic AI security expertise without supporting work.

### 2.4 Scope declaration

The **scope declaration** is a single paragraph written in third person. It states what the file is, what it is not, and what it is for. Write it so an agent can read it as instructions rather than self-description.

**Rule:** Close the scope declaration with a `<!-- VERIFIED FACTS: ... -->` HTML comment listing every atomic fact in the file that must never be hallucinated: grades, scores, dates, IDs, and rankings. Update this comment whenever a new verified fact is added.

```markdown
This file is a personal knowledge base documenting [Name]'s full [field] career.
It is not intended for direct distribution to third parties. Its purpose is to serve
as a structured source of truth from which career outputs can be generated. All
facts, grades, dates, and names are verified.

<!-- VERIFIED FACTS: graduation=YYYY-MM-DD, final grade=x/y, GPA=x.xx/y,
cert score=NNN, cert id=XXXXXXX, competition result=Nth place, score=XXXXXXX -->
```

The HTML comment is invisible in rendered Markdown but visible to any agent reading raw text.

### 2.5 Education

Write each degree as an H2 heading using the `[DEGREE]` tag.

```markdown
## [DEGREE] Degree name (Classification) | Institution, City, Country | Grade | Start – End
```

Follow the heading with one sentence describing the degree's focus and its relevance to the person's current positioning. An agent uses this sentence when it needs to represent the degree in a generated output.

**Courses**

Group courses under an H3 semester heading. Write each course as an H4 entry with the `[COURSE]` tag.

```markdown
### Semester label

#### [COURSE] Course name | Grade: x/y | Code: XXXXXXX
Topics: term one, term two, term three, term four, ...
```

The `Topics:` line is a flat comma-separated enumeration of technical terms. Do not use bullet points. The purpose of this line is keyword coverage for ATS matching and agent skill-mapping.

**Projects**

If a course has a project, nest it under the course as an H5 entry with the `[PROJECT]` tag.

```markdown
##### [PROJECT] Project name | Repo: https://github.com/...
**TL;DR:** One sentence — what was built, core technologies, key result.
```

**Rule:** Every `[PROJECT]` entry must include a `**TL;DR:**` line immediately after its heading. Keep it under 30 words.

Full project detail follows the TL;DR in this order:

- **Description:** what the project is.
- **Technologies:** comma-separated list of tools and frameworks.
- **Key areas:** what was implemented or demonstrated.
- **Results:** quantified outcomes.

Do not explain what a technology does. State what was done with it.

**Thesis**

Write the thesis as an H3 entry under its parent degree, using the `[THESIS]` tag.

```markdown
### [THESIS] Short title
**Full title:** Official title, in the original language if different.
**Supervisors:** Name, Name
**Research area:** Area A, Area B
**TL;DR:** One sentence — contribution and outcome.
```

### 2.6 Professional experience

Write each role as an H3 entry using the `[ROLE]` tag.

```markdown
### [ROLE] Job title | Company | Location | Period
**TL;DR:** One sentence describing the role's scope and primary focus.
```

Follow the TL;DR with bullet points covering the technical problem addressed, tools and methodologies used, and measurable outcomes. Do not use narrative paragraphs.

If the role is the industry context for a thesis, add a cross-reference on the line after the TL;DR:

```markdown
*This role is the industry context for the [THESIS] documented under [degree section].*
```

### 2.7 Research and publications

Include this section only if the person has formal research outputs: published papers, preprints, DOI-linked reports, or papers under review.

Write each paper as an H3 entry using the `[PAPER]` or `[PREPRINT]` tag.

```markdown
### [PAPER] Short title | Venue | Year
**Full title:** Full paper title.
**Authors:** Author A, **Firstname Lastname**, Author B
**DOI:** https://doi.org/...
**TL;DR:** One sentence — contribution and main finding.
```

For work not yet published, use `[PREPRINT]` and add the status after the year: `| Under review` or `| In preparation`.

### 2.8 Skills index

**Rule:** Write the Skills index as a flat categorical enumeration. Do not use prose or bullet lists.

Write each category as a bold label followed by a comma-separated list on the same line.

```markdown
**Security:** term, term, term, ...
**Networks:** term, term, term, ...
**Cryptography:** term, term, term, ...
**Machine learning / AI:** term, term, term, ...
**Embedded systems:** term, term, term, ...
**Development:** term, term, term, ...
**Frameworks and tools:** term, term, term, ...
**Standards and frameworks:** term, term, term, ...
**Compliance and regulation:** term, term, term, ...
```

Add or remove categories to match the person's field. **Rule:** Every skill listed must appear in at least one other section of the file. Do not add skills without supporting evidence in the body.

### 2.9 Certifications and achievements

Write each entry as an H3 using the appropriate tag. The three entry types and their formats are shown below.

```markdown
### [CERT] Certificate name | Issuer | Date | ID: XXXXXXX
Score: overall score and per-component breakdown if applicable.

### [COMPETITION] Competition name | Year | Result: Nth place / Score: X
**TL;DR:** One sentence — the challenge and what was built or demonstrated.

### [AWARD] Award name | Issuing body | Date
One sentence describing what was recognized and in what context.
```

### 2.10 Languages

**Rule:** Write the Languages section as a table. Do not use prose.

The table below shows the required columns and an example row for each case.

| Language | Level | Certificate | Notes |
|---|---|---|---|
| Italian | Native | — | — |
| English | B2 / C1 speaking | Cambridge FCE, Score 172, ID C7109952 | — |
| French | Basic | — | — |

Use CEFR levels as the standard. Include standardized test scores and IDs in the Certificate column.

### 2.11 Extracurricular and leadership

Write each entry as an H3 using the `[ORG]` tag.

```markdown
### [ORG] Organization name | Role | Period
- Specific, quantified contribution with scope indicators.
- Specific, quantified contribution with scope indicators.
```

Each bullet must state a concrete activity with scope indicators: number of events, number of participants, names of partners or sponsors. Do not write generic descriptions such as "contributed to team success."

## 3. Formatting rules

These rules apply across the entire file regardless of section.

### 3.1 Semantic section tags

Every H3 and deeper heading representing a professional artifact must begin with a semantic tag in square brackets. The table below lists the full tag vocabulary.

| Tag | Used for |
|---|---|
| `[DEGREE]` | Academic degree |
| `[COURSE]` | Individual course |
| `[PROJECT]` | Practical project under a course or role |
| `[THESIS]` | Bachelor's or Master's thesis |
| `[ROLE]` | Professional position or internship |
| `[PAPER]` | Published or submitted academic paper |
| `[PREPRINT]` | Paper in preparation or under review |
| `[CERT]` | Formal certificate or credential |
| `[COMPETITION]` | Competitive event with a scored result |
| `[AWARD]` | Award or honor |
| `[ORG]` | Organization membership |

Tags enable an agent to identify the content type before reading it. This allows selective loading of specific sections without parsing the full file.

### 3.2 TL;DR convention

**Rule:** Every `[PROJECT]`, `[THESIS]`, `[COMPETITION]`, and `[ROLE]` entry must include a `**TL;DR:**` line immediately after its heading. Write it as a single sentence of at most 30 words. It must be the first line of body content in the section, never a heading.

### 3.3 No unicode bold

**Rule:** Do not use Unicode bold characters (e.g., `𝗡𝗲𝘁𝘄𝗼𝗿𝗸`, `𝗔𝗜`) anywhere in the file. Use standard Markdown bold (`**text**`) or plain text instead.

Unicode bold inflates token count, breaks in some parsers, and carries no semantic meaning for language models.

### 3.4 Date format

**Rule:** Follow this format for all dates throughout the file.

| Context | Format | Example |
|---|---|---|
| Single date | Month Year | June 2024 |
| Range | Month Year – Month Year | September 2021 – June 2024 |
| Future date | Expected Month Year | Expected October 2026 |

Use an en-dash (`–`), not a hyphen (`-`), in date ranges. Do not mix formats within the file.

### 3.5 Quantify all results

**Recommendation:** Express every result, outcome, or contribution that can be measured as a number. Apply this to grades, accuracy rates, rankings, participant counts, dataset sizes, and durations.

When a number is approximate, prefix it with `~`. Do not use vague language such as "many," "several," or "a large number of."

### 3.6 Technology lists

**Rule:** List technologies, tools, libraries, and frameworks as comma-separated values on a single line. Do not use a bullet list for technology enumeration.

Good example:

```markdown
<!-- CORRECT: flat list, token-efficient, agent-parseable -->
Technologies: Python, PyTorch, Scikit-learn, Pandas, QEMU, ARM GCC
```

Bad example:

```markdown
<!-- WRONG: bullet list wastes tokens and fragments what is a single concept group -->
Technologies:
- Python
- PyTorch
- Scikit-learn
```

### 3.7 Header hierarchy

**Rule:** Follow this four-level hierarchy strictly. Do not skip levels.

| Level | Used for |
|---|---|
| H1 (`#`) | File title. One per file. |
| H2 (`##`) | Major sections: Education, Professional experience, Skills index, etc. |
| H3 (`###`) | Individual entries: each degree, role, cert, competition. |
| H4 (`####`) | Sub-entries: courses under a degree, labs under a project hub. |
| H5 (`#####`) | Projects nested under a course or lab. |

## 4. Anti-patterns

### Unicode bold as visual headers

**What it looks like:** `𝗡𝗲𝘁𝘄𝗼𝗿𝗸 𝗮𝗻𝗱 𝗖𝗹𝗼𝘂𝗱 𝗦𝗲𝗰𝘂𝗿𝗶𝘁𝘆` used as a visual header inside a section body.

**Why it fails:** Unicode bold characters inflate token count, break in some parsers, and are semantically invisible to language models. Content appears unstructured to an agent.

**What to do instead:** Use a proper Markdown heading at the correct level in the hierarchy.

### Skills listed without body evidence

**What it looks like:** A term appears in the Skills index but does not appear in any course, project, or role section.

**Why it fails:** An agent asked to justify a skill claim in a cover letter cannot cite supporting evidence. Recruiters or screening workflows that compare claims across documents may flag unsupported skills as weak or inconsistent.

**What to do instead:** Only list a skill if it is backed by at least one course, project, role, or certification in the file body.

### Explanatory prose inside project sections

**What it looks like:** "PyTorch is a deep learning framework. It was used in this project to train a classifier."

**Why it fails:** The reader is assumed to know what the tool is. Explaining it wastes tokens and buries the actual contribution.

**What to do instead:** State what was done with the tool, not what the tool is.

### Missing TL;DR on project and role sections

**What it looks like:** A 30-line project section with no TL;DR line.

**Why it fails:** An agent generating a CV bullet for that project must parse the full section to find the key claim. This increases token usage and raises the risk of misrepresentation.

**What to do instead:** Add a TL;DR immediately after every `[PROJECT]`, `[THESIS]`, `[COMPETITION]`, and `[ROLE]` heading.

### Null and N/A values in the QUICK REFERENCE block

**What it looks like:** `portfolio: N/A` or `portfolio: null` in the YAML block.

**Why it fails:** These values pollute the block with noise. A YAML parser may treat them as strings rather than absent fields, causing unexpected behavior in agent pipelines that consume the block programmatically.

**What to do instead:** Omit the field entirely when it has no value.

## 5. Validation checklist

Before considering a context file complete, verify all of the following items.

- [ ] The file opens with an H1 title in the specified format.
- [ ] The QUICK REFERENCE YAML block is complete and appears before the scope declaration.
- [ ] The Goals and targeting section is present (or intentionally declined), holds stated intent only, and is kept out of the `<!-- VERIFIED FACTS -->` comment.
- [ ] The scope declaration includes the `<!-- VERIFIED FACTS: ... -->` comment.
- [ ] Every verified fact in the file appears inside the `<!-- VERIFIED FACTS: ... -->` comment.
- [ ] Every H3 and deeper heading representing a professional artifact has a semantic tag.
- [ ] Every `[PROJECT]`, `[THESIS]`, `[COMPETITION]`, and `[ROLE]` section has a TL;DR line under 30 words.
- [ ] The Skills index is present and written as a flat categorical enumeration.
- [ ] Every skill in the Skills index appears in at least one body section.
- [ ] No Unicode bold characters appear anywhere in the file.
- [ ] All dates follow the specified format with en-dashes for ranges.
- [ ] All technology enumerations use comma-separated format, not bullet lists.
- [ ] All quantifiable results are expressed as numbers.
- [ ] The QUICK REFERENCE block contains no `null` or `N/A` values.

---

*Next step: Learn how to load the file into a session in the [Agent workflow for context file users](./agent-workflow.md).*
