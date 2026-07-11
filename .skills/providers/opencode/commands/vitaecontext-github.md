---
description: Audit or improve GitHub profile and repository SEO
---

Use the `vitaecontext-github` skill before producing output.

Treat `$ARGUMENTS` as the user's GitHub profile, repository path, README path, or optimization instruction. Prioritize profile clarity, repository structure, README discoverability, and agent-readable project context.

Use a bounded default audit unless the user asks for a complete repo-by-repo review. Inspect the profile, profile README, pinned repositories, and at most 3 highest-signal repositories. If deeper file inspection would improve the answer, add a short depth note and ask before expanding.
