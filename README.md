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
  <a href="#quick-start">Quick Start</a> •
  <a href="#modules">Modules</a> •
  <a href="#install">Install</a> •
  <a href="https://agentkit-seo.github.io/">Website</a> •
  <a href="#how-it-works">How It Works</a> •
  <a href="#status">Status</a>
</p>

---

## Why It Exists

Most AI agents can rewrite a CV, LinkedIn bio, GitHub README, or portfolio page.

The problem is that they usually rewrite from whatever context happens to be in the chat. That produces generic personal-branding copy, missing facts, repeated questions, and platform advice that does not travel from one agent to another.

AgentKit SEO fixes the starting point with agent context optimization:

- a private **agent-context-file** for verified career facts
- focused skills for **LinkedIn profile optimization**, **GitHub SEO**, **CV/ATS resume optimization**, **portfolio SEO**, and **X/Twitter profile optimization**
- one export/install CLI for Claude Code, Codex, Gemini CLI, OpenCode, and portable `SKILL.md` usage

```text
Weak agent output:
"I am a passionate developer with experience in many technologies."

AgentKit SEO-style output:
"Security-focused software engineer building verified, search-ready career systems
across GitHub, CVs, LinkedIn, and portfolio sites."
```

## Quick Start

Start with the context file, then send one platform through the right skill.

```text
Use agentkit-seo-agent-context-optimization to create my agent-context-file.
I can provide my CV, LinkedIn sections, GitHub URL, portfolio URL, project notes,
screenshots, or any other career material you need.
```

Then use a platform skill:

```text
Use agentkit-seo-github to audit my GitHub profile for hiring visibility.
Use my personal context file at the path I provide.
```

Typical outputs:

- prioritized profile or portfolio audit
- evidence-backed rewrite suggestions
- ATS-safe CV structure and bullet improvements
- GitHub README, topic, pin, and proof-point fixes
- LinkedIn headline, About, Experience, Featured, and Skills recommendations
- next actions ranked by impact and missing evidence

## Agent Context Optimization

Agent context optimization is the layer that keeps agentic AI work from drifting into generic or inconsistent personal-branding output.

Instead of asking every agent to rebuild the user's professional history from scattered prompts, AgentKit SEO starts from a private Markdown context file. That file stores verified facts, links, achievements, constraints, target roles, and positioning notes in a structure that both humans and agents can inspect.

The platform skills then apply surface-specific rules on top of that source of truth:

- LinkedIn gets searchable, recruiter-readable profile structure
- GitHub gets clearer repository metadata, READMEs, topics, and proof links
- CV/ATS gets parser-safe structure and evidence-backed bullets
- portfolio pages get crawlable metadata, structured data, and useful snippets
- X gets bio, pinned-post, and content-positioning guidance

The practical goal is simple: make professional context reusable by agents, while keeping public outputs grounded in facts the user controls.

## Modules

