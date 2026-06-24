<!--
metadata:
  title: "GitHub optimization"
  platform: "github"
  objective: "Master index and routing logic for optimizing a GitHub profile and repositories for internal search and Copilot."
  status: "draft"
  last_updated: "2026-05-11"
  tags: ["github", "index", "seo", "blackbird"]
  agent_priority: "high"
-->

# GitHub optimization

> This directory helps turn a GitHub profile from a code dump into a searchable proof-of-work system for humans, GitHub search, Copilot, and other AI agents.
> Public web page: [GitHub optimization playbook](https://agentkit-seo.github.io/playbooks/github/).

---

## 1. Overview: The internal ecosystem

Most GitHub profiles show activity. Fewer explain why the work matters, what the developer can actually build, and which repositories deserve attention.

Optimizing for GitHub is fundamentally different from optimizing for Google or a traditional ATS. You are optimizing for an ecosystem that combines repository metadata, exact-match code queries, contribution visibility, human trust signals, and semantic indexing for Copilot.

The first audience is GitHub's internal code search engine, known as **Blackbird**. The durable optimization target is not a secret ranking formula; it is making public repositories eligible for code search and easy to query, inspect, and understand when recruiters or developers search for specific technologies or projects.

The second audience consists of **AI Agents and Copilot**. Copilot uses a sophisticated semantic search index that updates in the background. Ensuring your documentation and codebase are structured to feed this index correctly is the foundation of Agentic Engine Optimization (AEO) for code.

```text
Weak signal:
"Backend server"

Stronger signal:
"FastAPI authentication service with JWT, PostgreSQL, rate limiting, and Docker deployment"
```

## 2. Use this module when

- A GitHub profile does not clearly explain who the developer is and what they build.
- Pinned repositories, topics, descriptions, or READMEs do not show the strongest proof of work.
- A project should be easier to find through GitHub search, external search, or AI tools.
- A repository needs cleaner instructions for Copilot, code agents, or future maintainers.

## 3. Fast path

1. For the profile page, start with [Profile architecture](./profile-architecture.md) and [Profile README](./profile-readme.md).
2. For an individual project, start with [Repository SEO](./repository-seo.md).
3. If language stats look wrong, use [Linguist and statistics](./linguist-and-stats.md).
4. If the repository is meant to work well with code agents, use [Copilot and agents](./copilot-and-agents.md).
5. Use [Engagement signals](./engagement-signals.md) after the basic profile and repository structure are already clear.

## 4. Module index

The optimization logic is divided into the following documents, ordered from foundational algorithms to specific technical configurations:

- **[GitHub code search and Blackbird](./algorithm-blackbird.md):** Practical guide to GitHub code search, documented limits, query qualifiers, and indexing exclusions.
- **[Profile architecture](./profile-architecture.md):** Foundational settings, optimizing the 160-character bio, strategic repository pinning, and contribution graph management.
- **[Profile README](./profile-readme.md):** Strategy for the special `username/username` repository, using markdown badges, and maintaining token efficiency.
- **[Repository SEO](./repository-seo.md):** Rules for optimizing individual projects, including naming conventions, short descriptions, and topic tags.
- **[Linguist and statistics](./linguist-and-stats.md):** How to correct the repository language statistics bar using `.gitattributes` so generated, vendored, or documentation-heavy files do not skew your perceived stack.
- **[Engagement signals](./engagement-signals.md):** How stars, forks, releases, and maintenance hygiene affect repository trust and discovery.
- **[Copilot and agents](./copilot-and-agents.md):** The definitive guide to AEO within GitHub, including Copilot indexing, repository instructions, and `AGENTS.md` precedence.
- **[Sources](./sources.md):** Citations and research validating the internal mechanics of GitHub search and Copilot indexing.

## 5. Usage for agents

When an AI agent is tasked with optimizing a user's GitHub presence:

1. **Information Fetching**: Before auditing, you can retrieve the user's public bio, profile README, and up to 20 recent repository READMEs without consuming REST API rate limits by executing:
   `node skills/agentkit-seo-github/scripts/github-fetcher.mjs <username> [output_dir] [max_repos]`
   Then inspect the generated report at `output/github_<username>_report.md`.
2. Review this index to determine which specific sub-module is relevant to the task.
3. If optimizing the overarching profile (`username/username`), load `profile-architecture.md` and `profile-readme.md`.
4. If optimizing a specific project repository, load `repository-seo.md` and `linguist-and-stats.md`.
5. If writing AI instructions for a codebase, load `copilot-and-agents.md`.
6. Always enforce the formatting constraints defined in the sub-modules over generic creative writing.

---

Runtime skill: [.skills/agent-skill/agentkit-seo-github/SKILL.md](../../.skills/agent-skill/agentkit-seo-github/SKILL.md). Source notes: [sources.md](./sources.md).

*Next step: Understand the search engine in [GitHub code search and Blackbird](./algorithm-blackbird.md).*
