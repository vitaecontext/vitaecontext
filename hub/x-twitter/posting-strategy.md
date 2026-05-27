<!--
metadata:
  title: "X posting strategy and formats"
  platform: "x-twitter"
  objective: "Evidence-aligned guidelines for formatting posts, media, and Alt Text to maximize readability, accessibility, and discoverability."
  status: "review"
  last_updated: "2026-05-27"
  tags: ["posting", "media", "alt-text", "seo"]
  agent_priority: "high"
-->

# X posting strategy and formats

> This file defines how an individual post should be formatted to capture search intent, increase readability, and improve accessibility.

---

## 1. Overview

Content formatting influences how quickly users understand and engage with a post. Current X documentation supports general claims about recommendation signals, filtering, search categories, media, and post limits. Historical ranking snapshots can inform architecture priors, but exact live thresholds are not guaranteed.

## 2. Rules

### 2.1 Opening-hook heuristic ("First 50")

There is no official public rule proving a deterministic "first 50 characters" ranking factor.

**Recommendation:** Place the primary keyword or strongest hook at the start of the post (often within the first ~50 characters) to improve scannability and intent matching.

### 2.2 Alt Text and AI visibility

Visuals are critical, but AI models and accessibility tools need text context to interpret images reliably.

**Rule:** Add descriptive Alt Text to every image or GIF when possible. **Recommendation:** Write Alt Text for accessibility first, then include relevant keywords naturally when accurate to the visual.

### 2.3 Media enrichment and Video

Native media often improves engagement compared to text-only posts.

**Recommendation:** Prioritize native video and image formats that are easy to consume on mobile. **Recommendation:** No official source currently documents a universal reach multiplier for a specific video duration range. Test duration and format against your own audience metrics.

### 2.4 Thread structuring for dwell time

Threads can increase reading time and create more reply opportunities when the topic needs depth. They are a format choice, not a universal ranking requirement.

**Recommendation:** Start with 4-8 posts when a topic needs depth, then adjust based on completion and engagement data. **Rule:** Use line breaks every 1-2 sentences for mobile readability.

## 3. Examples

### Optimizing Alt Text for SEO

Good example (Alt Text for a chart):
```text
A line graph showing the 300% increase in organic traffic for a SaaS website over 6 months after implementing programmatic SEO and fixing core web vitals.
```
*Why this is good:* It accurately describes the image for accessibility while preserving clear topic keywords ("organic traffic", "SaaS", "programmatic SEO").

Bad example (Alt Text for a chart):
```text
Screenshot 2026-04-24
```
*Why it fails:* It provides zero context to the AI or search engines, resulting in lost ranking potential.

## 4. Anti-Patterns

### Main-body external links

**What it looks like:** Writing a short hook and immediately pasting a YouTube or Substack link. **Why it can fail:** A link-first post with low native value often gets weaker engagement. A universal platform-level link penalty is not publicly documented as a hard rule. **What to do instead:** Write a comprehensive, zero-click post or thread that delivers the core value natively. Place the external link in the first reply.

### High-frequency burst posting

**What it looks like:** Publishing 4 separate posts within a 10-minute window to "flood the feed." **Why it can fail:** Historical architecture material and current filtering guidance support the general idea that feeds avoid repetitive or low-quality sessions, but no public threshold defines burst suppression. **What to do instead:** Space out individual posts, or combine related thoughts into a single formatted thread when the topic needs depth.

---

*Next step: Build the reply loop in [Engagement and growth](./engagement-and-growth.md).*
