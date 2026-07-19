# Fictional end-to-end Career Context demo

This reproducible demo shows the central VitaeContext workflow without publishing a real person's career data.

## Inputs

- [fictional source material](../../hub/context-builder/examples/alex-morgan-fictional-source-material.txt)
- [finished fictional Career Context](../../hub/context-builder/examples/alex-morgan-fictional-career-context.md)
- [bounded fictional GitHub brief](../../hub/context-builder/examples/alex-morgan-fictional-github-brief.md)

The source material intentionally contains one conflicting internship start month. A correct agent keeps that field in `Needs evidence` until the user identifies the superseding source. The finished example represents the fictional user's resolution.

## Five-minute path

Initialize a private starter:

```bash
npx vitaecontext context init --output ~/.vitaecontext/alex-morgan-career-context.md
```

Ask the installed build skill to reconcile the fictional source material into the starter. The agent should return a compact source ledger, preserve the conflict, and avoid inventing production metrics.

Validate the finished public fixture:

```bash
npx vitaecontext context validate hub/context-builder/examples/alex-morgan-fictional-career-context.md
```

Create the smallest GitHub packet:

```bash
npx vitaecontext context summary hub/context-builder/examples/alex-morgan-fictional-career-context.md --for github --output /tmp/alex-github-context.md
```

Then ask `vitaecontext-github` for an audit using the packet and an exact public profile or repository URL. The fictional brief demonstrates the expected evidence boundary before any live profile inspection.

## Acceptance criteria

- Validation succeeds only after placeholders are removed and the required structure is present.
- The internship conflict is not silently normalized.
- Platform engineering remains a stated direction, not completed employment.
- QueueWatch does not acquire invented production usage or impact metrics.
- The bounded packet excludes unrelated language and certification sections for the GitHub task.
- Any proposed public statement maps to supplied context, inspected public material, or an explicit inference label.
