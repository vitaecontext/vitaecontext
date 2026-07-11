<!--
metadata:
  title: "CV and ATS optimization"
  platform: "cv-ats"
  objective: "Master index and routing logic for formatting and optimizing CVs for Applicant Tracking Systems."
  status: "draft"
  last_updated: "2026-06-21"
  tags: ["cv", "ats", "resume", "index"]
  agent_priority: "high"
-->

# CV and ATS optimization

> This directory helps turn a CV into a document that parsers can extract, recruiters can scan, and agents can safely tailor without breaking the layout.
> Public web page: [CV and ATS optimization playbook](https://vitaecontext.github.io/playbooks/cv-ats/).

---

## 1. Overview: The ATS problem

The prettiest CV is not always the strongest CV. If the parser misses the name, dates, skills, or job titles, the design has already failed.

When you apply for a job, a human recruiter may not read your CV first. Many hiring teams use an Applicant Tracking System (ATS) to store applications, parse resumes into structured fields, search for candidates, and manage review workflows before a human evaluates the final profile.

The problem is that ATS parsers do not understand visual design the way a human does. They extract text from PDF or Word files, look for standard section headers such as "Experience" and "Education," and map the result into database fields. Some workflows also use keywords, filters, or matching tools to help recruiters find relevant candidates.

The solution is to design a CV for reliable parsing first and human readability second. This module provides constraints and strategies for building a machine-readable CV that gives the user's qualifications the best chance of being extracted correctly.

```text
Weak bullet:
"Worked on backend APIs and improved performance."

Stronger bullet:
"Reduced API response time by 38% by adding Redis caching and optimizing PostgreSQL queries."
```

## 2. Use this module when

- A CV needs to be tailored for a specific job description.
- The layout may be too visual, too dense, or hard for parsers to extract.
- Bullet points need stronger metrics, clearer action verbs, or better keyword alignment.
- A LaTeX, Markdown, Word, or PDF CV needs an agent-safe editing workflow.

## 3. Fast path

1. Start with [Core sections](./core-sections.md) to check the required structure.
2. Use [Formatting rules](./formatting-rules.md) before changing layout or typography.
3. Run the checks in [Common pitfalls](./common-pitfalls.md) before sending the CV.
4. Use [Keyword strategy](./keyword-strategy.md) and [Achievement metrics](./achievement-metrics.md) when tailoring content to a role.
5. Use [Agent workflow](./agent-workflow.md) when an AI agent is editing a source file.

## 4. Module index

The optimization logic is divided into the following documents, ordered from the most foundational structural rules to advanced AI workflows:

- **[Core sections](./core-sections.md):** The mandatory CV sections you must include, their exact naming conventions, and the correct chronological ordering.
- **[Formatting rules](./formatting-rules.md):** Hard constraints on the single-page layout, typography, file types, and eliminating wasted space.
- **[Common pitfalls](./common-pitfalls.md):** The elements that immediately break ATS parsers (graphics, tables), how to run the mandatory "copy-paste-friendly" test, and avoiding the LinkedIn "Trust Gap".
- **[Keyword strategy](./keyword-strategy.md):** The methodology for extracting hard and soft skills, handling gap analysis and skill translation, and integrating keywords for parser and recruiter clarity.
- **[Achievement metrics](./achievement-metrics.md):** The syntactic formula (Action Verb + Task + Result) and STAR/STAR+R/XYZ methods for writing high-impact bullet points, including the Resume Quantifier strategy.
- **[Agent workflow](./agent-workflow.md):** Why plain-text LaTeX (.tex) is the preferred format for automated CV tailoring by AI agents.
- **[Sources](./sources.md):** Official ATS, recruiting-platform, and parser documentation plus downgrade notes for unsupported claims.

## 5. Usage for agents

When an AI agent is tasked with optimizing a user's CV:

1. Review this index to determine which specific sub-module is relevant to the task.
2. If building a CV from scratch, start with `core-sections.md` and `formatting-rules.md`.
3. If fixing parsing issues, load `common-pitfalls.md`.
4. If rewriting bullet points, load `achievement-metrics.md` and `keyword-strategy.md`.
5. Always prioritize empirical constraints over creative formatting.

---

Runtime skill: [.skills/agent-skill/vitaecontext-cv/SKILL.md](../../.skills/agent-skill/vitaecontext-cv/SKILL.md). Source notes: [sources.md](./sources.md).
