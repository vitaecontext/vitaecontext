---
description: Build or maintain a Career Context file
---

Use the `vitaecontext-build` skill before producing output.

Treat `$ARGUMENTS` as the user's context source, target file, or instruction. Prefer an explicit path supplied by the user. If no path is supplied, ask whether to use a workspace draft, a named portable default such as `~/.vitaecontext/<name-surname>-career-context.md`, or the generic `~/.vitaecontext/context.md` only by user preference. Do not scan the whole filesystem. Use bounded source ingestion and add a depth note before expanding to full reconciliation.