| Goal                                                                     | Start here                                                           | Public playbook                                                                                    |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Build the reusable personal context layer                                | [agent-context-optimization](./agent-context-optimization/README.md) | [Agent context optimization](https://agentkit-seo.github.io/playbooks/agent-context-optimization/) |
| Improve GitHub profile and repository SEO                                | [github](./github/README.md)                                         | [GitHub optimization](https://agentkit-seo.github.io/playbooks/github/)                            |
| Rewrite a LinkedIn profile for search, recruiters, and AI-readable proof | [linkedin](./linkedin/README.md)                                     | [LinkedIn optimization](https://agentkit-seo.github.io/playbooks/linkedin/)                        |
| Tailor a CV or resume for ATS parsing                                    | [cv-ats](./cv-ats/README.md)                                         | [CV and ATS optimization](https://agentkit-seo.github.io/playbooks/cv-ats/)                        |
| Fix portfolio SEO and indexability                                       | [web-portfolio](./web-portfolio/README.md)                           | [Web portfolio SEO](https://agentkit-seo.github.io/playbooks/web-portfolio/)                       |
| Improve X/Twitter profile and posting strategy                           | [x-twitter](./x-twitter/README.md)                                   | [X/Twitter optimization](https://agentkit-seo.github.io/playbooks/x-twitter/)                      |

## Install

The canonical install path uses the published npm package:

```bash
npx agentkit-seo install --provider codex
```

Replace `codex` with any supported provider.

Check the package version and local package layout:

```bash
npx agentkit-seo version
npx agentkit-seo doctor
```

`agentkit-seo install` now warns when the target provider CLI or its usual config directory cannot be detected. The installer still writes the bundle to the standard target so clean-machine or first-time setups can proceed, but the warning tells users when to switch to `--project-root` or `--target-dir`.

Create a guided private context-file template before asking an agent to rewrite public profiles:

```bash
npx agentkit-seo template context --output ~/.agentkit-seo/my-context.md
```

Run it directly from the GitHub repository without a local clone:

```bash
npx github:agentkit-seo/agentkit-seo install --provider codex
```

For maintainers testing unpublished changes from a local checkout:

```bash
git clone https://github.com/agentkit-seo/agentkit-seo.git
cd agentkit-seo
npx . install --provider codex
```

Supported install targets:

| Provider      | Installs to                                        | Activation model                                                                                         |
| ------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Shared bundle | Portable `SKILL.md` folders                        | Manual reuse or packaging                                                                                |
| Claude Code   | `~/.claude/skills/`                                | Skill selection depends on Claude Code's skill loading; explicit skill naming is safest                  |
| Codex         | `~/.agents/skills/` plus `CODEX_HOME/skills` or `~/.codex/skills/` | Use installed skills by name when available; behavior depends on Codex skill support and workspace setup |
| Gemini CLI    | `~/.gemini/extensions/agentkit-seo/`               | Namespaced commands such as `/agentkit-seo:linkedin`                                                     |
| OpenCode      | `~/.config/opencode/skills/` plus command wrappers | Native skill loading plus flat commands such as `/agentkit-seo-linkedin`                                 |

Project-local install from a local checkout:

```bash
npm exec --package ./. -- agentkit-seo install \
  --provider codex \
  --project-root .
```

If a machine uses a non-default provider location, override the destination explicitly:

```bash
npx agentkit-seo install --provider gemini-cli --target-dir /custom/path/agentkit-seo
```

Each install writes an `agentkit-seo-install.json` manifest in the install root so maintainers and users can inspect the installed package version, provider, skills, commands, and target paths.

## How It Works

<p align="center">
  <img src=".assets/image/workflow.png" alt="AgentKit SEO Workflow: One source of truth, many optimized surfaces" width="100%" />
</p>

The workflow moves from scattered raw material to consistent public results in four stages:

1. **Raw material:** Gather your existing CV, LinkedIn exports, GitHub profile, portfolio URLs, screenshots, and raw project notes.
2. **Agent context file:** Load your agent with the **agent-context-optimization** skill and provide your raw material. The agent will distill this into one private, structured source of truth. This file stores your verified identity, target roles, education, experience, projects, metrics, links, constraints, and preferred tone.
3. **Platform skills:** Provide the resulting context file to an agent loaded with a focused platform skill (such as LinkedIn, GitHub, CV/ATS, or Portfolio).
4. **Grounded output:** The agent produces an audit, rewrite, patch proposal, or action plan that is consistent across all surfaces and backed by the verified facts in your context file.

It should not be committed to this repository. A portable convention is:

```text
~/.agentkit-seo/<name-surname>-seo-context.md
```

The human-readable folders explain the methodology. The runtime skill source lives in `.skills/agent-skill/`. The export CLI turns that shared source into provider-specific layouts.

This is not a prompt collection. It is an operating manual for agents working on professional identity: verify facts first, then optimize the surface.

## Invocation

Provider behavior is not identical. Some agents can select installed skills from their metadata, some expose slash commands, and some require you to mention the skill or add provider-specific rules. The shared skill names are the stable contract, but the way you invoke them depends on the provider.

**Codex**

Mention the installed skill when the environment supports it:

```text
$agentkit-seo-agent-context-optimization
$agentkit-seo-github
```

Exact activation depends on the Codex environment and installed skill support.

**Claude Code**

Ask for the installed skill by name. Claude may auto-select from skill metadata, but explicit naming is safer:

```text
Use the agentkit-seo-linkedin skill to audit my LinkedIn profile.
```

**Gemini CLI**

Use the namespaced commands shipped with the Gemini extension bundle:

```text
/agentkit-seo:context
/agentkit-seo:github
/agentkit-seo:linkedin
```

The repository root now also exposes a Gemini-compatible extension layout for gallery and direct GitHub installs:

- `gemini-extension.json` at the repo root for crawler and installer discovery
- `GEMINI.md` at the repo root for extension context loading
- `commands/agentkit-seo/*.toml` for namespaced Gemini commands
- `skills/*` for bundled agent skills

**OpenCode**

Use native skill loading or the flat command wrappers:

```text
/agentkit-seo-context
/agentkit-seo-github
/agentkit-seo-linkedin
```

**Other agents**

Install or copy the portable `SKILL.md` folders, then follow that agent's rule or skill system. If the agent cannot load skills automatically, paste or reference the relevant skill instructions manually.

## What's Inside

| Capability                    | Typical output                                                                                 |
| ----------------------------- | ---------------------------------------------------------------------------------------------- |
| Personal context architecture | Structured `agent-context-file` that becomes the reusable source of truth                      |
| LinkedIn optimization         | Section audit, headline/About rewrites, Featured strategy, and activity suggestions            |
| GitHub optimization           | Profile and repository discoverability audit with README, topic, naming, and proof-point fixes |
| CV/ATS optimization           | ATS-safe rewrite plan, keyword alignment, bullet improvements, and formatting risks            |
| Web portfolio optimization    | SEO/AEO audit, structured-data recommendations, indexability checks, and content improvements  |
| X optimization                | Bio, pinned-post, posting strategy, and engagement loop recommendations                        |

## Status

| Target                                       | Status                                               |
| -------------------------------------------- | ---------------------------------------------------- |
| Shared skill source                          | Ready                                                |
| Install/export CLI                           | Ready                                                |
| CLI diagnostics and context template command | Ready                                                |
| Push and pull request validation workflow    | Ready                                                |
| Claude Code direct install                   | Ready                                                |
| Codex direct install                         | Ready                                                |
| OpenCode direct install                      | Ready                                                |
| Gemini CLI extension install                 | Ready locally                                        |
| Gemini CLI gallery root manifest             | Ready for crawler                                    |
| Published `npx agentkit-seo ...` package     | Shipped                                              |
| Marketplace / registry distribution          | npm shipped; Gemini gallery pending crawler detection |

First launch focus: `cv-ats`, `github`, and `linkedin`. Other modules can remain beta while packaging, provider support, and the main launch narrative are finished.

Current project notes live in [.assets/docs/current-status.md](./.assets/docs/current-status.md), [.assets/docs/project.md](./.assets/docs/project.md), and [.assets/docs/architecture-map.md](./.assets/docs/architecture-map.md).

Authoring and runtime conventions are defined in [.assets/docs/STYLEGUIDE.md](./.assets/docs/STYLEGUIDE.md) and [.skills/architecture.md](./.skills/architecture.md).

Release history is tracked in [CHANGELOG.md](./CHANGELOG.md).

Privacy and security policies are tracked in [PRIVACY.md](./PRIVACY.md) and [SECURITY.md](./SECURITY.md).

## Releasing

Npm is the canonical package registry for AgentKit SEO. GitHub releases mirror npm versions with matching `v*` tags.

Automated publishing requires an `NPM_TOKEN` repository secret in GitHub with permission to publish `agentkit-seo`.

```bash
npm run validate
npm version patch
git push origin main --tags
```

Pushing a version tag such as `vX.Y.Z` runs the npm publish workflow, verifies the tag matches `package.json`, validates the package layout, and creates the matching GitHub release after npm publish succeeds.

## Who It's For

- developers preparing for job search or promotion cycles
- students turning projects into credible portfolio proof
- founders and freelancers improving public trust signals
- agents that need structured personal context before editing public profiles
- maintainers building portable skills for more than one coding agent

## Authors

Maintained by **Renato Mignone** and **Elia Innocenti**.

| Author             | GitHub                                     | LinkedIn                                                | Portfolio                                     |
| ------------------ | ------------------------------------------ | ------------------------------------------------------- | --------------------------------------------- |
| **Renato Mignone** | [GitHub](https://github.com/RenatoMignone) | [LinkedIn](https://www.linkedin.com/in/renato-mignone/) | [Portfolio](https://renatomignone.github.io/) |
| **Elia Innocenti** | [GitHub](https://github.com/eliainnocenti) | [LinkedIn](https://www.linkedin.com/in/eliainnocenti/)  | [Portfolio](https://eliainnocenti.github.io/) |

If AgentKit SEO is useful, a GitHub star helps others find the project.
