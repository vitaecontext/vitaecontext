<!--
metadata:
  title: "Portfolio JavaScript SEO"
  platform: "portfolio"
  objective: "Define the rendering and navigation constraints needed to make a JavaScript-heavy personal site indexable."
  status: "draft"
  last_updated: "2026-04-24"
  tags: ["portfolio", "javascript", "rendering", "spa"]
  agent_priority: "high"
-->

# Portfolio JavaScript SEO

> This file defines the rendering, navigation, and lazy-loading rules that keep a JavaScript-powered portfolio visible to search engines.

---

## 1. Overview

Modern portfolio sites often use React, Astro, Next.js, or other frontend-heavy stacks. These stacks are not inherently bad for SEO, but they introduce failure modes that static HTML sites avoid: empty initial HTML, non-crawlable navigation, delayed content rendering, and soft 404 behavior. This file focuses on how to keep a portfolio search-friendly when JavaScript is part of the architecture.

## 2. Best practices

**Recommendation:** Prefer static generation, server-side rendering, or hybrid rendering for core portfolio pages. The homepage, About page, Projects hub, project-detail pages, and writing pages should all render useful content without waiting for client-side data fetches to populate the main body.

**Rule:** Ensure that primary content exists in rendered HTML. Titles, headings, canonical tags, structured data, internal links, and the main descriptive copy should appear in the rendered HTML that search tools inspect. Do not hide the site's meaning behind hydration.

**Rule:** Use normal URLs and real anchor elements for main navigation. Primary routing should not depend on `onclick` handlers or URL fragments. Search engines crawl URLs, not interaction states.

**Rule:** Return real HTTP status codes. A deleted or missing project page should return `404` or `410`, not a pretty client-side error screen with a `200` response. Soft 404 behavior creates indexing noise and weakens site quality.

**Recommendation:** Keep JavaScript and CSS files crawlable and cache-safe. Search engines need access to rendering assets. Use content fingerprinting for bundles so that updated assets are fetched correctly after deployment.

## 3. Lazy-loading and hydration rules

**Rule:** Lazy-load media, not the main meaning of the page. Images, galleries, and below-the-fold embeds can be deferred. The primary text, title, and proof of relevance should not wait for user interaction.

**Rule:** Load deferred content when it enters the viewport. Do not require scroll depth tricks, button clicks, or hover states to reveal content that should be indexed.

**Recommendation:** Provide `<noscript>` fallbacks for critical identity content. While search engines execute JavaScript, providing a lightweight `<noscript>` block containing the basic profile summary, contact links, and primary skills serves as a failsafe for strict environments, privacy browsers, or simple crawlers that do not support JS.

**Recommendation:** Treat dynamic rendering as a workaround, not a default architecture. If the site needs a special bot-rendered path to be indexable, the underlying architecture is already fragile.

## 4. Examples

Good example:

```html
<!-- CORRECT: crawlable URL with visible anchor text -->
<a href="/projects/vitaecontext/">VitaeContext case study</a>
```

Bad example:

```html
<!-- WRONG: route depends on JavaScript event handling -->
<div onclick="goToProject('vitaecontext')">VitaeContext case study</div>
```

## 5. Anti-Patterns

### The beautiful empty shell

**What it looks like:** The site loads a polished frame, a hero animation, and a JavaScript bundle, but the meaningful text appears only after a client-side request completes. **Why it fails:** Crawlers may see a partial or delayed version of the page. Even if the page eventually renders, discovery and indexing become slower and less reliable. **What to do instead:** Render the core page content on the server or at build time, then hydrate interactivity around it.

---

*Next step: tighten user experience signals in [Performance and mobile](./performance-and-mobile.md).*
