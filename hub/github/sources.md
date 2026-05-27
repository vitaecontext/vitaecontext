<!--
metadata:
  title: "GitHub optimization sources"
  platform: "github"
  objective: "Centralized official sources for GitHub profile, repository, search, Linguist, and agent-readiness claims."
  status: "review"
  last_updated: "2026-05-27"
  tags: ["github", "sources", "linguist", "copilot"]
  agent_priority: "low"
-->

# GitHub optimization sources

> This file lists official or maintainer-published GitHub sources that support GitHub module claims. Stars, forks, activity timing, and profile-discovery tactics must not be framed as deterministic ranking levers unless GitHub documents them.

---

## 1. Overview

The `github` module is grounded primarily in GitHub Docs, GitHub-owned source repositories, and GitHub Blog posts. External repository-audit articles and community experiments are excluded from this source table.

## 2. Source table

| Source | URL | Type | Covers | Confidence |
|---|---|---|---|---|
| GitHub Docs: About READMEs | https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes | official-docs | Repository README surfacing, profile README behavior, README truncation, relative links | stable |
| GitHub Docs: Pinning items to your profile | https://docs.github.com/en/account-and-profile/how-tos/profile-customization/pinning-items-to-your-profile | official-docs | Profile pins, pin ordering, and the six-item pin limit | stable |
| GitHub Docs: Classifying your repository with topics | https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics | official-docs | Repository topics, topic search, suggested topics, topic naming, and the 20-topic limit | stable |
| GitHub Docs: Searching for repositories | https://github.com/github/docs/blob/main/content/search-github/searching-on-github/searching-for-repositories.md | official-docs | Repository search qualifiers for topic, language, license, stars, forks, and other metadata | stable |
| GitHub Docs: Customizing your repository's social media preview | https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/customizing-your-repositorys-social-media-preview | official-docs | Repository social-preview image support and upload flow | stable |
| GitHub Docs: About repository languages | https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-repository-languages | official-docs | Linguist-backed language statistics and default-branch language-stat updates | stable |
| GitHub Docs source: Searching code | https://github.com/github/docs/blob/main/content/search-github/searching-on-github/searching-code.md | official-docs | Legacy code-search restrictions, default-branch indexing, fork indexing, file-size constraints | likely |
| GitHub Docs: Understanding GitHub Code Search syntax | https://docs.github.com/en/search-github/github-code-search/understanding-github-code-search-syntax | official-docs | Current code-search query syntax and qualifiers | stable |
| GitHub Docs: Archiving repositories | https://docs.github.com/en/repositories/archiving-a-github-repository/archiving-repositories | official-docs | Archived repository behavior and read-only state | stable |
| GitHub Docs: Setting repository visibility | https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility | official-docs | Public and private repository visibility behavior | stable |
| GitHub Docs: About customizing GitHub Copilot responses | https://docs.github.com/en/copilot/concepts/prompting/response-customization | official-docs | Copilot custom instructions, repository context, instruction length and scope cautions | stable |
| GitHub Docs: Adding repository custom instructions for GitHub Copilot | https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot | official-docs | `.github/copilot-instructions.md`, `.github/instructions/*.instructions.md`, `AGENTS.md` behavior | stable |
| GitHub Docs: Copilot customization cheat sheet | https://docs.github.com/en/copilot/reference/customization-cheat-sheet | official-docs | Custom instructions, prompt files, custom agents, and agent skills locations | likely |
| GitHub Blog: How to write a great AGENTS.md | https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/ | official-blog | Practical AGENTS.md structure and lessons from observed repositories | likely |

## 3. Removed or downgraded sources

No third-party GitHub optimization source is retained here. The previous GitHub Blog source is retained as `official-blog` and `likely` because it is official guidance, but not a product contract for ranking or search behavior.

No clean official source was found for exact profile ranking, Explore distribution, star/fork weighting, or contribution-graph ranking effects. Treat those claims as `disputed` unless inspected source material proves a narrower point.

---

See also: [GitHub optimization](./README.md) and [runtime knowledge](../../.skills/agent-skill/agentkit-seo-github/wiki/knowledge.md).
