<!--
metadata:
  title: "Context file maintenance"
  platform: "general"
  objective: "Explains when and how to update the personal agent context file, how to manage token growth, and how to keep goals, VERIFIED FACTS, and version history accurate."
  status: "draft"
  last_updated: "2026-06-21"
  tags: ["context-file", "maintenance", "versioning", "token-efficiency"]
  agent_priority: "low"
-->

# Context file maintenance

> Rules and workflows for keeping a personal agent context file accurate, current, and token-efficient as the user's career evolves over time.

---

## 1. Overview

This file covers the maintenance lifecycle of a personal agent context file. A context file that is outdated, disorganized, or bloated with redundant detail produces worse outputs than a well-maintained one, because agents spend tokens on irrelevant content, stale facts, or stale direction. Following the rules in this file keeps the context file reliable as the primary source of truth for all generated career outputs. The primary audience is a human who has already built a valid context file and wants to maintain it correctly over time.

## 2. When to update

**Rule:** Update the context file only when a real-world event has occurred and is verifiable. Do not add content speculatively.

The trigger for every update is a completed, confirmable fact. These are the events that warrant an update:

- A new course grade is confirmed.
- A project is finished and a repository or report exists.
- A new role, internship, or research position begins.
- A competition result is published.
- A certification is awarded and an ID or score is issued.
- A paper is accepted, published, or posted as a preprint.
- A language certificate is received with an official score.

Do not add a course before the grade is official. Do not add a project before it has a concrete deliverable. Do not add a role before the start date has passed. A context file that contains unverified facts is worse than one that is slightly out of date — the VERIFIED FACTS comment in the scope declaration exists precisely to enforce this rule.

**Rule:** Update `Goals and targeting` when the person's direction changes, but keep those edits outside the verified record.

Direction changes can happen before a new credential exists. These updates belong in `Goals and targeting`, not in education, experience, projects, or `VERIFIED FACTS`:

- The target role list changes.
- A new growth direction becomes important.
- Emerging interests become more or less central.
- Target locations, relocation stance, or work mode changes.
- Evidence boundaries need clearer wording.
- Positioning constraints or claims to avoid change.

The rule is different from verified history because direction is stated intent. Record the intent plainly, then state which parts are already supported by evidence and which parts are still emerging.

## 3. How to integrate new content using an agent

Integrating new content into an existing context file by hand is error-prone, especially when the file is large. The recommended approach is to feed the raw new material to an agent and instruct it to integrate the content into the correct section, following the structural rules in [context-file-spec.md](./context-file-spec.md).

Use the prompt template below for every integration task.

```text
I have new content to add to my agent context file. The context file is loaded
in this session. The rules that govern its structure are in context-file-spec.md,
also loaded in this session.

New material:
[Paste the raw new material here. This can be a grade notification, a project
description, a certificate PDF export, a role description, or any other
unstructured source.]

Instructions:
1. Identify which section of the context file this content belongs in, based
   on the section tags and structure defined in context-file-spec.md.
2. Write the new entry in the correct format, including the required semantic
   tag, TL;DR line (if applicable), and any required fields.
3. Show me the complete new entry as a diff: the proposed addition, with its
   position in the file clearly identified (e.g., "insert after line X" or
   "append to section Y").
4. Identify any facts in the new material that must be added to the
   VERIFIED FACTS comment in the scope declaration. List them explicitly.
5. Identify any new skills demonstrated in the new material that should be
   added to the Skills index. For each one, confirm that it is supported by
   evidence in the new entry before adding it.
6. If the material changes my target roles, growth direction, evidence
   boundaries, positioning constraints, or claims to avoid, update only the
   Goals and targeting section and keep those statements out of VERIFIED FACTS.

Do not modify any existing content in the context file. Only add.
```

Review the agent's proposed diff before applying it. The agent should not modify existing entries. It should not add skills to the Skills index without backing evidence. It should not invent facts not present in the raw material.

## 4. Token growth management

As the context file grows over multiple years, it may reach a size where loading it in full consumes a significant portion of the available context window. The rules below prevent the file from bloating while preserving its completeness.

**Rule:** Do not delete completed entries. Move them toward the bottom of their section if they are no longer central to your positioning, but do not remove them. A missing entry cannot be cited.

**Recommendation:** When an entry becomes peripheral to your current positioning, compress its body detail. Remove sub-bullets that explain generic methodology and retain only the facts that are specific and quantified. The heading, tag, TL;DR, and key result must always remain.

**Rule:** The QUICK REFERENCE block must always reflect current positioning, not historical completeness. If a role ended three years ago and is no longer relevant to your target roles, remove it from the `professional:` field in the QUICK REFERENCE block. The full entry stays in the body.

**Rule:** The `top_skills` field in the QUICK REFERENCE block lists the 8–15 skills most central to your current positioning. Remove skills that have become background knowledge and are no longer differentiating. The skill still stays in the Skills index body; it just drops out of the quick-access list.

**Rule:** Keep direction fields compact. `positioning_summary`, `growth_direction`, `evidence_boundaries`, `positioning_constraints`, and `claims_to_avoid` should guide an agent quickly, not duplicate project entries or long career strategy notes.

The net effect of these rules is that the QUICK REFERENCE block always reads as a current snapshot of your positioning, while the file body preserves the full historical record for deep queries.

## 5. Keeping the VERIFIED FACTS comment current

The `<!-- VERIFIED FACTS: ... -->` HTML comment at the end of the scope declaration is the file's integrity anchor. It lists every atomic fact that must never be hallucinated: grades, GPA, dates, certification IDs, certification scores, competition rankings, and any other numeric or dated fact that an agent might otherwise estimate or guess.

**Rule:** Every time a new verified fact is added to the file body, it must also be added to the VERIFIED FACTS comment. This step is not optional.

The format for the comment is a comma-separated list of key-value pairs on one line, or multiple lines within the comment block if the list is long. For example:

```markdown
<!-- VERIFIED FACTS: graduation=2024-06-13, final_grade=101/110, gpa=29.48/30,
cert_score=172, cert_id=C7109952, competition_result=1st_place,
competition_year=2025 -->
```

When using an agent to integrate new content (section 3 of this file), always instruct it to update the VERIFIED FACTS comment as part of the same task. The prompt template in section 3 already includes this instruction.

## 6. Versioning the context file

**Recommendation:** Keep the context file in a private Git repository or a versioned cloud document. The commit history is the changelog of your career.

A private Git repository is the most robust option. Each update becomes a commit. The commit message describes what changed. Examples:

```text
Add grade for Network and Cloud Security (30L/30)
Add eBPF verifier bypass research project
Add Huawei internship — post-quantum cryptography thesis
Add IEEE-HKN 1st place result, update QUICK REFERENCE
```

This practice produces three concrete benefits. First, you can recover any earlier version of the file if an update introduces an error. Second, the commit log gives you a dated record of every career development, which is useful for performance reviews, annual self-assessments, and visa or scholarship applications that require a chronological work history. Third, if you ever want to roll back the QUICK REFERENCE block to a previous positioning (for a specific application that targets an older skill set), you can retrieve it precisely.

If a Git repository is not practical, a versioned cloud document with named versions (e.g., "Version after Huawei start — February 2026") serves the same purpose. The critical property is that past states of the file are recoverable.

**Rule:** Never overwrite the file in place without a version checkpoint. A context file with no history is a fragile artifact.

---

*Return to the [Agent context optimization index](./README.md).*
