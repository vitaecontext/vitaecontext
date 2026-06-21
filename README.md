<p align="center">
  <img src=".assets/image/banner.png" alt="AgentKit SEO Banner" width="80%" />
</p>

<p align="center">
  <em>Give your career agents a source of truth, platform rules, and a repeatable workflow.</em>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/agentkit-seo"><img src="https://img.shields.io/npm/v/agentkit-seo?style=for-the-badge&logo=npm&color=CB3837" alt="npm version" /></a>
  <a href="https://github.com/agentkit-seo/agentkit-seo/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/agentkit-seo/agentkit-seo/validate.yml?branch=main&style=for-the-badge&logo=githubactions&logoColor=white&label=CI" alt="CI status" /></a>
  <img src="https://img.shields.io/badge/Agent--Ready-000000?style=for-the-badge&logo=openai&logoColor=white" alt="Agent-Ready" />
  <img src="https://img.shields.io/badge/Markdown--First-4285F4?style=for-the-badge&logo=markdown&logoColor=white" alt="Markdown-First" />
  <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  <img src="https://img.shields.io/badge/CV_&_ATS-000000?style=for-the-badge&logo=googledocs&logoColor=white" alt="CV & ATS" />
  <img src="https://img.shields.io/badge/Web_Portfolio-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Portfolio" />
  <img src="https://img.shields.io/badge/X_(Twitter)-000000?style=for-the-badge&logo=x" alt="X" />
</p>

<p align="center">
  <a href="#why-it-exists">Why</a> •
  <a href="#who-its-for">Who It's For</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#new-here">New Here?</a> •
  <a href="#modules">Modules</a> •
  <a href="#design-principles">Design</a> •
  <a href="#install">Install</a> •
  <a href="https://agentkit-seo.github.io/">Website</a> •
  <a href="#authors">Authors</a>
</p>

---

## Why It Exists

Developers already understand `CLAUDE.md`, `AGENTS.md`, and repo-level context files: put one in a project, and an AI agent can understand the codebase before it edits anything.

AgentKit SEO applies that same pattern to a career.

It gives agents a private Markdown source of truth called an **agent-context-file**. That file stores verified facts about experience, projects, metrics, target roles, growth direction, evidence boundaries, constraints, links, and positioning. Every platform skill then works from the same context instead of rebuilding professional history from scratch in every chat.

Most AI agents can rewrite a CV, LinkedIn bio, GitHub README, or portfolio page. The hard part is making the output factual, consistent, platform-aware, and reusable across tools.

AgentKit SEO provides:

- A private career context file that agents can read before writing.
- Portable `SKILL.md` modules for LinkedIn, GitHub, CV/ATS, web portfolios, X/Twitter, and context optimization.
- Curated wiki knowledge for platform constraints, canonical definitions, and known agent failure modes.
- An install CLI for Claude Code, Codex, Gemini CLI, Antigravity CLI, OpenCode, and portable skill bundles.

```text
Weak agent output:
"I am a passionate developer with experience in many technologies."

AgentKit SEO-style output:
"Security-focused software engineer building verified, search-ready career systems
across GitHub, CVs, LinkedIn, and portfolio sites."
```

## Who It's For

- Developers preparing for job search, promotion, or public credibility work.
- Students turning projects into credible portfolio proof.
- Founders and freelancers improving trust signals across public profiles.
- Agents that need structured personal context before editing public career assets.
- Maintainers building portable skills for more than one AI coding environment.

## Quick Start

Install the skills for an agent provider:

```bash
npx agentkit-seo install --provider codex
```

Create a private context-file template:

```bash
npx agentkit-seo template context --output ~/.agentkit-seo/my-context.md
```

Ask an agent to fill it from trusted material:

```text
Use agentkit-seo-agent-context-optimization to create my agent-context-file.
I can provide my CV, LinkedIn sections, GitHub URL, portfolio URL, project notes,
screenshots, or any other career material you need.
```

Then use the right platform skill:

```text
Use agentkit-seo-github to audit my GitHub profile for hiring visibility.
Use my personal context file at ~/.agentkit-seo/my-context.md.
```

Typical outputs include:

- Prioritized profile, repository, CV, or portfolio audits.
- Evidence-backed rewrite suggestions.
- ATS-safe CV structure and bullet improvements.
- GitHub README, topic, pin, and proof-point fixes.
- LinkedIn headline, About, Experience, Featured, and Skills recommendations.
- Next actions ranked by impact, evidence, and missing inputs.

