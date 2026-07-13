# Contributing to VitaeContext

Thanks for considering a contribution. VitaeContext is open to improvements across the project: bug fixes, documentation, skill and provider work, new useful capabilities, and well-scoped ideas. Maintainers welcome pull requests and will review contributions that fit the project’s private, reusable Career Context model.

## Ways to contribute

- Report reproducible bugs through the [bug report template](https://github.com/vitaecontext/vitaecontext/issues/new?template=bug_report.md).
- Suggest a feature through the [feature request template](https://github.com/vitaecontext/vitaecontext/issues/new?template=feature_request.md).
- Start a [GitHub Discussion](https://github.com/vitaecontext/vitaecontext/discussions) to explore an idea, ask a question, or get early feedback on a larger change.
- Improve documentation, examples, source references, tests, skills, provider adapters, or the CLI.
- Open a pull request for a focused improvement. Small fixes do not need prior discussion.

For a feature that changes the public workflow, adds a module, changes provider behavior, or needs substantial design work, open an issue or discussion first. It helps establish scope before implementation.

## Development setup

The validation workflow uses Node.js 22. Clone your fork, create a branch, and run the relevant checks:

```bash
git clone https://github.com/<your-account>/vitaecontext.git
cd vitaecontext
git checkout -b improve-short-description

npm test
npm run validate
```

If changing the AgentKit SEO compatibility package, install and test its dependencies too:

```bash
cd packages/agentkit-seo-compat
npm ci --ignore-scripts
npm test
```

## Read the project map first

Before editing, read [AGENTS.md](./AGENTS.md). It links to the repository rules and identifies the source-of-truth layer for each kind of change. Most contributions should also use these references:

- [Architecture map](./.assets/docs/architecture-map.md) for repository ownership and validation paths.
- [Style guide](./.assets/docs/STYLEGUIDE.md) before editing Markdown, examples, templates, sources, or skills.
- [Skill architecture](./.skills/architecture.md) before changing runtime skills, provider adapters, export behavior, or installation behavior.
- [Maintaining VitaeContext](./MAINTAINING.md) for detailed knowledge, wiki, source, and generated-file workflows.

Keep edits in their canonical layer. For example, runtime skill behavior belongs under `.skills/agent-skill/`, provider folders are thin adapters, and public methodology belongs under `hub/`.

Do not commit private Career Context files, user career material, exports, screenshots, or generated install output. Do not hand-edit the generated `skills/`, `commands/`, or `llms-full.txt` files; use the documented generation flow instead.

## Pull requests

Keep pull requests focused and explain both the user problem and the proposed change. Include:

- A concise summary of what changed and why.
- Linked issue or discussion when one exists.
- Tests or validation commands run, including their result.
- Documentation, source, generated-artifact, or changelog updates required by the change.
- Any user-facing behavior, compatibility, or privacy implications.

Use clear, factual language. Do not add unsupported claims about outcomes, rankings, recruiter attention, ATS scores, provider support, or privacy guarantees. For changing platform knowledge, start from official sources and distinguish documented facts from inference, as described in the style guide and maintainer documentation.

Maintainers review contributions for usefulness, factual accuracy, scope, tests, and alignment with the project architecture. Feedback or requested changes are a normal part of review.

## Validation

Run the smallest relevant check for the files you change. At minimum, run:

```bash
npm test
npm run validate
```

Also run these when applicable:

```bash
# Provider packaging, runtime skills, or generated mirrors
node .skills/export/scripts/vitaecontext.mjs export --provider all --output /tmp/vitaecontext-export --force

# Package contents
npm pack --dry-run
```

The pull-request workflow runs the full package validation suite on pull requests to `main`.

## Security issues

Do not open a public issue for a suspected vulnerability. Follow the reporting guidance in [SECURITY.md](./SECURITY.md) instead.
