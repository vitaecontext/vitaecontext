---
description: Audit or improve a CV for ATS-safe personal branding SEO
---

Use the `vitaecontext-cv` skill before producing output.

Treat `$ARGUMENTS` as the user's CV path, job description path, target role, or rewrite instruction. Preserve factual accuracy, keep claims grounded in provided source material, and report any missing inputs before inventing details.

Default to the narrowest useful pass. For full audits, state scope and materials used; do not add or verify claims outside supplied or explicitly requested sources. Include a depth note only when the pass is broad, bounded, or parser-focused.

If the user supplies both an editable source file and a PDF, use the editable source for content review and the PDF only for render or extraction sanity checks unless PDF debugging is requested. If a large context file is supplied, verify only CV-relevant hard anchors first and offer deeper reconciliation as a next step.
