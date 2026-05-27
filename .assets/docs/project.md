# AgentKit SEO

### **1. Executive Summary & Vision**

**The Project:** AgentKit SEO is now a two-surface system: a public, human-readable website and a published installable skill package for coding agents. It covers personal branding, SEO/AEO, ATS-safe resume workflows, agent-readable career context, and a bundled LLM wiki for durable platform knowledge.

**The Two Public Surfaces:**
- **Human-readable hub.** The public website at `https://agentkit-seo.github.io/` exposes the project, skills, playbooks, providers, and docs in a crawlable static form.
- **Agent skill package.** The npm package `agentkit-seo` exposes install and export flows for supported providers, with the main source hosted at `https://github.com/agentkit-seo/agentkit-seo`.

**The Operational Goal:** Let a user install the skill into their preferred coding agent, point it at their LinkedIn profile, GitHub profile, portfolio, CV, or raw career materials, and produce grounded optimization work from a reusable source of truth plus module-specific platform knowledge.

**The Core Best Practice, The Personal Agent Context File:** The closest analogy is a `CLAUDE.md` or `AGENTS.md` file for a codebase, but applied to a career. The personal agent context file is a private Markdown document containing verified facts about a user's career, skills, projects, links, constraints, target roles, and positioning. It becomes the user's portable professional identity, readable by any agent, and lives outside of this repository in the user's own environment. The best workflow is to let the context optimization skill build and refine that file incrementally from trusted material such as CVs, profile exports, project notes, URLs, and screenshots.

---

### **2. Core Components & Architecture**

The architecture serves two distinct users simultaneously: the Human and the AI Agent.

**A. The Knowledge Hub (Human & AI Context)**

The `hub/` directory is the human-readable reference layer. It is dense, well-hyperlinked, and written in clean Markdown following the conventions defined in `.assets/docs/STYLEGUIDE.md`. That file is the single source of truth for editorial Knowledge Hub files, runtime skill files, provider adapter notes, examples, and templates. Contributors and agents alike must read it before authoring content. Maintainers and agents should also read `.assets/docs/architecture-map.md` before changing skills, provider adapters, package commands, release automation, or cross-cutting docs.

Content is organized by platform or output type. Each platform directory contains the rules, best practices, templates, and optional anonymized examples relevant to that platform, as well as a `sources.md` file listing the credibility links, research, and algorithm documentation specific to it. Current platforms include:

- `hub/linkedin/` — Headline, Featured section, About, Experience entries
- `hub/github/` — Profile README, repository READMEs, pinned repo structuring
- `hub/web-portfolio/` — SEO meta tags, accessibility, performance metrics, copywriting
- `hub/cv-ats/` — Keyword optimization, formatting rules, and templates for ATS-safe CV workflows
- `hub/x-twitter/` — Bio, pinned post strategy, content positioning
- `hub/agent-context-optimization/` — Personal source-of-truth context files, templates, examples, and agent workflow

More platform directories will be added as the project grows. The structure is designed to be extended without breaking existing conventions.

Working templates live inside their respective hub directories, such as `hub/cv-ats/templates/`. Public examples must be fictional or fully anonymized. The canonical rules live in the module docs, templates, and runtime skill references. The repo hub remains the human-editing and source-traceability layer. The portable runtime layer lives in `.skills/agent-skill/`, where each skill carries its own compressed local references.

**B. The Agent Skill System (The Engine)**

The `.skills/` directory is the machine-readable layer. It is structured as a collection of focused submodules, one per platform or output type, so that an agent loads only the context it needs for a given task.

```text
.skills/
    agent-skill/
        agentkit-seo/
        agentkit-seo-agent-context-optimization/
        agentkit-seo-cv-ats/
        agentkit-seo-github/
        agentkit-seo-linkedin/
        agentkit-seo-web-portfolio/
        agentkit-seo-x-twitter/
    providers/
        claude-code/
        codex/
        gemini-cli/
        antigravity/
        opencode/
    export/
        export-config.json
        scripts/
```

The shared source of truth lives in `.skills/agent-skill/`. Each folder there is an actual portable skill bundle with its own `SKILL.md`, local `references/` directory, local `wiki/` knowledge entries, and optional provider metadata such as `agents/openai.yaml`. The root `agentkit-seo` skill acts as an orchestrator, while the platform-specific skills keep context scoped to a single surface whenever possible.

**C. The LLM Wiki (Durable Agent Knowledge)**

Each installed skill ships with a `wiki/` folder. The wiki is the durable knowledge layer for claims that are too detailed or change-sensitive for a short `SKILL.md`: canonical definitions, platform constraints with confidence labels, known agent failure modes, evidence rules, and audit output rules.

The design follows Andrej Karpathy's LLM Wiki concept: a knowledge base the LLM reads, not one it writes. Current entries are maintained in the repository. A future maintainer writing loop can refresh entries from live sources, but that loop is not shipped yet.

Root LLM-facing files now exist for discovery:

- `llms.txt`
- `llms-full.txt`
- `.skills/agent-skill/agentkit-seo/wiki/agentkit-seo.md`

**Provider-agnostic and provider-specific:** The shared skills use a portable `SKILL.md` format and optional provider metadata such as `agents/openai.yaml`. The sibling provider folders are adapters only: they define install targets, wrapper commands, and provider-specific behavior without duplicating the core methodology.

