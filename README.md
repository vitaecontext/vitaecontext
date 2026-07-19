<p align="center">
  <img src="https://raw.githubusercontent.com/vitaecontext/vitaecontext/main/.assets/image/banners/vitaecontext/vitaecontext-light.png" alt="VitaeContext — Keep your career context. Reuse it across AI." width="90%" />
</p>

<p align="center">
  <strong>Keep your career context. Reuse it across AI.</strong>
</p>

<p align="center">VitaeContext gives AI agents a private, reusable source of truth about a person's career, then provides focused skills for turning that context into grounded professional work.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vitaecontext"><img src="https://img.shields.io/npm/v/vitaecontext?style=flat-square&logo=npm&color=CB3837" alt="npm version" /></a>
  <a href="#modules"><img src="https://img.shields.io/badge/agent_skills-8-2563EB?style=flat-square" alt="8 agent skills" /></a>
  <a href="https://github.com/vitaecontext/vitaecontext/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/vitaecontext/vitaecontext/validate.yml?branch=main&style=flat-square&logo=githubactions&logoColor=white&label=build" alt="build status" /></a>
  <a href="https://github.com/vitaecontext/vitaecontext/stargazers"><img src="https://img.shields.io/github/stars/vitaecontext/vitaecontext?style=flat-square&logo=github&label=stars" alt="GitHub stars" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/github/license/vitaecontext/vitaecontext?style=flat-square&label=license" alt="MIT license" /></a>
  <img src="https://img.shields.io/badge/formerly-AgentKit_SEO-1F684B?style=flat-square&labelColor=123C2D" alt="formerly AgentKit SEO" />
</p>

<p align="center">
  <a href="#why-vitaecontext">Why</a> •
  <a href="#how-it-works">How it works</a> •
  <a href="#quick-start">Quick start</a> •
  <a href="#set-up-with-an-agent">Agent setup</a> •
  <a href="#vitaegraph">VitaeGraph</a> •
  <a href="#modules">Modules</a> •
  <a href="#install">Install</a> •
  <a href="#documentation">Documentation</a> •
  <a href="https://vitaecontext.github.io/">Website</a>
</p>

---

## Why VitaeContext

> Formerly AgentKit SEO. The project grew beyond profile SEO into reusable career context for grounded AI work. The deprecated `agentkit-seo` command remains available as a compatibility alias and forwards to the VitaeContext CLI.

Every new AI chat starts with the same problem: the agent does not know which career facts are current, which claims have evidence, what role is being targeted, or how the output should change for each platform.

The usual result is repeated explanation, inconsistent profiles, generic writing, and occasionally invented claims.

VitaeContext applies the familiar `AGENTS.md` and `CLAUDE.md` pattern to professional identity. Its Context Builder skill turns a user's raw career material into a private Markdown source of truth called a **Career Context file**. Focused skills then adapt that file for LinkedIn, GitHub, CV/ATS, web portfolios, and X/Twitter.

The goal is simple:

- Explain professional context once instead of rebuilding it in every chat.
- Keep facts, goals, constraints, proof links, and claims to avoid in one reusable file.
- Adapt the same evidence to each platform without turning positioning into invention.
- Reuse the workflow across supported AI coding agents.

### The context layer before career automation

Many tools can draft a CV, tailor an application, write a message, or automate a career workflow. Those tools can only work from the career information they receive. When that input is scattered, stale, incomplete, or overstated, the same problems travel through the rest of the workflow.

VitaeContext sits one logical layer before those systems. It helps create and maintain the private, evidence-bounded Career Context file that an agent, CV builder, application workflow, or other career tool can use as its starting point. VitaeContext is provider- and system-agnostic: it does not require a particular AI provider or downstream automation product. The file stays portable so it can be supplied wherever precise career context is needed.

## How it works

<p align="center">
  <img src="https://raw.githubusercontent.com/vitaecontext/vitaecontext/main/.assets/image/public-visuals/vitaecontext/basic-workflow.png" alt="VitaeContext workflow: scattered career material becomes a Career Context file, passes through VitaeContext platform skills, and produces grounded professional outputs" width="100%" />
</p>

1. **Gather the raw material.** Start with CVs, profile sections, GitHub and portfolio links, exports, screenshots, and project notes.
2. **Create the Career Context file with VitaeContext.** Give the raw material to an AI agent and invoke `vitaecontext-build`. The skill guides the agent in organizing the material into one private Markdown file containing verified facts, stated goals, constraints, proof links, and evidence boundaries.
3. **Load one focused skill.** Use the LinkedIn, GitHub, CV/ATS, web portfolio, or X/Twitter module for the surface being improved.
4. **Produce grounded work.** Get an audit, rewrite, patch proposal, or action plan based on the supplied context and platform guidance.

