# Web portfolio audit score

## Purpose and limits

This rubric turns a portfolio audit into a single triage number so the user can see where to spend effort first. It is an internal prioritization heuristic, not a search-engine score, a ranking prediction, or an indexing guarantee. Search and AI systems do not publish a site score; categories and weights below reflect this skill's documented SEO, structured-data, and AI-readability guidance, not any platform's internal metric.

Use it only when the user asks for a score, a scorecard, or a before/after comparison. Otherwise the standard audit output is enough.

Rules:

- Score only categories you actually inspected or could fetch. Mark uninspected categories as `Needs inspection` and exclude them from the total, then rescale the remaining weights to 100.
- Keep every category score tied to observed evidence from the live site or local source.
- Never present the number as a ranking, traffic, or AI-citation guarantee.

## Categories and weights

| Category | Weight | What it measures | Reference |
| --- | --- | --- | --- |
| Indexability and architecture | 20 | crawlability, sitemap, robots, canonical tags, and URL structure | [indexing-and-architecture.md](indexing-and-architecture.md) |
| Metadata and snippets | 15 | titles, meta descriptions, and snippet quality | [metadata-structured-data-and-js.md](metadata-structured-data-and-js.md) |
| Structured data | 15 | valid, accurate schema for the page types present | [metadata-structured-data-and-js.md](metadata-structured-data-and-js.md) |
| Content and proof | 20 | clear case studies, useful copy, and proof links | [content-performance-and-aeo.md](content-performance-and-aeo.md) |
| Performance and mobile | 15 | load behavior and mobile rendering | [content-performance-and-aeo.md](content-performance-and-aeo.md) |
| AI readability and AEO | 15 | clean text, `llms.txt`, and answer-engine readability | [content-performance-and-aeo.md](content-performance-and-aeo.md) |

If a page type is absent (for example, no article pages), exclude its checks and rescale the remaining weights to 100.

## Scoring each category

Assign one anchored completion rate to each inspected category using the linked checklist:

- `0`: absent, unusable, or blocked by a critical failure
- `25`: weak foundation with most important checks failing
- `50`: partially implemented, with material gaps
- `75`: strong implementation with limited, non-blocking gaps
- `100`: all applicable inspected checks pass with supporting evidence

Use intermediate multiples of 10 only when the evidence clearly falls between anchors. Convert the rate to awarded points with `category weight x completion rate / 100`, then round the overall total to a whole number. Do not use false precision below 10-point completion-rate increments.

## Bands

- 85 to 100: `Excellent` - crawlable, structured, fast, and AI-readable.
- 70 to 84: `Good` - solid with a few targeted fixes.
- 50 to 69: `Foundation` - the site works but key signals are missing.
- Below 50: `Critical` - indexing or content problems limit discovery.

## Output

When a score is requested, return:

1. overall score and band
2. per-category breakdown: `score / weight` plus one evidence-backed reason
3. `Fix first`: categories ranked by unearned weighted points (`category weight - awarded points`), with critical blockers ahead of cosmetic gaps
4. `Informational`: diagnostic observations that did not affect the score
5. a one-line confidence note and a `Depth note` listing any categories marked `Needs inspection`

Keep the breakdown compact. The score exists to rank actions, so always pair it with the specific changes from the rest of this skill.