## New Here?

Start with the practical onboarding path before opening every module:

- [Getting started](./.assets/docs/getting-started.md) explains the repository layers, first install, first use, and graph navigation order.
- [End-to-end demos](./.assets/docs/end-to-end-workflows.md) shows skill-ready agent workflows with sample inputs, prompts, multimodal material, and expected deliverables.
- [Architecture map](./.assets/docs/architecture-map.md) is the maintainer and agent map for deciding which layer to edit.

## Agent Context Optimization

The agent-context-file is a private Markdown file, usually kept outside the repository at `~/.agentkit-seo/<name-surname>-seo-context.md`.

It contains verified identity facts, roles, projects, links, metrics, constraints, target roles, growth direction, claims to avoid, tone, and positioning notes.

Platform skills read that file first, then adapt the same facts to LinkedIn, GitHub, CV/ATS, web portfolio, or X/Twitter output rules.

## Modules

AgentKit SEO ships one context module and five platform modules.

| Goal | Start here | Public playbook |
| --- | --- | --- |
| Build the reusable personal context layer | [agent-context-optimization](./hub/agent-context-optimization/README.md) | [Agent context optimization](https://agentkit-seo.github.io/playbooks/agent-context-optimization/) |
| Improve GitHub profile and repository discoverability | [github](./hub/github/README.md) | [GitHub optimization](https://agentkit-seo.github.io/playbooks/github/) |
| Rewrite a LinkedIn profile for search, recruiters, and AI-readable proof | [linkedin](./hub/linkedin/README.md) | [LinkedIn optimization](https://agentkit-seo.github.io/playbooks/linkedin/) |
| Tailor a CV or resume for ATS parsing and recruiter readability | [cv-ats](./hub/cv-ats/README.md) | [CV and ATS optimization](https://agentkit-seo.github.io/playbooks/cv-ats/) |
| Fix portfolio SEO, AI readability, and indexability | [web-portfolio](./hub/web-portfolio/README.md) | [Web portfolio SEO](https://agentkit-seo.github.io/playbooks/web-portfolio/) |
| Improve X/Twitter profile positioning and posting strategy | [x-twitter](./hub/x-twitter/README.md) | [X/Twitter optimization](https://agentkit-seo.github.io/playbooks/x-twitter/) |

## How It Works

<p align="center">
  <img src=".assets/image/workflow.png" alt="AgentKit SEO Workflow: One source of truth, many optimized surfaces" width="100%" />
</p>

The workflow moves from scattered raw material to consistent public output:

1. **Raw material:** Gather CVs, LinkedIn sections, GitHub URLs, portfolio URLs, screenshots, exports, and project notes.
2. **Agent context file:** Use `agentkit-seo-agent-context-optimization` to distill the material into one private Markdown source of truth.
3. **Platform skill:** Give the context file to a focused skill such as LinkedIn, GitHub, CV/ATS, web portfolio, or X/Twitter.
4. **Grounded output:** The agent produces an audit, rewrite, patch proposal, or action plan backed by the verified facts in the context file.

Keep the context file private. A portable location is:

```text
~/.agentkit-seo/<name-surname>-seo-context.md
```

This is not a prompt collection. It is an operating manual for agents working on professional identity: verify facts first, then optimize the surface.

## Design principles

AgentKit SEO is a small system that applies current agentic-AI ideas, not just a set of prompts. Each concept below is implemented in the repository.

| Concept | One-line idea | Where it lives |
| --- | --- | --- |
| Career context file | A private `AGENTS.md` for a person: verified facts plus stated goals, growth direction, evidence boundaries, and targeting an agent reads before writing | [agent-context-optimization](./.skills/agent-skill/agentkit-seo-agent-context-optimization/SKILL.md) |
| LLM Wiki | A knowledge base a maintainer agent compiles from sources and keeps current, which runtime agents read instead of re-deriving facts per query | [`wiki/`](./.skills/agent-skill/agentkit-seo/wiki/agentkit-seo.md), [llms-full.txt](./llms-full.txt) |
| Progressive disclosure | Load one module, then only the references a task needs | `## Wiki context` sections in each `SKILL.md` |
| Markdown knowledge graph | Cross-referenced `.md` files with one entrypoint and explicit edges | [references](./.skills/agent-skill/agentkit-seo/references/), [llms.txt](./llms.txt) |
| Evidence and confidence labels | Mark each claim as verified, inferred, or needing evidence | `Boundaries` sections and `wiki/` metadata |
| One source, many adapters | Keep one portable source, generate per-provider layouts | [`.skills/agent-skill/`](./.skills/agent-skill/), [`.skills/providers/`](./.skills/providers/) |
| AI-answer-engine readiness (GEO/AEO) | Structure each surface so AI search and assistants can quote a person accurately | [GitHub Copilot indexing](./hub/github/copilot-and-agents.md), [LinkedIn AI structure](./hub/linkedin/ai-agent-optimization.md), [portfolio AEO](./hub/web-portfolio/llms-and-aeo.md) |
| Role-grounded persona and self-review | Each skill reasons as the relevant professional (hiring manager, recruiter, ATS screener) and checks its own draft for fabrication, evidence labels, and scope before returning | each module `SKILL.md` overview and its `## Self-review` step |
| Audit scorecard | Weighted 0-100 triage with bands and a fix-first order, used as an internal prioritization heuristic, not a platform ranking | [audit-scoring.md](./.skills/agent-skill/agentkit-seo-github/references/audit-scoring.md) |

Hiring discovery increasingly runs through AI answer engines, so the same properties these modules enforce, consistent facts across surfaces and verifiable proof, are what those systems can quote accurately. The project treats generative and answer engine optimization as an evolving practice with no guaranteed ranking outcome, not a promise.

The pieces connect as a navigable graph: a broad question enters at one entrypoint and narrows to a single module and constraint, instead of loading the whole system.

```mermaid
flowchart TD
  CTX["agent-context-file (private source of truth)"]
  README["README.md"]
  ROOT["root runtime wiki"]
  SKILL["agentkit-seo-(module)/SKILL.md"]
  REF["references/*.md"]
  WIDX["wiki/index.md"]
  WKNOW["wiki/knowledge.md"]
  HUB["hub/(module)/README.md"]
  LLMS["llms.txt and llms-full.txt"]

  README --> ROOT
  README --> HUB
  ROOT --> SKILL
  ROOT --> LLMS
  SKILL --> REF
  SKILL --> WIDX
  WIDX --> WKNOW
  CTX -. read before writing .-> SKILL
```

[DESIGN.md](./DESIGN.md) explains each concept, the graph, and how the design evolved release by release.

## LLM Wiki

Without a knowledge layer, agents guess at platform constraints from training data: ATS parser behavior, LinkedIn field limits, GitHub Linguist rules, and other details that change or depend on context. That guessing produces confident but wrong advice. AgentKit SEO's wiki layer follows Andrej Karpathy's LLM Wiki concept: a maintainer agent compiles the knowledge from sources and keeps it current, and runtime agents read it instead of re-deriving platform facts on every query. A maintainer-only wiki refresh skill exists in the source tree for local source audits; the installed user bundle still ships only the runtime skills.

- Every skill ships with per-module Markdown entries for canonical definitions, platform constraints with confidence labels, known failure modes, evidence rules, and audit output rules.
- Wiki entries load conditionally, so agents pull deeper context only when the current task needs it.
- [agentkit-seo/wiki/agentkit-seo.md](./.skills/agent-skill/agentkit-seo/wiki/agentkit-seo.md) is the root self-description and graph entrypoint for installed agents.
- [llms.txt](./llms.txt) and [llms-full.txt](./llms-full.txt) expose the project map and full wiki bundle for LLM tools.

## Repository Layout

The repository separates human documentation from runtime agent artifacts:

- `hub/` contains public playbooks, templates, examples, and source notes.
- `.skills/agent-skill/` contains the canonical portable skill source.
- `.skills/export/` contains the install, export, doctor, and template CLI.
- `.skills/providers/` contains provider-specific adapter notes and wrappers.
- `commands/`, `skills/`, `GEMINI.md`, and `gemini-extension.json` provide the Gemini-compatible root distribution layout.

One canonical source generates every provider layout, so methodology never drifts between tools:

```mermaid
flowchart LR
  SRC[".skills/agent-skill/<br/>canonical SKILL.md + references + wiki"]
  ADP[".skills/providers/<br/>thin adapters"]
  EXP[".skills/export/<br/>export + install CLI"]
  SRC --> EXP
  ADP --> EXP
  EXP --> CC["Claude Code"]
  EXP --> CX["Codex"]
  EXP --> GM["Gemini CLI / Antigravity"]
  EXP --> OC["OpenCode"]
  EXP --> NPM["npm package +<br/>root Gemini mirror"]
```

Maintainer entrypoints:

- [MAINTAINING.md](./MAINTAINING.md) covers source refresh, wiki maintenance, and validation.
- [AGENTS.md](./AGENTS.md) defines repository instructions for coding agents.
- [Getting started](./.assets/docs/getting-started.md) and [end-to-end demos](./.assets/docs/end-to-end-workflows.md) provide guided paths for new users and contributors.

## Install

Install one provider at a time:

```bash
npx agentkit-seo install --provider codex
```

Supported providers:

| Provider | Installs to | Activation model |
| --- | --- | --- |
| `shared` | Portable `SKILL.md` folders | Manual reuse or packaging |
| `claude-code` | `~/.claude/skills/` | Ask for the installed skill by name |
| `codex` | `~/.agents/skills/` plus `CODEX_HOME/skills` or `~/.codex/skills/` | Use installed skills by name when available |
| `gemini-cli` | `~/.gemini/extensions/agentkit-seo/` | Namespaced commands such as `/agentkit-seo:linkedin` |
| `antigravity` | `~/.gemini/antigravity-cli/plugins/agentkit-seo/` | Plugin layout based on the Gemini-compatible bundle |
| `opencode` | `~/.config/opencode/skills/` plus command wrappers | Native skill loading plus flat command wrappers |

In Claude Code, the skills are also available as a plugin marketplace:

```text
/plugin marketplace add agentkit-seo/agentkit-seo
/plugin install agentkit-seo@agentkit-seo
```

Useful package commands:

```bash
npx agentkit-seo version
npx agentkit-seo update
npx agentkit-seo doctor
npx agentkit-seo list providers
npx agentkit-seo list skills
```

`update` checks the npm registry for the latest published version. By default it compares the package you are running; with `--provider <provider>` it reads the installed provider manifest and compares the installed skill version. It only runs when you invoke it; AgentKit SEO never checks for updates on its own. When an update is available, reinstall the skills from the latest package.

Check the installed Codex skill bundle directly:

```bash
npx agentkit-seo@latest update --provider codex
```

Remove an install with the same provider and destination flags used to install it:

```bash
npx agentkit-seo uninstall --provider codex
```

`uninstall` reads the `agentkit-seo-install.json` manifest and removes only the AgentKit SEO skill folders, command wrappers, and manifest it created, leaving unrelated skills in shared directories untouched. Use `--dry-run` to preview the removal first.

Install from GitHub without a local clone:

```bash
npx github:agentkit-seo/agentkit-seo install --provider codex
```

Use an explicit destination when a machine uses a non-default provider location:

```bash
npx agentkit-seo install --provider gemini-cli --target-dir /custom/path/agentkit-seo
```

Each install writes an `agentkit-seo-install.json` manifest in the install root with the package version, provider, skills, commands, and target paths.

## Invocation

Provider invocation varies. The stable contract is the shared skill name or the provider command wrapper.

**Codex**

```text
$agentkit-seo-github
```

**Claude Code**

```text
Use the agentkit-seo-linkedin skill to audit my LinkedIn profile.
```

**Gemini CLI**

```text
/agentkit-seo:github
```

**Antigravity CLI**

```text
Use the installed agentkit-seo-github plugin skill to audit my GitHub profile.
```

**OpenCode**

```text
/agentkit-seo-github
```

**Portable skill folders**

```text
Use the SKILL.md in agentkit-seo-web-portfolio to audit my portfolio site.
```

## Authors

Maintained by **Renato Mignone** and **Elia Innocenti**.

| Author             | GitHub                                     | LinkedIn                                                | Portfolio                                     |
| ------------------ | ------------------------------------------ | ------------------------------------------------------- | --------------------------------------------- |
| **Renato Mignone** | [GitHub](https://github.com/RenatoMignone) | [LinkedIn](https://www.linkedin.com/in/renato-mignone/) | [Portfolio](https://renatomignone.github.io/) |
| **Elia Innocenti** | [GitHub](https://github.com/eliainnocenti) | [LinkedIn](https://www.linkedin.com/in/eliainnocenti/)  | [Portfolio](https://eliainnocenti.github.io/) |

Release history is tracked in [CHANGELOG.md](./CHANGELOG.md). Privacy and security policies are tracked in [PRIVACY.md](./PRIVACY.md) and [SECURITY.md](./SECURITY.md).

If AgentKit SEO is useful, a GitHub star helps others find the project.