The Career Context file supplies facts and direction. Platform skills supply formatting, discoverability guidance, and channel-specific constraints. They do not become a second source of truth.

### Use it in any AI conversation

<p align="center">
  <img src="https://raw.githubusercontent.com/vitaecontext/vitaecontext/main/.assets/image/public-visuals/vitaecontext/workflow-use-case.png" alt="A career task is completed by attaching a Career Context file to any AI chat or agent and asking for a grounded draft" width="100%" />
</p>

The Career Context file is not limited to VitaeContext modules. Attach it to any AI chat, agent, or career system that accepts supplied context, then describe the current task. It can ground application answers, professional messages, emails, interview preparation, and other career-related drafts without requiring the same background to be explained again.

### Why grounding matters

Repeated rewriting can make copy sound more confident while moving it farther from the available evidence. VitaeContext instructs agents to preserve supported claims, separate goals from verified experience, and flag missing evidence before stronger positioning is used.

It does not promise automatic fact-checking or guaranteed platform results. It provides the context structure, evidence rules, current platform knowledge, and self-review workflow agents need to produce more consistent work.

## Quick start

### Set up with an agent

Copy this prompt into your agent. GitHub adds a copy control to the prompt block.

```text
Set up VitaeContext for this agent environment.

- Read https://vitaecontext.github.io/docs/installation/ and https://vitaecontext.github.io/providers/ first. Identify the matching provider and its invocation format.
- Run `npx vitaecontext install --provider <matching-provider>`. Do not use `--force` or change install locations unless I approve it.
- Verify the installation with `npx vitaecontext doctor`, then tell me which skills are available and how to invoke them here.
- Ask me for a private file path, initialize it with `npx vitaecontext context init --output <private-path>`, and explain that validation will fail until its placeholders are replaced.
- Read https://vitaecontext.github.io/docs/usage/ and propose three practical next steps. Start with building the context from career material I choose to share, then suggest one focused skill for my immediate goal. Do not upload or share my files without asking.
```

Install the skills for an agent provider:

```bash
npx vitaecontext install --provider codex
```

Initialize a minimal Career Context file in a private location:

```bash
npx vitaecontext context init --output ~/.vitaecontext/name-surname-career-context.md
```

Ask an agent to build the context from trusted material:

```text
Use vitaecontext-build to create my Career Context file.
I can provide my CV, LinkedIn sections, GitHub URL, portfolio URL, project notes,
screenshots, or other career material.
```

Then use one platform skill:

```text
Use vitaecontext-github to audit my GitHub profile for hiring visibility.
Use my Career Context file at ~/.vitaecontext/name-surname-career-context.md.
```

Keep the Career Context file private. A portable default location is:

```text
~/.vitaecontext/<name-surname>-career-context.md
```

After filling it, validate the structure and create a bounded task packet:

```bash
npx vitaecontext context validate ~/.vitaecontext/name-surname-career-context.md
npx vitaecontext context summary ~/.vitaecontext/name-surname-career-context.md --for github --output /tmp/github-context.md
```

`context validate --json` emits machine-readable diagnostics. It checks the document contract and internal consistency; it does not authenticate whether a real-world claim is true. The older `template context` command remains available when the longer guided worksheet is preferable.

---

<p align="center">
  <img src="https://raw.githubusercontent.com/vitaecontext/vitaecontext/main/.assets/image/banners/vitaegraph/vitaegraph-banner-light.png" alt="VitaeGraph by VitaeContext" width="80%" />
</p>

## VitaeGraph

[VitaeGraph](./vitaegraph/README.md) is VitaeContext's deeper structured-memory layer, not a separate product. Use the Career Context file for compact, repeated facts and quick grounded drafts. Use VitaeGraph when an agent needs detailed records for projects, roles, degrees, courses, thesis work, certifications, awards, publications, and the relationships between them.

<p align="center">
  <img src="https://raw.githubusercontent.com/vitaecontext/vitaecontext/main/.assets/image/public-visuals/vitaegraph/vitaegraph-diff.png" alt="Comparison between the compact Career Context file for fast facts and VitaeGraph for deep hierarchical records" width="100%" />
</p>

Its root directory is an independently readable product entrypoint containing the format specification, schema, graph model, and canonical templates. The skill inventories supplied material first, then completes domain-specific workflows. Markdown remains canonical; generated JSON files are rebuildable local indexes.

