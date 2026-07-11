<!--
metadata:
  title: "Portfolio site architecture"
  platform: "portfolio"
  objective: "Define the URL structure, page hierarchy, and internal linking patterns that make a personal website easy to crawl and easy to understand."
  status: "draft"
  last_updated: "2026-04-24"
  tags: ["portfolio", "architecture", "urls", "internal-links"]
  agent_priority: "high"
-->

# Portfolio site architecture

> This file defines the structural rules for organizing a personal website so that search engines can discover its key pages and users can navigate it without ambiguity.

---

## 1. Overview

Search engines infer a large part of a portfolio's meaning from structure. Clear URLs, stable navigation, and dedicated detail pages help crawlers understand what the site is about and which pages deserve prominence. This file focuses on the information architecture of a personal website: what pages should exist, how they should connect, and which patterns weaken discoverability.

## 2. Best practices

**Recommendation:** Give each important intent its own URL. Keep the homepage focused on orientation. Move durable information into dedicated pages such as `/about/`, `/projects/`, `/projects/<slug>/`, `/writing/`, and `/contact/`. A single long homepage can still rank for branded queries, but it is a weak container for project-specific discovery.

**Rule:** Keep important pages within a shallow, obvious hierarchy. The homepage should link directly to the major hubs. Hub pages should link directly to their detail pages. Do not hide critical pages behind multiple overlays, filters, or client-side interactions.

**Rule:** Use readable, stable, lowercase, hyphenated URLs. Portfolio URLs should communicate content at a glance. Prefer `/projects/vitaecontext/` over `/work?id=17` or `/ProjectPhoenixFinalV2/`. Stable URLs also make future redirects and external linking easier.

**Rule:** Use real internal links. For navigation and content discovery, use `<a href="...">` links that resolve to real URLs. Do not rely on buttons, `onclick` handlers, or fragment-driven routes for primary navigation.

**Recommendation:** Add breadcrumb trails on nested pages. Project detail pages, articles, and case studies benefit from visible breadcrumb navigation. This helps users move through the site and gives search engines a clearer hierarchical model.

**Recommendation:** Avoid orphan pages. Every indexable page should be reachable through normal internal linking from at least one crawlable parent page. If a project page exists only in the sitemap and nowhere else on the site, it sends a weak importance signal.

**Rule:** Serve a hard `404` status code for missing routes. Portfolio sites built on static hosts (like Netlify or GitHub Pages) or SPA frameworks often default to serving a custom "Not Found" page while returning a `200 OK` status. This creates "soft 404s" that confuse search engines and dilute crawl budgets. Ensure the server explicitly returns a `404` or `410` header.

## 3. Recommended URL map

The exact portfolio can vary by profession, but the baseline structure should look like this:

```text
/
/about/
/projects/
/projects/vitaecontext/
/projects/personal-site-rebuild/
/writing/
/writing/how-i-designed-a-context-file/
/contact/
```

If the portfolio has no writing section, omit it. If the site contains a CV or media kit, keep those under stable, descriptive paths such as `/cv/` or `/media/` rather than attaching opaque file names to the root.

## 4. Examples

Good example:

```html
<!-- CORRECT: crawlable internal navigation -->
<nav>
  <a href="/about/">About</a>
  <a href="/projects/">Projects</a>
  <a href="/writing/">Writing</a>
  <a href="/contact/">Contact</a>
</nav>
```

Bad example:

```html
<!-- WRONG: navigation depends on JavaScript event handlers instead of href -->
<nav>
  <button onclick="router.go('about')">About</button>
  <button onclick="router.go('projects')">Projects</button>
</nav>
```

## 5. Anti-Patterns

### The single-page trap

**What it looks like:** The entire portfolio lives on one long homepage with sections like "About," "Work," and "Contact," but no dedicated URLs for project details. **Why it fails:** The site has very few indexable entry points for non-branded queries. Search engines and AI agents also struggle to deep-link to a specific project or a specific proof point. **What to do instead:** Keep a concise homepage, then publish dedicated detail pages for every serious project, article, or case study worth ranking.

---

*Next step: refine search-result presentation in [Metadata and snippets](./metadata-and-snippets.md).*
