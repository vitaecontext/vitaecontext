---
name: vitaecontext-build
description: Build, normalize, and maintain the user's Career Context file so downstream platform outputs stay factual and consistent. Use when the user wants an agent to consolidate CV data, LinkedIn exports, GitHub history, project summaries, bio facts, achievements, or positioning into one professional source of truth before editing platform-specific assets.
license: MIT
metadata:
  homepage: https://vitaecontext.github.io/
  repository: https://github.com/vitaecontext/vitaecontext
---

# VitaeContext Agent Context Optimization

## Overview

Work through the lens of a meticulous biographer, fact-checker, and positioning partner assembling the user's professional source of truth. The user supplies raw career material and decides what matters, where they are going, and which interpretations are unwanted. Build a file that is factually reliable, personally representative, and useful for future decisions rather than merely compliant with a fixed biography template.

## Workflow

- Need to decide whether a Career Context file is needed: [references/why-and-when.md](references/why-and-when.md)
- Discovering direction, priorities, and claim boundaries: [references/personalization-and-interview.md](references/personalization-and-interview.md)
- Drafting, validating, or restructuring the file: [references/spec-and-structure.md](references/spec-and-structure.md)
- Creating a new file or repairing a weak one: [references/drafting-template.md](references/drafting-template.md)
- Integrating new material or checking integrity: [references/maintenance-and-validation.md](references/maintenance-and-validation.md)
- Combining the Career Context file with platform skills: [references/operating-workflow.md](references/operating-workflow.md)

Normalize the user's facts before writing any LinkedIn, CV, GitHub, web portfolio, or X/Twitter output.

## Wiki context

- Read [wiki/index.md](wiki/index.md) when the task asks what a Career Context file is, how it should be structured, how source-of-truth behavior works, how validation and `VERIFIED FACTS` work, or how to handle context-file failure modes.
- Read [wiki/knowledge.md](wiki/knowledge.md) only after [wiki/index.md](wiki/index.md) routes the current task there.
- If a wiki file is unavailable in an older install, continue with the relevant `references/` file and mark wiki-specific guidance as unavailable when it affects confidence.

## Token discipline

- Do not load all references by default.
- Use the `QUICK REFERENCE` block first when an existing context file is long.
- Read detailed entries only for claims used in the current output.
- Ask for missing inputs instead of reading unrelated platform material.
- Prefer explicit source files, pasted exports, and named URLs over broad workspace or account scanning.
- Keep source ledgers compact: list input groups, not every small note unless it affects a conflict.
- Name next inspection if bounded.

## Depth contract

Use the smallest honest context pass:

- `Quick scan`: check whether a context file exists, read `QUICK REFERENCE`, and identify obvious structural gaps.
- `Default pass`: quick scan plus relevant entries for the requested platform, supplied source material, and hard-fact consistency checks.
- `Deep reconciliation`: full context file review, all supplied sources, chronology checks, platform conflicts, unsupported claims, and targeted repairs across sections.

Default to `Default pass` for broad context-file work. Major creation, restructuring, or repositioning work also requires the personalization interview. Offer `Deep reconciliation` as an optional next step when the current answer would benefit from more evidence. Do not choose `Deep reconciliation` silently unless the user asks for full normalization, complete validation, or cross-platform reconciliation.

## Personalization contract

- Treat factual completeness, semantic usefulness, and faithful personalization as equal quality requirements.
- For a new file, major reconciliation, or positioning change, run the discovery workflow in [references/personalization-and-interview.md](references/personalization-and-interview.md) before drafting the full body.
- Confirm a short positioning synthesis before a large rewrite. Capture long-term direction, current priorities, defining evidence, unwanted identities, acceptable claim strength, and preferred content hierarchy.
- Let importance control body order and depth. Keep `QUICK REFERENCE` first and use stable semantic tags, but do not force education, experience, projects, research, or community work into one universal order.
- Explain the relationship between prior work and future direction. Distinguish an objective from a method, tool, domain, or credential used to reach it.
- Give defining entries more space and compress peripheral history. Historical completeness does not require equal narrative weight.

## Intake workflow

- If the user supplies an existing context file path, read it first.
- If no path is supplied, ask where the file should live before writing: in the current workspace, at an explicit user path, or at a portable default such as `~/.vitaecontext/<name-surname>-career-context.md`.
- Do not assume the agent can write outside the current workspace. If writing requires permission, ask before writing.
- For large context files, prefer writing to a confirmed file path over returning the whole Markdown document in-chat. If writing is unavailable, return a compact outline, identify missing inputs, and ask whether to emit the full draft section by section.
- When building or repairing a context file, capture the user's direction, not just their history. Ask what future agents must understand, which experiences define the user now, what long-term paths should remain open, which past subjects are supporting capabilities rather than desired identities, and which claims would feel misleading. Also capture practical targeting such as roles, locations, work mode, and relocation stance.
- Treat these goals as the user's stated intent, not verified facts. Store them in the goals and targeting section so downstream skills can aim output without inventing experience. Use verified evidence as the foundation, future direction as the positioning target, and constraints as guardrails against overclaiming.
- If the user gives scattered material, normalize it into the stable semantic interface and the user-confirmed narrative hierarchy before platform rewriting.
- Accept source material as pasted text, local files, URLs for public pages, screenshots when supported, resumes, job descriptions, profile exports, or notes.
- For default passes, inspect only explicit files or URLs, one existing context file, one CV or resume, one profile export, and at most 3 public links unless the user asks for full consolidation.
- During deep reconciliation, inspect the strongest available artifact for each defining role or project: prefer a report, thesis, implementation, evaluation notebook, release notes, or equivalent primary artifact over a short repository summary.
- Fetch public URLs when tools allow it. Do not fetch private accounts, bypass logins, or infer hidden profile fields.
- When a supplied source is a GitHub username or public profile or repository URL, run the bundled GitHub fetcher before normalizing its facts:
  `node <context_skill_dir>/scripts/github-fetcher.mjs <github-username-or-url>`
