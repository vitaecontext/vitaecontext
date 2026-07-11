<!--
metadata:
  title: "X (Twitter) optimization"
  platform: "x-twitter"
  objective: "Index and overview for the X (Twitter) platform optimization module."
  status: "review"
  last_updated: "2026-05-27"
  tags: ["x", "twitter", "overview", "indexing"]
  agent_priority: "high"
-->

# X (Twitter) optimization

> This module helps make an X profile and posting loop easier to understand, easier to follow, and less dependent on vague growth advice.
> Public web page: [X/Twitter optimization playbook](https://vitaecontext.github.io/playbooks/x-twitter/).

---

## 1. Overview

Posting more is not a strategy. A strong X presence needs clear positioning, useful native posts, and a repeatable engagement loop that fits the account's niche.

X (Twitter) is no longer a simple chronological feed. Current X help pages document recommender systems for For You, Search, Explore, Notifications, and other surfaces. Historical open-source repositories add architecture context, but they are not a complete contract for live production ranking.

The primary audience for this module is AI agents generating or reviewing X content and humans looking to improve profile clarity, native value, and credible conversation. Where behavior is officially documented, treat it as source-backed product behavior. Where behavior comes from historical repositories, architecture snapshots, or field observation, mark it as inference or a recommendation to test.

```text
Weak post:
"Here are 10 tools every developer needs."

Stronger post:
"I rebuilt my portfolio for search visibility. The biggest gain was not metadata.
It was giving every serious project its own crawlable URL and proof-of-work page."
```

## 2. Use this module when

- An X profile needs clearer positioning, bio structure, or pinned-post strategy.
- Posts need stronger hooks, better formatting, or more useful native value.
- The account needs a repeatable engagement loop instead of random posting.
- Advice must separate documented behavior from contested algorithm claims.

## 3. Fast path

1. For profile setup, start with [profile-optimization.md](./profile-optimization.md).
2. For individual posts and threads, use [posting-strategy.md](./posting-strategy.md).
3. For growth loops, use [engagement-and-growth.md](./engagement-and-growth.md).
4. For Premium-specific choices, use [premium-strategies.md](./premium-strategies.md).
5. Use [algorithm-phoenix.md](./algorithm-phoenix.md) when a task depends on ranking assumptions.

## 4. Module index

Agents must route to the specific file needed for the task at hand. Do not load the entire module unless requested.

- [algorithm-phoenix.md](./algorithm-phoenix.md) — Current recommender help pages, historical architecture context, and clearly marked inferences.
- [profile-optimization.md](./profile-optimization.md) — Treating the profile as a searchable landing page (bio, display name, handle).
- [posting-strategy.md](./posting-strategy.md) — Content SEO, opening-hook heuristics, link placement experiments, and native media.
- [engagement-and-growth.md](./engagement-and-growth.md) — Conversation depth, replies, and source-aware niche engagement.
- [premium-strategies.md](./premium-strategies.md) — Officially documented Premium capabilities and practical tactics.
- [sources.md](./sources.md) — Official, maintainer-published, and confidence-labeled sources with downgrade notes.

## 5. Rules

**Rule:** When optimizing an X profile or generating a tweet, the agent must consult the relevant file from the index above before generating output.

**Rule:** Output must prioritize profile clarity, native value, credible proof, and conversation quality over generic social media fluff.

---

Runtime skill: [.skills/agent-skill/vitaecontext-x/SKILL.md](../../.skills/agent-skill/vitaecontext-x/SKILL.md). Source notes: [sources.md](./sources.md).
