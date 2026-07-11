<!--
metadata:
  title: "Portfolio LLMs and AEO"
  platform: "portfolio"
  objective: "Define the optional AI-discovery enhancements that make a personal website easier to retrieve and summarize accurately."
  status: "draft"
  last_updated: "2026-06-21"
  tags: ["portfolio", "llms", "aeo", "llms-txt"]
  agent_priority: "medium"
-->

# Portfolio LLMs and AEO

> This file defines the optional AI-facing enhancements that help a personal website be discovered and interpreted by modern search assistants and LLM-based retrieval tools.

---

## 1. Overview

Traditional SEO is still the base layer of discoverability, but personal websites are now also being retrieved by chat search systems and agent workflows. Those systems benefit from clearer crawler policy, stable canonical pages, and optional LLM-oriented guidance such as `llms.txt`. This file covers the add-on layer of portfolio optimization for AI retrieval without confusing it with standard search indexing.

## 2. Best practices

**Recommendation:** Publish `/llms.txt` if AI retrieval is part of the site's goals. `llms.txt` is not a Google or Bing indexing standard. It is a community proposal for inference-time guidance intended to help language models understand what a site contains and where the most useful pages live.

**Rule:** Treat `llms.txt` as a curated guide, not as a shadow sitemap. List the most important pages only: homepage, About page, Projects hub, best project-detail pages, writing hub, and selected articles or case studies. The file should stay short enough to be genuinely useful to a model with limited context.

**Recommendation:** Consider `/llms-full.txt` only when the site can maintain a synchronized Markdown export. While `llms.txt` serves as a lightweight index, the proposed `llms-full.txt` variant contains the full Markdown content of selected important pages. For developer portfolios, this can reduce repeated fetches for systems that choose to use it, but it is optional and not a documented ranking or indexing standard.

**Recommendation:** Keep canonical pages concise and self-contained. LLM retrieval works better when a project page can be summarized accurately from its own content. Do not force agents to reconstruct meaning by stitching together dozens of fragments across the site.

**Recommendation:** Make crawler policy explicit when AI search visibility matters. OpenAI documents crawler user agents and robots.txt controls, and other vendors also expose crawler documentation. Keep the site's `robots.txt` policy intentional instead of assuming every crawler behaves like Googlebot.

**Recommendation:** Separate retrieval policy from training policy when the provider supports distinct bots. Some vendors use one bot for search or user-directed retrieval and another for model training or general crawling. Treat these as separate policy decisions.

## 3. Examples

Good example:

```text
# Renato Mignone

> Personal website for backend engineering, AI tooling, and open-source case studies.

## Core pages

- [About](https://example.com/about/): Professional profile, current focus, and links to external identities.
- [Projects](https://example.com/projects/): Hub for major engineering and documentation projects.
- [VitaeContext case study](https://example.com/projects/vitaecontext/): Detailed write-up of repository architecture and authoring system.

## Optional

- [Writing](https://example.com/writing/): Essays and technical notes.
```

## 4. Anti-Patterns

### The duplicate shadow site

**What it looks like:** Separate AI-only markdown pages start to drift away from the canonical HTML pages, with different dates, claims, or project descriptions. **Why it fails:** Humans, search engines, and AI systems end up reading conflicting versions of the same site. **What to do instead:** Keep `llms.txt` lightweight and point back to the canonical public URLs. If markdown mirrors exist, treat them as synchronized derivatives, not alternative truth sources.

---

*Related reading: [Indexability and submission](./indexability-and-submission.md) and [Web portfolio optimization sources](./sources.md).*
