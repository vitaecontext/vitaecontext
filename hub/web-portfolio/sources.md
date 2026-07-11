<!--
metadata:
  title: "Web portfolio optimization sources"
  platform: "portfolio"
  objective: "Centralized official sources and specs for web portfolio indexing, metadata, structured data, crawler policy, and LLM-readable docs."
  status: "review"
  last_updated: "2026-05-27"
  tags: ["portfolio", "sources", "indexing", "llms-txt"]
  agent_priority: "low"
-->

# Web portfolio optimization sources

> This file lists official documentation, published specs, and platform crawler docs that support web-portfolio claims. Third-party SEO implementation articles are excluded from `stable` source support.

---

## 1. Overview

The `web-portfolio` module uses search-engine documentation, web standards, Schema.org vocabulary, and official AI-crawler documentation. The `llms.txt` convention is treated as an emerging spec and inference-time guidance, not as a guaranteed ranking or indexing mechanism.

## 2. Source table

| Source | URL | Type | Covers | Confidence |
|---|---|---|---|---|
| Google Search Central: Technical requirements | https://developers.google.com/search/docs/essentials/technical | official-docs | Minimum technical requirements for Google Search eligibility and crawl/index basics | stable |
| Google Search Central: Introduction to robots.txt | https://developers.google.com/search/docs/crawling-indexing/robots/intro | official-docs | Robots.txt as crawl control, not reliable deindexing | stable |
| Google Search Central: Robots meta tag and X-Robots-Tag | https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag | official-docs | Page-level index and snippet controls | stable |
| Google Search Central: Sitemaps | https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview | official-docs | Sitemap role, URL discovery, and `lastmod` guidance | stable |
| Google Search Central Blog: Sitemaps ping endpoint is going away | https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping | official-blog | Deprecation of Google's sitemap ping endpoint | stable |
| Google Search Console Help: Verify site ownership | https://support.google.com/webmasters/answer/9008080 | help-center | Search Console verification methods | stable |
| Google Search Console Help: URL inspection | https://support.google.com/webmasters/answer/12482179 | help-center | Live URL inspection and request-indexing workflow | stable |
| Google Search Central: Influencing title links | https://developers.google.com/search/docs/appearance/title-link | official-docs | Title-link generation and page-title guidance | stable |
| Google Search Central: Snippets | https://developers.google.com/search/docs/appearance/snippet | official-docs | Snippet generation and meta-description limits | stable |
| Google Search Central: Canonicalization | https://developers.google.com/search/docs/crawling-indexing/canonicalization | official-docs | Canonical selection and duplicate clustering | stable |
| Google Search Central: JavaScript SEO basics | https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics | official-docs | Google crawl, render, and index pipeline for JavaScript sites | stable |
| Google Search Central: Dynamic rendering | https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering | official-docs | Dynamic rendering as workaround, not preferred long-term approach | stable |
| Google Search Central: Lazy-loaded content | https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading | official-docs | Lazy-loading requirements for discoverable content | stable |
| Google Search Central: Mobile-first indexing | https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing | official-docs | Mobile crawler and mobile content parity | stable |
| Google Search Central: Link best practices | https://developers.google.com/search/docs/crawling-indexing/links-crawlable | official-docs | Crawlable anchor links and anchor text | stable |
| Google Search Central: Structured data introduction | https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data | official-docs | Structured data purpose, formats, and JSON-LD maintainability | stable |
| Google Search Central: General structured data guidelines | https://developers.google.com/search/docs/appearance/structured-data/sd-policies | official-docs | Structured data must match visible content and be crawlable | stable |
| Google Search Central: Profile page structured data | https://developers.google.com/search/docs/appearance/structured-data/profile-page | official-docs | ProfilePage support and valid profile-page use cases | stable |
| Google Search Central: Breadcrumb structured data | https://developers.google.com/search/docs/appearance/structured-data/breadcrumb | official-docs | Breadcrumb markup and hierarchy signals | stable |
| Google Search Central: Article structured data | https://developers.google.com/search/docs/appearance/structured-data/article | official-docs | Article and author markup guidance | stable |
| Schema.org: ProfilePage | https://schema.org/ProfilePage | spec | Profile page vocabulary | stable |
| Schema.org: Person | https://schema.org/Person | spec | Person vocabulary | stable |
| Schema.org: WebSite | https://schema.org/WebSite | spec | Website identity vocabulary | stable |
| Schema.org: Organization | https://schema.org/Organization | spec | Organization and publisher identity vocabulary | stable |
| Schema.org: SoftwareSourceCode | https://schema.org/SoftwareSourceCode | spec | Source-code project vocabulary | stable |
| Schema.org: SoftwareApplication | https://schema.org/SoftwareApplication | spec | Software product and application vocabulary | stable |
| Schema.org: CollectionPage | https://schema.org/CollectionPage | spec | Collection and index page vocabulary | stable |
| Schema.org: ContactPage | https://schema.org/ContactPage | spec | Contact page vocabulary | stable |
| Schema.org: TechArticle | https://schema.org/TechArticle | spec | Technical article vocabulary | stable |
| Schema.org: BreadcrumbList | https://schema.org/BreadcrumbList | spec | Breadcrumb hierarchy vocabulary | stable |
| Google Search Central: Core Web Vitals and search results | https://developers.google.com/search/docs/appearance/core-web-vitals | official-docs | Current page-experience metrics Google recommends monitoring | likely |
| Google Search Central: Helpful, reliable, people-first content | https://developers.google.com/search/docs/fundamentals/creating-helpful-content | official-docs | People-first content quality framework and "Who, How, and Why" guidance | likely |
| IndexNow documentation | https://www.indexnow.org/documentation | spec | URL change notification protocol for participating search engines | stable |
| Bing Webmaster Tools URL Submission API | https://www.bing.com/webmasters/url-submission-api | official-docs | Bing URL and content submission APIs | likely |
| OpenAI platform docs: Crawlers | https://platform.openai.com/docs/bots | official-docs | OpenAI crawler user agents and robots.txt controls | likely |
| Anthropic Support: Crawler controls | https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler | help-center | Anthropic crawler separation and robots.txt controls | likely |
| Perplexity Docs: Crawlers | https://docs.perplexity.ai/guides/bots | official-docs | Perplexity bot names, robots.txt tags, and use distinctions | likely |
| RFC 9309: Robots Exclusion Protocol | https://www.rfc-editor.org/rfc/rfc9309 | spec | Formal robots.txt standard | stable |
| Sitemaps XML format | https://www.sitemaps.org/protocol.html | spec | Sitemap XML protocol | stable |
| llms.txt proposal | https://llmstxt.org/ | spec | `llms.txt` structure, optional sections, and context-file variants | likely |

## 3. Removed or downgraded sources

The previous source list included a third-party JSON-LD implementation walkthrough. That source is useful implementation background, but it does not support `stable` search or structured-data policy claims.

No clean official source was found for guaranteed AI citation, guaranteed LLM ingestion, guaranteed `llms.txt` support by major search or AI providers, or ranking benefits from `llms.txt`. Treat those claims as `disputed`.

---

See also: [Web portfolio SEO and indexing](./README.md) and [runtime knowledge](../../.skills/agent-skill/vitaecontext-portfolio/wiki/knowledge.md).
