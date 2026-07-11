# Maintaining VitaeContext

This file is for maintainers, contributors, and pull request authors who touch knowledge, sources, skills, wiki entries, or generated LLM-facing files.

## Maintainer docs

- [.assets/docs/architecture-map.md](./.assets/docs/architecture-map.md) maps repository layers, ownership, and validation paths.
- [.assets/docs/STYLEGUIDE.md](./.assets/docs/STYLEGUIDE.md) defines Markdown, skill, wiki, provider-note, template, and example conventions.
- [.assets/docs/current-status.md](./.assets/docs/current-status.md) records what is live, automated, and still open.
- [.assets/docs/project.md](./.assets/docs/project.md) keeps the project architecture narrative and operating model.

## What to update when platform behavior changes

Always update from source evidence outward:

```text
hub/<module>/sources.md
hub/<module>/README.md or playbook content
.skills/agent-skill/vitaecontext-<module>/wiki/knowledge.md
.skills/agent-skill/vitaecontext-<module>/SKILL.md, only if routing changes
llms-full.txt regeneration
npm run validate
```

Use this module map:

| Surface | Source file | Human docs | Runtime wiki | Runtime skill |
|---|---|---|---|---|
| Context Builder | [hub/context-builder/sources.md](./hub/context-builder/sources.md) | `hub/context-builder/README.md`, module playbooks, templates | [.skills/agent-skill/vitaecontext-build/wiki/knowledge.md](./.skills/agent-skill/vitaecontext-build/wiki/knowledge.md) | `.skills/agent-skill/vitaecontext-build/SKILL.md` |
| CV and ATS | [hub/cv-ats/sources.md](./hub/cv-ats/sources.md) | `hub/cv-ats/README.md`, module playbooks, templates | [.skills/agent-skill/vitaecontext-cv/wiki/knowledge.md](./.skills/agent-skill/vitaecontext-cv/wiki/knowledge.md) | `.skills/agent-skill/vitaecontext-cv/SKILL.md` |
| GitHub | [hub/github/sources.md](./hub/github/sources.md) | `hub/github/README.md`, module playbooks | [.skills/agent-skill/vitaecontext-github/wiki/knowledge.md](./.skills/agent-skill/vitaecontext-github/wiki/knowledge.md) | `.skills/agent-skill/vitaecontext-github/SKILL.md` |
| LinkedIn | [hub/linkedin/sources.md](./hub/linkedin/sources.md) | `hub/linkedin/README.md`, module playbooks | [.skills/agent-skill/vitaecontext-linkedin/wiki/knowledge.md](./.skills/agent-skill/vitaecontext-linkedin/wiki/knowledge.md) | `.skills/agent-skill/vitaecontext-linkedin/SKILL.md` |
| Web portfolio | [hub/web-portfolio/sources.md](./hub/web-portfolio/sources.md) | `hub/web-portfolio/README.md`, module playbooks | [.skills/agent-skill/vitaecontext-portfolio/wiki/knowledge.md](./.skills/agent-skill/vitaecontext-portfolio/wiki/knowledge.md) | `.skills/agent-skill/vitaecontext-portfolio/SKILL.md` |
| X/Twitter | [hub/x-twitter/sources.md](./hub/x-twitter/sources.md) | `hub/x-twitter/README.md`, module playbooks | [.skills/agent-skill/vitaecontext-x/wiki/knowledge.md](./.skills/agent-skill/vitaecontext-x/wiki/knowledge.md) | `.skills/agent-skill/vitaecontext-x/SKILL.md` |

After runtime wiki changes, mirror generated provider files through the export CLI. Do not hand-edit generated mirrors.

## What to update when a new skill or module is added

Create or update these files in order:

1. Add `hub/<module>/README.md`, `hub/<module>/sources.md`, and any human playbooks or templates.
2. Add `.skills/agent-skill/vitaecontext-<module>/SKILL.md`.
3. Add `.skills/agent-skill/vitaecontext-<module>/references/` for runtime procedures.
4. Add `.skills/agent-skill/vitaecontext-<module>/wiki/index.md` and `wiki/knowledge.md`.
5. Add a `## Wiki context` section to the module `SKILL.md`.
6. Add the module to `.skills/export/export-config.json` and provider adapter manifests or wrappers when required.
7. Regenerate provider mirrors, including `skills/` and `commands/`, through the export CLI.
8. Update `llms.txt`.
9. Regenerate `llms-full.txt`.
10. Update the README modules table.
11. Update `CHANGELOG.md`.
12. Run `npm run validate`.
13. Run an export smoke test when provider packaging changed.

## What to update when wiki knowledge needs refreshing

