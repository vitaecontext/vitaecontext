<!--
metadata:
  title: "Web portfolio SEO and indexing"
  platform: "portfolio"
  objective: "Master index and routing logic for making a personal website crawlable, indexable, and trustworthy in search and AI discovery systems."
  status: "draft"
  last_updated: "2026-05-11"
  tags: ["portfolio", "seo", "indexing", "aeo"]
  agent_priority: "high"
-->

# Web portfolio SEO and indexing

> This directory helps make a personal portfolio discoverable, crawlable, and persuasive instead of just visually polished.
> Public web page: [Web portfolio SEO playbook](https://vitaecontext.github.io/playbooks/web-portfolio/).

---

## 1. Overview

A portfolio can look finished and still be invisible. If project pages cannot be crawled, metadata is generic, or case studies do not explain the work, search engines and AI tools have little to surface.

A personal website is the only professional surface fully controlled by its owner. That control is useful only if the site can be discovered, rendered, and trusted by Google, Bing, and modern AI retrieval systems. This module defines the technical and editorial rules that make a portfolio indexable, understandable, and worth surfacing for both branded and non-branded queries.

```text
Weak project page:
"Project One - React app"

Stronger project page:
"VitaeContext - installable AI skill package for career profile optimization"
```

## 2. Use this module when

- A portfolio is live but not appearing in search results.
- Pages exist but metadata, structured data, or canonical URLs are weak or missing.
- A React, SPA, or static site needs crawlability and rendering checks.
- Project pages need clearer case-study structure for humans, search engines, and AI tools.

## 3. Fast path

1. If the site is not indexed, start with [Indexability and submission](./indexability-and-submission.md).
2. If the site has too few real pages, use [Site architecture](./site-architecture.md).
3. If search snippets, link previews, or page-image signals are weak, use [Metadata and snippets](./metadata-and-snippets.md).
4. If the site is JavaScript-heavy, use [JavaScript SEO](./javascript-seo.md).
5. If project pages feel thin, use [Content and case studies](./content-and-case-studies.md).
6. If schema exists but page types are unclear, use [Structured data](./structured-data.md).

## 4. Module index

The optimization logic is divided into the following documents, ordered from crawlability fundamentals to AI-readable enhancements:

- **[Indexability and submission](./indexability-and-submission.md):** The hard requirements for getting a portfolio crawled and indexed, including `robots.txt`, `sitemap.xml`, Search Console, Bing Webmaster Tools, and IndexNow.
- **[Site architecture](./site-architecture.md):** Recommended page hierarchy, URL design, internal linking, breadcrumbs, and why a portfolio needs dedicated project URLs.
- **[Metadata and snippets](./metadata-and-snippets.md):** Rules for page titles, meta descriptions, canonical URLs, social previews, representative images, site identity signals, and search-result presentation.
- **[Structured data](./structured-data.md):** Practical schema strategy for personal sites, including page-type matching, `WebSite`, `ProfilePage`, `Person`, `BreadcrumbList`, `CollectionPage`, `ContactPage`, software markup, and article markup.
- **[JavaScript SEO](./javascript-seo.md):** Rendering constraints for React, SPA, and hybrid stacks, including crawlable links, lazy loading, and soft-404 avoidance.
- **[Performance and mobile](./performance-and-mobile.md):** Mobile-first indexing, Core Web Vitals, image handling, HTTPS, and practical performance hygiene.
- **[Content and case studies](./content-and-case-studies.md):** How to write portfolio pages that satisfy people-first quality expectations and demonstrate real expertise.
- **[LLMs and AEO](./llms-and-aeo.md):** Optional AI-discovery enhancements such as `llms.txt`, crawler policy, and LLM-readable page design.
- **[Launch and monitoring](./launch-and-monitoring.md):** Deployment checklist, indexing workflow, and ongoing monitoring routine.
- **[Sources](./sources.md):** Official documentation and standards that validate the rules in this module.

## 5. Usage for agents

When an AI agent is tasked with optimizing a user's personal website:

1. If the site is missing from search or has indexing issues, start with `indexability-and-submission.md` and `launch-and-monitoring.md`.
2. If the site is built with a modern frontend stack, load `javascript-seo.md` and `performance-and-mobile.md`.
3. If the task involves rewriting page templates or content, load `metadata-and-snippets.md`, `structured-data.md`, and `content-and-case-studies.md`.
4. If the user wants to optimize for AI-assisted job search tools (e.g., Perplexity, ChatGPT queries like "find me a frontend engineer with React experience"), load both `llms-and-aeo.md` and `structured-data.md`.
5. If the user wants AI-facing discoverability in addition to traditional SEO, load `llms-and-aeo.md`.
6. Always keep metadata, structured data, and visible page content aligned. Never invent facts to satisfy markup or keyword targets.

---

Runtime skill: [.skills/agent-skill/vitaecontext-portfolio/SKILL.md](../../.skills/agent-skill/vitaecontext-portfolio/SKILL.md). Source notes: [sources.md](./sources.md).

*Next step: Start with [Indexability and submission](./indexability-and-submission.md).*