**Scoped invocation:** The stable cross-provider contract is the shared skill name, such as `agentkit-seo-linkedin` or `agentkit-seo-github`. Some providers can expose ergonomic wrapper commands on top of those skills. For example, Gemini CLI exposes `/agentkit-seo:linkedin` through the generated extension's namespaced command files, Antigravity CLI imports the Gemini-compatible layout as a plugin but still needs command syntax confirmation, OpenCode uses flat wrappers such as `/agentkit-seo-linkedin`, Codex is better treated as explicit skill selection, and Claude Code needs either direct skill invocation or a later plugin wrapper for exact namespacing.

This architecture still solves the context window problem: a user who only wants LinkedIn help loads the LinkedIn skill instead of the whole system.

---

### **3. Current State And Workflow**

The foundation work is now done. The project is no longer in the planning-only phase.

**What is already live:**
- the GitHub organization
- the main source repo
- the public website on GitHub Pages
- the npm package `agentkit-seo`
- GitHub releases aligned with npm versions
- the npm publish pipeline
- the site deploy pipeline

**What the current workflow looks like:**
- edit shared skill logic in `.skills/agent-skill/`
- edit durable module knowledge in `.skills/agent-skill/*/wiki/`
- keep provider-specific behavior in `.skills/providers/`
- use `.skills/export/` as the install/export layer
- keep the root docs and site aligned with the runtime skill behavior
- publish new package versions through tags
- let the site deploy automatically from `main`

**What users currently do:**
- read the hub on the website or in the repo
- install the package with `npx agentkit-seo install --provider <provider>`
- invoke the matching skill inside their coding agent
- use a private context file to keep outputs fact-based across platforms
- rely on installed wiki entries when a platform task needs deeper constraints, definitions, or evidence rules

---

### **4. Architectural Decisions Now Defined**

The foundational decisions below are now part of the project contract:

1. **The Data Schema:** Editorial Knowledge Hub files use hidden metadata comments plus the visible structure defined in `.assets/docs/STYLEGUIDE.md`, so GitHub and VS Code render the page cleanly while agents still have routing metadata. Runtime skill entrypoints use Agent Skills frontmatter with `name` and `description`. Runtime references and provider adapter notes use lean Markdown optimized for loading cost and operational clarity.

2. **The Scope of the current release:** All seven shared skill bundles now exist. `cv-ats`, `github`, and `linkedin` remain the strongest launch modules, while the other modules are already part of the public package and website.

3. **The Install Strategy:** Copy/export install is the default. The CLI copies self-contained skill folders into provider-specific targets instead of relying on symlinks. Published-package installs default to the user's global agent skills folder, such as `~/.agents/skills` plus `CODEX_HOME/skills` or `~/.codex/skills` for Codex. Project-local installs remain available through `--project-root`. This keeps installed bundles portable and predictable.

4. **The Personal Context File schema:** The schema is defined in `hub/agent-context-optimization/context-file-spec.md` and mirrored in the context optimization runtime references. The discovery convention is explicit path first, then optional user-confirmed storage: in-chat draft, local workspace file, user-chosen path, or portable default such as `~/.agentkit-seo/<name-surname>-seo-context.md`.

5. **The LLM Wiki contract:** Runtime skills use a `## Wiki context` section to declare conditional wiki loads. Every wiki entry carries metadata for module, title, status, confidence, review dates, source status, and agent priority. The CLI doctor validates required metadata, enum values, local wiki links, title/H1 matches, module/folder matches, review-date shape, Gemini mirror coverage, and package inclusion for `llms.txt` and `llms-full.txt`.

---

### **5. Automation And Distribution**

Two main automation paths now exist:

- **Website deploy pipeline.** The site repo deploys to GitHub Pages from `main` through `.github/workflows/deploy-pages.yml`.
- **Package publish pipeline.** The main repo publishes `agentkit-seo` to npm on pushed tags matching `v*` through `.github/workflows/npm-publish.yml`, then creates the matching GitHub release.

Important operational note:

- npm publishing in CI depends on a valid `NPM_TOKEN` that supports non-interactive publish

The current release model is:

- npm is the canonical package registry
- GitHub releases mirror npm versions
- the website is the public human-readable hub
- the source repo remains the canonical authoring and packaging repo
- the package CLI exposes `version`, `doctor`, `template context`, and install-manifest metadata for release and install hygiene
- the package includes `llms.txt`, `llms-full.txt`, and skill-local `wiki/` folders
- push and pull request validation checks run the CLI doctor, provider export smoke tests, install smoke tests, and package dry-run
- `CHANGELOG.md` tracks public release history and unreleased package changes

---

### **6. Important to Define Later**

- **Marketplace Publishing:** Listing on official provider hubs (Claude's MCP marketplace, Gemini extensions, and equivalents).
- **GitHub repo social preview:** A separate custom social preview for the main source repo.
- **Multi-user / Team support:** Allowing a team (e.g., a startup founding team) to share a base Skill while each member maintains their own personal context file independently.
- **Demos or Showcase Assets:** Add GIFs, before/after examples, or small manual examples only when they support public communication. They are useful later, but not a current blocker.
- **Latest-version visibility:** Local installs now include package metadata; an online npm latest comparison can be added later if it becomes useful.
- **Wiki refresh automation:** The current wiki is repository-maintained Markdown. A maintainer writing loop that refreshes entries from live sources is planned but not shipped.

---

### **7. Open Operational Questions**

- *"When marketplace distribution starts, do we keep every provider artifact generated from the same shared source tree, or does one provider need a dedicated release artifact?"*

- *"How far do we want to push public showcase assets before they become maintenance overhead instead of launch support?"*

---

See also: [architecture-map.md](./architecture-map.md), [STYLEGUIDE.md](./STYLEGUIDE.md), [current-status.md](./current-status.md), and [MAINTAINING.md](../../MAINTAINING.md).
