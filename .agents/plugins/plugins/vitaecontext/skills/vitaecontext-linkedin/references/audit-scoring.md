# LinkedIn audit score

## Purpose and limits

This rubric turns a LinkedIn audit into a single triage number so the user can see where to spend effort first. It is an internal prioritization heuristic, not a LinkedIn metric, a ranking prediction, or a guarantee. LinkedIn does not publish a profile score, and its ranking systems are partly disputed; categories and weights below reflect this skill's documented guidance, not any internal LinkedIn system.

Use it only when the user asks for a score, a scorecard, or a before/after comparison. Otherwise the standard audit output is enough.

Rules:

- Score only categories you actually inspected. Mark uninspected categories as `Needs inspection` and exclude them from the total, then rescale the remaining weights to 100.
- Keep every category score tied to observed evidence, using the same evidence and confidence labels as the rest of this skill.
- Never present the number as a LinkedIn ranking, reach, or visibility guarantee.

## Categories and weights

| Category | Weight | What it measures | Reference |
| --- | --- | --- | --- |
| Headline | 20 | role clarity, keywords, and positioning in the headline | [positioning-and-structure.md](positioning-and-structure.md) |
| About section | 20 | first-person narrative, proof, and readable structure | [positioning-and-structure.md](positioning-and-structure.md) |
| Experience, skills, and featured proof | 20 | aligned experience entries, relevant skills, and proof-of-work | [section-recipes.md](section-recipes.md) |
| Discoverability and activity | 15 | searchable terms and documented activity signals | [discoverability-and-activity.md](discoverability-and-activity.md) |
| Profile architecture and settings | 10 | custom URL, badges, location, and completeness | [profile-audit-and-maintenance.md](profile-audit-and-maintenance.md) |
| AI-readable structure and consistency | 15 | clean titles, skill names, and alignment with other surfaces | [profile-audit-and-maintenance.md](profile-audit-and-maintenance.md) |

If a category cannot be inspected (for example, login-gated sections), exclude it and rescale the remaining weights to 100.

## Scoring each category

Assign one anchored completion rate to each inspected category using the linked checklist:

- `0`: absent, unusable, or blocked by a critical failure
- `25`: weak foundation with most important checks failing
- `50`: partially implemented, with material gaps
- `75`: strong implementation with limited, non-blocking gaps
- `100`: all applicable inspected checks pass with supporting evidence

Use intermediate multiples of 10 only when the evidence clearly falls between anchors. Convert the rate to awarded points with `category weight x completion rate / 100`, then round the overall total to a whole number. Do not use false precision below 10-point completion-rate increments.

## Bands

- 85 to 100: `Excellent` - clear, evidence-backed, dual-audience profile.
- 70 to 84: `Good` - solid with a few targeted fixes.
- 50 to 69: `Foundation` - the basics exist but key sections are generic.
- Below 50: `Critical` - the profile does not yet communicate the user's value.

## Output

When a score is requested, return:

1. overall score and band
2. per-category breakdown: `score / weight` plus one evidence-backed reason
3. `Fix first`: categories ranked by unearned weighted points (`category weight - awarded points`), with critical blockers ahead of cosmetic gaps
4. `Informational`: diagnostic observations that did not affect the score, including any ranking-dependent advice labeled by confidence
5. a one-line confidence note and a `Depth note` listing any categories marked `Needs inspection`

Keep the breakdown compact. The score exists to rank actions, so always pair it with the specific rewrites from the rest of this skill.