For agent-assisted refreshes, invoke the vitaecontext-wiki-maintenance skill in your coding agent from a local repo clone. The skill implements this manual process as an agentic workflow: it discovers and fetches official sources, diffs them against current wiki claims, proposes confidence-labeled patches with source justification for every change, flags downstream skill or hub files that need separate updates, and regenerates llms-full.txt after you confirm. Use Mode 1 for a single module, Mode 2 for a full cross-module audit, Mode 3 for a source-only check, and Mode 4 for an internal routing, portability, or VitaeGraph contract audit grounded in repository code and schemas.

1. Read the module's `hub/<module>/sources.md`.
2. Search for newer or missing official sources for the same surface.
3. Refetch the official sources listed there and any newly discovered official sources that meet the source-quality rules below.
4. Add, remove, or downgrade sources that no longer meet the source-quality rules below.
5. Diff the official source behavior against `.skills/agent-skill/vitaecontext-<module>/wiki/knowledge.md`.
6. Update only claims that changed or need clearer confidence labels.
7. Flag related hub playbooks, runtime references, module `SKILL.md`, `wiki/index.md`, README, or CHANGELOG changes that should be handled in a separate edit.
8. Set `last_reviewed` to the review date.
9. Set `review_by` from the wiki confidence contract: `stable` after 6 months, `likely` after 3 months, `inferred` or `disputed` after 1 month.
10. Regenerate `llms-full.txt`.
11. Run `npm run validate`.

Do not upgrade an inferred claim to stable because it is common advice. Upgrade only when an acceptable source explicitly supports the behavior.

## Source quality rules

Use this inclusion bar for `hub/<module>/sources.md`:

| Confidence | Acceptable source | Rule |
|---|---|---|
| `stable` | Official platform documentation, official help-center pages describing system behavior, official engineering or product blogs, published specs, RFC-style documents, or official maintainer-published repositories | The source directly supports the claim and is unlikely to change quickly. |
| `likely` | Official sources that describe current behavior but depend on product tiers, UI state, geography, rollout status, undocumented implementation details, or provider-specific support | The source is authoritative, but the claim may change or may not apply everywhere. |
| `inferred` | Official source code snapshots, architecture writeups, discontinued/historical official material, or repo-owned methodology where no external platform source exists | The source supports a directional interpretation, not a current product guarantee. |
| `disputed` | Conflicting official sources, unsupported public narratives, secondary commentary, or behavior where no clean official source exists | Keep the claim out of stable guidance until better evidence exists. |

Do not use these as `stable` sources:

- Third-party SEO blogs
- LinkedIn influencer posts
- Medium articles
- Reddit threads
- Community speculation
- Agency experiments
- Vendor posts that describe observed behavior without official platform backing
- Login-gated pages that reviewers cannot inspect

If a source is useful but does not meet the inclusion bar, either omit it from `sources.md` or mention it in a "removed or downgraded" note with `inferred` or `disputed` handling.

## Files never edited directly

Do not edit these by hand:

- `skills/` Gemini mirror files. They are generated by the export CLI.
- `commands/` Gemini command wrappers. They are generated by the export CLI.
- `llms-full.txt`. It is generated from root and module wiki files.

Provider adapter folders under `.skills/providers/` are thin wrappers. Put methodology changes in `hub/` and `.skills/agent-skill/`, not in provider adapter notes.

## Version files to bump on release

When cutting a release, set the new version in `package.json`, then keep these in sync (`vitaecontext doctor` fails the build if any drift):

- `package.json` - the source of truth.
- `.claude-plugin/plugin.json` and the plugin entry in `.claude-plugin/marketplace.json` - bump by hand.
- Root `gemini-extension.json` and the two provider `gemini-extension.json` files - regenerated with the correct version when you re-run the export CLI to refresh the Gemini mirror, so regenerate the mirror after the bump.

## Pull request checklist

Before opening a PR that touches knowledge, skills, wiki entries, or sources:

- Read `.assets/docs/architecture-map.md` — covers how hub/, .skills/, provider adapters, and generated mirrors relate to each other.
- Read `.assets/docs/STYLEGUIDE.md` — covers tone, formatting, and claim-labeling conventions for all knowledge and skill files.
- Read [.skills/architecture.md](./.skills/architecture.md) — covers the runtime skill folder structure and export conventions.
- Update `hub/<module>/sources.md` before changing claims in hub playbooks or runtime wiki files.
- Keep official sources separate from inference and disputed public narratives.
- Add or update wiki metadata, confidence labels, `last_reviewed`, and `review_by`.
- Update `SKILL.md` only when routing, loading, or workflow behavior changes.
- Regenerate `llms-full.txt` after wiki changes.
- Regenerate provider mirrors through the export CLI when runtime skills change.
- Update README and CHANGELOG for user-visible behavior changes.
- Run `npm run validate`.
- Run `node .skills/export/scripts/vitaecontext.mjs export --provider all --output /tmp/vitaecontext-export --force` when provider packaging or mirrored files changed.
- Run `npm pack --dry-run` when package contents changed.
