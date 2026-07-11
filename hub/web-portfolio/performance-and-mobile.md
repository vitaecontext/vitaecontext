<!--
metadata:
  title: "Portfolio performance and mobile readiness"
  platform: "portfolio"
  objective: "Define the mobile, performance, image, and HTTPS rules that support search visibility and a strong page experience."
  status: "draft"
  last_updated: "2026-04-24"
  tags: ["portfolio", "performance", "mobile", "cwv"]
  agent_priority: "medium"
-->

# Portfolio performance and mobile readiness

> This file defines the page-experience constraints that help a personal website load well, behave well on mobile, and avoid common performance regressions.

---

## 1. Overview

Google indexes the mobile version of a site and strongly recommends mobile-friendly design. Performance is not a substitute for useful content, but slow, unstable pages waste crawl resources and reduce user trust at the exact moment a portfolio needs to make a strong first impression. This file focuses on responsive design, Core Web Vitals, image handling, and basic transport hygiene.

## 2. Best practices

**Rule:** Use responsive design as the default mobile strategy. Serving the same URL and same core content to desktop and mobile is the simplest way to preserve parity. Avoid splitting a personal portfolio across separate mobile URLs unless there is a compelling legacy reason.

**Rule:** Keep mobile and desktop content equivalent. The mobile page should expose the same main text, titles, meta tags, structured data, and critical links as the desktop page. If mobile hides key content, search visibility weakens.

**Rule:** Serve the site over HTTPS and redirect HTTP to HTTPS. Transport security is a baseline trust signal and prevents protocol duplication.

**Recommendation:** Keep Largest Contentful Paint (LCP) under 2.5 seconds, Interaction to Next Paint (INP) under 200 milliseconds, and Cumulative Layout Shift (CLS) under 0.1 on the pages that matter most. The homepage, About page, Projects hub, and project-detail pages should load and respond quickly enough to feel immediate on ordinary devices and connections.

**Rule:** Define explicit width and height dimensions for all images and videos to prevent Cumulative Layout Shift (CLS). Portfolios fail CLS checks most often because images load late and push the surrounding text down. Explicit dimensions allow the browser to reserve the exact space needed before the asset finishes loading.

**Rule:** Use `font-display: swap` for all custom web fonts. Custom fonts must not delay the rendering of the main heading or the first paragraph (Flash of Invisible Text). Using `font-display: swap` ensures the browser immediately paints a fallback font and swaps it once the custom font is ready.

**Recommendation:** Compress and size media intentionally. Portfolio sites often fail because screenshots, animated backgrounds, and hero video dominate the first load. Resize media to its real display size, choose appropriate formats, and defer non-critical assets.

**Recommendation:** Use descriptive image filenames and meaningful alt text. Images can surface the site in visual search features and also reinforce page meaning. Keep images near relevant text and describe them accurately.

**Rule:** Do not let ornamental effects dominate the critical path. Custom fonts, scroll effects, parallax systems, and autoplay media should not delay the main heading, the first paragraph, or the primary project proof.

## 3. Examples

Good example:

```html
<!-- CORRECT: stable image dimensions and meaningful alt text -->
<img
  src="/images/vitaecontext-homepage.webp"
  alt="Screenshot of the VitaeContext documentation homepage"
  width="1280"
  height="720"
  loading="lazy"
/>
```

Bad example:

```html
<!-- WRONG: generic filename, no alt text, no intrinsic dimensions -->
<img src="/images/final-final-1.png" />
```

## 4. Anti-Patterns

### The animation-first portfolio

**What it looks like:** The homepage opens with a full-screen animation, large web fonts, multiple video loops, and a heavy JavaScript timeline before any useful text appears. **Why it fails:** Load performance drops, mobile usability degrades, and the page spends its budget on decoration instead of clarity. **What to do instead:** Render the main heading, value proposition, and navigation first. Add motion only after the page is already fast and stable.

---

*Next step: strengthen content quality in [Content and case studies](./content-and-case-studies.md).*
