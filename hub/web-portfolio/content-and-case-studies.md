<!--
metadata:
  title: "Portfolio content and case studies"
  platform: "portfolio"
  objective: "Define the content patterns that make a personal website useful, trustworthy, and capable of ranking beyond branded searches."
  status: "draft"
  last_updated: "2026-04-28"
  tags: ["portfolio", "content", "case-studies", "trust"]
  agent_priority: "high"
-->

# Portfolio content and case studies

> This file defines how to write portfolio pages that communicate real expertise, satisfy people-first quality expectations, and create strong entry points for search and AI systems.

---

## 1. Overview

Search visibility for a personal site is not only a technical problem. A portfolio also needs enough original, trustworthy content to justify ranking. This file focuses on the content layer of portfolio SEO: positioning, About-page clarity, project-detail depth, and case-study writing that demonstrates first-hand experience rather than generic self-promotion.

## 2. Best practices

**Recommendation:** Use Google's E-E-A-T framework as a quality checklist. Google uses Experience, Expertise, Authoritativeness, and Trustworthiness as part of its quality guidance, especially for evaluating whether content is helpful and reliable. For a portfolio, *Experience* (first-hand knowledge) and *Expertise* (verifiable skills) are the primary differentiators. Case studies must demonstrate that the author actually did the work, not just summarized a topic.

**Rule:** Give the site a clear professional focus. The homepage and About page should make the target domain obvious. A portfolio that tries to target every possible role creates vague page copy and makes the site harder to understand.

**Rule:** Make authorship and credibility explicit. People and search systems should be able to tell who created the content, what domain experience exists, and where supporting proof lives. Link to GitHub, LinkedIn, publications, demos, talks, or shipped products when relevant.

**Recommendation:** Keep the About page factual and specific. State the current role, operating domain, core strengths, and the type of work represented on the site. Avoid generic mission statements that could belong to any developer.

**Rule:** Give every serious project a detail page. A project card is not enough. The detail page should explain the problem, role, scope, stack, decisions, constraints, and outcome in enough depth that a recruiter or search engine can understand why the work matters.

**Recommendation:** Use internal linking to build topical authority. Case studies and project pages should not exist in isolation. Link between related projects, shared technologies, or relevant blog posts within the portfolio to improve crawl depth and signal related expertise to search engines.

**Recommendation:** Publish case studies or writing only when there is first-hand value. Original process notes, system design tradeoffs, migration lessons, and postmortems are stronger than keyword-targeted filler posts.

**Rule:** Update or retire stale pages. If a project is abandoned, rewritten, or no longer representative, revise the page or remove it from the index. Thin, outdated pages weaken the usefulness and credibility of the site.

## 3. Recommended case study template

Use the following outline for project-detail pages:

1. One-paragraph summary of what the project is and why it exists.
2. The specific problem or user need.
3. The exact role and ownership scope.
4. The stack and architectural constraints.
5. The key decisions and tradeoffs.
6. The outcome, metrics, or what changed after delivery.
7. Links to code, live demo, article, or external proof.

## 4. Examples

Good example:

```text
<!-- CORRECT: clear role, scope, and outcome -->
VitaeContext is an open-source documentation system for personal branding and
ATS optimization. I designed the repository structure, writing rules, and
module routing so that both humans and coding agents can use the same source of
truth. The result is a markdown-first knowledge base that supports targeted CV,
LinkedIn, GitHub, and portfolio optimization workflows.
```

Bad example:

```text
<!-- WRONG: generic, hype-heavy, and not tied to real work -->
This project changed everything for me. It is a revolutionary platform that
uses cutting-edge AI to transform the future of professional branding.
```

## 5. Anti-Patterns

### The screenshot cemetery

**What it looks like:** A grid of polished thumbnails with titles such as "Project One" and "Project Two", but no explanation of the problem, role, or outcome behind the visuals. **Why it fails:** Search engines get almost no usable context. Human readers also cannot tell whether the work reflects original engineering, design polish, or simple cloning. **What to do instead:** Treat screenshots as supporting evidence, not as the content itself. Pair visuals with structured, first-hand explanation.

---

*Related reading: [Structured data](./structured-data.md) and [Web portfolio optimization sources](./sources.md).*