The runtime selects create, deepen, maintain, validate, index, retrieve, or migrate mode before loading node-specific context. Destructive and many-record changes are previewed, stable IDs survive path changes, and `visibility: public` never acts as automatic publication consent.

```text
~/.vitaecontext/
├── <name-surname>-career-context.md
└── vitaegraph/
```

Create and check the default private graph:

```bash
npx vitaecontext graph init
npx vitaecontext graph validate
npx vitaecontext graph index
```

Pass `--root /path/to/custom-vitaegraph` to use that exact directory. Indexing creates deterministic `graph.json`, `search-index.json`, and `diagnostics.json` under `.generated/`. Markdown remains canonical. The CLI does not overwrite a non-empty graph without `--force`, and provider or npm exports never include user workspace data.

---

## Modules

VitaeContext ships one compact-context module, VitaeGraph, and five platform modules, coordinated by the root routing skill.

| Goal | Module | Public playbook |
| --- | --- | --- |
| Build the reusable Career Context layer | [`vitaecontext-build`](./hub/context-builder/README.md) | [Context Builder](https://vitaecontext.github.io/playbooks/context-builder/) |
| Build a detailed local career knowledge graph | [`vitaecontext-vitaegraph`](./.skills/agent-skill/vitaecontext-vitaegraph/SKILL.md) | [VitaeGraph specification and templates](./vitaegraph/README.md) |
| Improve GitHub profile and repository discoverability | [`vitaecontext-github`](./hub/github/README.md) | [GitHub optimization](https://vitaecontext.github.io/playbooks/github/) |
| Improve LinkedIn structure, search visibility, and proof | [`vitaecontext-linkedin`](./hub/linkedin/README.md) | [LinkedIn optimization](https://vitaecontext.github.io/playbooks/linkedin/) |
| Tailor a CV or resume for ATS parsing and recruiter readability | [`vitaecontext-cv`](./hub/cv-ats/README.md) | [CV and ATS optimization](https://vitaecontext.github.io/playbooks/cv-ats/) |
| Improve portfolio crawlability, SEO, and AI readability | [`vitaecontext-portfolio`](./hub/web-portfolio/README.md) | [Web portfolio optimization](https://vitaecontext.github.io/playbooks/web-portfolio/) |
| Improve X/Twitter positioning and posting strategy | [`vitaecontext-x`](./hub/x-twitter/README.md) | [X/Twitter optimization](https://vitaecontext.github.io/playbooks/x-twitter/) |

Typical outputs include prioritized audits, evidence-backed rewrites, ATS-safe CV recommendations, GitHub README and repository fixes, LinkedIn section improvements, portfolio patches, and action plans ranked by impact and missing evidence.

The GitHub skill also includes a tokenless public-profile fetcher. It produces bounded Markdown and JSON reports from the unauthenticated GitHub API, public profile HTML, and raw README files; adds repository evaluation metadata such as topics, default branch, license, and activity timestamps; and reports extraction uncertainty. Reports use a unique temporary directory by default so agent runs do not write into the current repository.

## Who it is for

- Developers preparing for a job search, promotion, or stronger public proof of work.
- Students turning projects into credible portfolio evidence.
- Founders and freelancers aligning their public professional presence.
- Agents that need structured personal context before editing career assets.
- Maintainers who want portable skills across multiple AI coding environments.

## Install

Install one provider at a time:

```bash
npx vitaecontext install --provider codex
```

Supported providers:

| Provider | Default destination | Activation model |
| --- | --- | --- |
| `shared` | Portable `SKILL.md` folders | Manual reuse or packaging |
| `claude-code` | `~/.claude/skills/` | Ask for the installed skill by name |
| `codex` | `~/.agents/skills/` plus `CODEX_HOME/skills` or `~/.codex/skills/` | Use installed skills by name when available |
| `gemini-cli` | `~/.gemini/extensions/vitaecontext/` | Namespaced commands such as `/vitaecontext:linkedin` |
| `antigravity` | `~/.gemini/antigravity-cli/plugins/vitaecontext/` | Gemini-compatible plugin layout |
| `opencode` | `~/.config/opencode/skills/` plus command wrappers | Native skill loading and flat command wrappers |

For Claude Code, the skills are also available through the plugin marketplace:

```text
/plugin marketplace add vitaecontext/vitaecontext
/plugin install vitaecontext@vitaecontext
```

The repository also ships a native Codex plugin marketplace under `.agents/plugins/`. After cloning the repository, add that marketplace and install the plugin:

```bash
codex plugin marketplace add .agents/plugins
codex plugin add vitaecontext@vitaecontext
```

Useful package commands:

```bash
npx vitaecontext version
npx vitaecontext update
npx vitaecontext doctor
npx vitaecontext list providers
npx vitaecontext list skills
npx vitaecontext context init
npx vitaecontext context validate ~/.vitaecontext/career-context.md
npx vitaecontext context summary ~/.vitaecontext/career-context.md --for cv
```

`update` checks the npm registry only when invoked. With `--provider <provider>`, it reads the installed provider manifest and compares the installed skill version:

```bash
npx vitaecontext@latest update --provider codex
```

Remove an install using the same provider and destination flags used during installation:

```bash
npx vitaecontext uninstall --provider codex
```

`uninstall` reads `vitaecontext-install.json` and removes only the VitaeContext files recorded in that manifest. Use `--dry-run` to preview the removal.

Install directly from GitHub without cloning the repository:

```bash
npx github:vitaecontext/vitaecontext install --provider codex
```

Use an explicit destination for non-default provider locations:

```bash
npx vitaecontext install --provider gemini-cli --target-dir /custom/path/vitaecontext
```

Each installation writes a `vitaecontext-install.json` manifest containing its package version, provider, installed skills, commands, and target paths.

## Invocation

Provider invocation varies. The stable contract is the shared skill name or provider command wrapper.

| Provider | Example |
| --- | --- |
| Codex | `$vitaecontext-github` |
| Claude Code | `Use the vitaecontext-linkedin skill to audit my LinkedIn profile.` |
| Gemini CLI | `/vitaecontext:github` |
| Antigravity CLI | `Use the installed vitaecontext-github plugin skill to audit my GitHub profile.` |
| OpenCode | `/vitaecontext-github` |
| Portable skill folder | `Use the SKILL.md in vitaecontext-portfolio to audit my portfolio site.` |

## What is inside

This repository keeps human guidance, runtime skills, provider adapters, and packaging separate:

- [`hub/`](./hub/) contains public playbooks, templates, examples, and source notes.
- [`vitaegraph/`](./vitaegraph/) contains the public VitaeGraph specification, schemas, and canonical artifact templates.
- [`.skills/agent-skill/`](./.skills/agent-skill/) contains the canonical portable skill source.
- [`.skills/export/`](./.skills/export/) contains the install, export, doctor, Career Context, VitaeGraph, and template CLI.
- [`.skills/providers/`](./.skills/providers/) contains thin provider-specific adapters.
- [`llms.txt`](./llms.txt) and [`llms-full.txt`](./llms-full.txt) expose the project map and wiki bundle to LLM tools.

One canonical skill source is exported into each provider layout. Runtime wiki entries give agents source-aware platform constraints, confidence labels, known failure modes, and evidence rules without loading the whole knowledge graph for every task.

Read [DESIGN.md](./DESIGN.md) for the system design and [the architecture map](./.assets/docs/architecture-map.md) for repository ownership and edit boundaries.

## Documentation

- [Getting started](./.assets/docs/getting-started.md) explains installation, first use, and graph navigation.
- [Fictional five-minute demo](./.assets/docs/fictional-end-to-end-demo.md) shows raw material, validated context, a bounded packet, and a grounded task brief without publishing real career data.
- [End-to-end demos](./.assets/docs/end-to-end-workflows.md) provides sample inputs, prompts, and expected deliverables.
- [Public playbooks](./hub/) document the human-readable methodology for each module.
- [Maintaining](./MAINTAINING.md) covers source refresh, wiki maintenance, validation, and releases.
- [Contributing](./CONTRIBUTING.md) explains how to propose ideas, report issues, and open pull requests.
- [Contributing instructions](./AGENTS.md) define repository rules for coding agents.
- [Changelog](./CHANGELOG.md) records public release history.
- [Privacy](./PRIVACY.md) and [security](./SECURITY.md) describe project policies.

## Authors

Maintained by **Renato Mignone** and **Elia Innocenti**.

| Author | GitHub | LinkedIn | Portfolio |
| --- | --- | --- | --- |
| **Renato Mignone** | [GitHub](https://github.com/RenatoMignone) | [LinkedIn](https://www.linkedin.com/in/renato-mignone/) | [Portfolio](https://renatomignone.github.io/) |
| **Elia Innocenti** | [GitHub](https://github.com/eliainnocenti) | [LinkedIn](https://www.linkedin.com/in/eliainnocenti/) | [Portfolio](https://eliainnocenti.github.io/) |

If VitaeContext is useful, [star the repository](https://github.com/vitaecontext/vitaecontext) to help more people find it.
