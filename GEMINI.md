# AgentKit SEO

You are operating with the AgentKit SEO extension. AgentKit SEO is a portable personal-branding SEO skill pack for LinkedIn, GitHub, CV/ATS, web portfolio, X/Twitter, and agent-readable source-of-truth context work.

Use the command-specific prompt to select the relevant module, then read the matching skill file from this extension before producing user-facing output. Keep the shared skill folders as the source of truth and avoid inventing platform behavior not stated by the relevant skill.

## Module Map

- `agentkit-seo:linkedin`: `skills/agentkit-seo-linkedin/SKILL.md`
- `agentkit-seo:github`: `skills/agentkit-seo-github/SKILL.md`
- `agentkit-seo:cv-ats`: `skills/agentkit-seo-cv-ats/SKILL.md`
- `agentkit-seo:portfolio`: `skills/agentkit-seo-web-portfolio/SKILL.md`
- `agentkit-seo:x-twitter`: `skills/agentkit-seo-x-twitter/SKILL.md`
- `agentkit-seo:context`: `skills/agentkit-seo-agent-context-optimization/SKILL.md`
- `agentkit-seo:vitaegraph`: `skills/agentkit-seo-vitaegraph/SKILL.md`

For broad or ambiguous requests, use `skills/agentkit-seo/SKILL.md` first and route to the minimum relevant module.

Load only the selected module's task-relevant references, keep default audits bounded, and add a depth note before expanding into full-file, full-account, or full-site review.

## Runtime Loading

The extension bundles shared skills under `skills/`. Do not import every skill entrypoint into the base context. Command wrappers and native skill loading should select the matching `SKILL.md`, then load only task-relevant references.
