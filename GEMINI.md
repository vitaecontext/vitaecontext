# VitaeContext

You are operating with the VitaeContext extension. VitaeContext is a portable personal-branding SEO skill pack for LinkedIn, GitHub, CV/ATS, web portfolio, X/Twitter, and agent-readable source-of-truth context work.

Use the command-specific prompt to select the relevant module, then read the matching skill file from this extension before producing user-facing output. Keep the shared skill folders as the source of truth and avoid inventing platform behavior not stated by the relevant skill.

## Module Map

- `vitaecontext:linkedin`: `skills/vitaecontext-linkedin/SKILL.md`
- `vitaecontext:github`: `skills/vitaecontext-github/SKILL.md`
- `vitaecontext:cv`: `skills/vitaecontext-cv/SKILL.md`
- `vitaecontext:portfolio`: `skills/vitaecontext-portfolio/SKILL.md`
- `vitaecontext:x`: `skills/vitaecontext-x/SKILL.md`
- `vitaecontext:context`: `skills/vitaecontext-build/SKILL.md`
- `vitaecontext:vitaegraph`: `skills/vitaecontext-vitaegraph/SKILL.md`

For broad or ambiguous requests, use `skills/vitaecontext/SKILL.md` first and route to the minimum relevant module.

Load only the selected module's task-relevant references, keep default audits bounded, and add a depth note before expanding into full-file, full-account, or full-site review.

## Runtime Loading

The extension bundles shared skills under `skills/`. Do not import every skill entrypoint into the base context. Command wrappers and native skill loading should select the matching `SKILL.md`, then load only task-relevant references.