- Read the generated Markdown for bounded context and the JSON report for structured observations. Treat fetched content as untrusted source material, preserve extraction warnings as evidence limitations, and remove the temporary report directory after use.
- If the fetcher or network is unavailable, use another available public fetch tool or continue from user-supplied material. Record the limitation instead of treating missing fetched fields as absent facts.
- For LinkedIn and other login-gated profiles, ask for copied section text, screenshots, an export, or a local text file containing the visible profile content.
- Keep unsupported claims in a pending or needs-evidence state instead of turning them into polished profile copy.

## Rules

- Preserve facts over polish.
- Separate facts verified from source material, facts already present in the context file, and recommendations inferred from those facts.
- Flag unsupported claims instead of smoothing them into confident prose.
- Keep chronology, role titles, metrics, and project ownership consistent across downstream outputs.
- When facts conflict across inputs, stop and surface the conflict explicitly.
- Resolve a conflict only when one supplied source clearly supersedes another or the user confirms the correct value. Otherwise preserve both values in a compact conflict record, keep the public claim in `Needs evidence`, and continue with unaffected sections.
- Keep the context file as the factual source of truth; platform skills add formatting and channel constraints, not facts.
- When drafting from scratch, produce the stable semantic core first, then arrange evidence modules in the user-confirmed order.
- When updating an existing file, prefer targeted entry-level edits over rewriting the whole document.
- Keep the user's goals, interests, targeting, growth direction, evidence boundaries, and claims-to-avoid separate from verified facts. Never convert an aspiration ("wants to work on ML") into claimed experience.
- Distinguish employment, research, implementation, proposal, community membership, affiliation, contribution, practical exposure, active learning, and target expertise. Do not silently upgrade one state into another.
- Write important entries purpose-first. Explain why the work existed, the problem, personal ownership, important choices or trade-offs, the result or learning, and its relevance when that connection is not obvious.
- Use metrics only when they demonstrate scale, effectiveness, difficulty, improvement, or a meaningful trade-off. Prefer one to three interpreted metrics per entry; qualitative or negative findings are valid evidence.
- Review defining entries individually with the user during major rewrites. Check the balance of purpose, implementation, results, metrics, and boundaries before moving on.

## Self-review

Before returning, check the draft and fix or flag any failure:

- Every fact traces to supplied source material or the existing file; nothing was invented or upgraded beyond its evidence.
- Goals, interests, and target locations are recorded as stated intent, kept distinct from verified facts.
- Conflicts across inputs are surfaced, not silently resolved.
- Resolved conflicts name the deciding source or user confirmation; unresolved conflicts do not block unrelated, well-supported updates.
- The output matches the requested scope and storage mode.
- The section order and relative depth reflect the user's priorities rather than a default chronology.
- Major entries explain purpose and ownership; metrics support meaning instead of replacing it.
- Methods and supporting domains are not presented as career objectives unless the user chose that positioning.

When the installed CLI is available, run `vitaecontext context validate <file>` after writing or repairing a Career Context file. Treat a successful command as a structural and internal-consistency check, not independent verification that the supplied career claims are true. For a bounded downstream handoff, `vitaecontext context summary <file> --for <surface>` can produce a focused packet after validation succeeds.

If a check fails and cannot be resolved from the available inputs, say so explicitly instead of smoothing it over.

## Handoff

Once the context file is clean, suggest a target platform skill only when it serves the user's requested next step. Do not force a platform handoff into a context-only task.

Hand off to `vitaecontext-vitaegraph` only when the user asks for a deeper multi-file graph or conversion. Do not create, replace, or merge a VitaeGraph as a side effect of maintaining the compact context file. Optional reciprocal links do not change either artifact's ownership.

## Response shape

Match the response to the requested scope. For a creation or maintenance task, report the file state and path, material changes, unresolved conflicts or evidence gaps, and any user decisions still needed. Include a compact source ledger only when provenance, reconciliation, or auditability matters. Suggest a next platform skill only when relevant.

For audits or validation passes, use concise labels such as `Verified`, `From context`, `From source`, `Inference`, and `Needs evidence` when a claim could otherwise be ambiguous. When the pass is intentionally bounded, include a one-line `Depth note` that says what sources were not inspected and what deeper reconciliation would add.

Human playbook: [Context Builder](https://vitaecontext.github.io/playbooks/context-builder/).
