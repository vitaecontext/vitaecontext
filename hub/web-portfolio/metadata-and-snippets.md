<!--
metadata:
  title: "Portfolio metadata and snippets"
  platform: "portfolio"
  objective: "Define the metadata rules that shape how a personal website appears in search results and how canonical identity is established."
  status: "draft"
  last_updated: "2026-05-11"
  tags: ["portfolio", "metadata", "titles", "canonical"]
  agent_priority: "high"
-->

# Portfolio metadata and snippets

> This file defines the rules for writing page titles, meta descriptions, canonical tags, and related identity signals for a personal website.

---

## 1. Overview

Metadata is the interface layer between a page and a search result. Title links, snippets, canonical hints, and site-name signals all help search systems decide what a page is, when to cluster duplicates, and how to present the result to a searcher. This file focuses on the metadata that matters most for a personal portfolio.

## 2. Best practices for title links

**Rule:** Give every indexable page a unique `<title>`. Each page must have a title that clearly names its subject. Reusing the same title pattern across every page weakens relevance and makes search results harder to distinguish.

**Rule:** Keep the title under 60 characters to prevent truncation. Google does not enforce a fixed character limit for title links, but long titles are often truncated in search results. A portfolio title that is too long can hide its primary keywords and look unprofessional.

**Rule:** Put the page topic first and the site name second. For portfolios, the page subject should lead the title. A project page should begin with the project name or the core topic, not with the site name.

**Rule:** Avoid vague labels such as "Home", "Profile", or "Project". These labels do not help users or search engines understand what is unique about the page. The homepage should still name the person or brand and the professional focus.

**Recommendation:** Keep the visible `h1` aligned with the title. Google can build title links from multiple sources, including the page title, headings, and other prominent text. When the title and `h1` point to the same topic, the signal is cleaner.

## 3. Best practices for snippets

**Recommendation:** Write a concise meta description for every important page. Use one or two sentences that summarize the actual content of the page. This is a hint, not a guarantee, but it improves the chance of a useful snippet when on-page text is not enough.

**Rule:** Put the essential summary in the visible page copy. Google primarily builds snippets from page content itself. The first paragraph of a project page or About page should therefore carry the key facts in natural prose.

**Rule:** Do not stuff keywords into descriptions. A list of repeated technologies or role titles looks manipulative and does not improve snippet quality.

## 4. Best practices for Open Graph and social tags

Open Graph (OG) tags do not directly impact Google rankings, but they control how a link appears when shared on LinkedIn, Slack, X, and other preview surfaces. Some crawlers and summarizers may also use them as lightweight page summaries.

**Rule:** Provide `og:title`, `og:description`, `og:image`, and `og:url` on every public page. Without these tags, platforms may scrape the page unpredictably, resulting in broken or generic link previews that reduce click-through.

**Rule:** Set a high-quality `og:image` that represents the specific page. The `og:image` is often the first visual impression a recruiter or peer sees. It should be 1200 x 630 pixels. Do not use a generic site-wide logo for a specific project case study; use a screenshot of that specific project.

**Recommendation:** Include X (Twitter) Card tags as a fallback. Set `twitter:card` to `summary_large_image` to ensure the link unfurls into a full-width image preview on X, rather than a small thumbnail.

**Recommendation:** Reuse the same representative image across social metadata and structured data when it describes the same page. The image referenced by `og:image`, `twitter:image`, and JSON-LD `image` should usually match for article, project, playbook, and skill pages. Use a page-specific 1200 x 630 image when possible.

**Recommendation:** Prefer visual specificity over generic branding. A project page should use a screenshot or composed preview of that project. A technical playbook should use a preview image that names the topic. A generic logo is acceptable as a fallback, but it weakens page-level distinction when many pages share it.

## 5. Best practices for canonical identity

**Rule:** Pick one canonical host and protocol. Choose the preferred public address of the site, such as `https://example.com/` or `https://www.example.com/`, and redirect all alternatives to it.

**Rule:** Use `rel="canonical"` only to point at the true representative URL. Canonical tags help with duplicate clustering. They should not be used to push unrelated pages into the index or to mask weak pages that should instead be merged, redirected, or removed.

**Recommendation:** Keep site identity signals consistent on the homepage. Use the same professional name in the homepage title, main heading, site branding, and `WebSite` structured data. If an alternate short name exists, provide it as an alternate site name rather than switching names page to page.

## 6. Best practices for signal consistency

Search engines, social platforms, and AI search systems read several signals from the same page. The signals do not need identical wording, but they should describe the same entity and page purpose.

**Rule:** Align the page identity across visible and machine-readable signals. The HTML `<title>`, meta description, canonical URL, Open Graph URL/title/description/image, X card image, and JSON-LD `url`, `name` or `headline`, `description`, and `image` should all point to the same page concept.

**Rule:** Do not let structured data make claims that visible content does not support. If JSON-LD names an author, publisher, date, project type, or representative image, the page should provide visible or clearly linked support for that value.

**Recommendation:** Make freshness visible on article-like pages. If `datePublished` or `dateModified` appears in structured data, show the publish date, updated date, or last-reviewed date in the page content.

**Recommendation:** Keep author and publisher identity stable. Article-like pages should connect to real author and publisher identities through author URLs, About pages, profile links, or `sameAs` values. External links to the same public identity can use `rel="me"`.

**Recommendation:** Treat metadata work as classification, not ranking manipulation. Consistent metadata makes a page easier to classify and preview. It does not guarantee exact snippets, rich results, rankings, thumbnails, or immediate indexing.

## 7. Examples

Good example:

```text
<!-- CORRECT: descriptive title and aligned page summary -->
<title>VitaeContext Case Study | Renato Mignone</title>
<meta name="description" content="Case study of an open-source documentation system for personal branding, ATS optimization, and agent-readable career assets." />
```

Bad example:

```text
<!-- WRONG: vague, generic, and unhelpful -->
<title>Home</title>
<meta name="description" content="developer engineer software coding portfolio website projects projects projects" />
```

---

*Next step: attach machine-readable meaning in [Structured data](./structured-data.md).*
