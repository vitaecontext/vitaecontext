<!--
metadata:
  title: "X algorithm and ranking signals"
  platform: "x-twitter"
  objective: "Separates current official X recommender documentation from historical open-source architecture and inferred Grok or Phoenix-era claims."
  status: "review"
  last_updated: "2026-05-27"
  tags: ["algorithm", "open-source", "weights", "ranking"]
  agent_priority: "high"
-->

# X algorithm and ranking signals

> This file separates current official X recommender documentation from historical open-source architecture and inferred Grok or Phoenix-era claims.

---

## 1. Overview

Current X help pages document recommender systems for For You, Search, Explore, Notifications, and other surfaces. They describe candidate sourcing, personalization signals, ranking, filtering, feedback collection, and user controls at a product level.

X also open-sourced major parts of its recommendation stack in `twitter/the-algorithm` and `twitter/the-algorithm-ml`. Those repositories provide useful historical architecture context. Later repositories such as `xai-org/x-algorithm` require separate maintainer review before being used as production evidence.

When optimizing content, prioritize current official X documentation first. Treat historical repositories, architecture snapshots, and creator heuristics as inference, not guaranteed ranking laws.

## 2. Current official recommender documentation

X's current help pages support these product-level claims:

- For You finds posts from accounts, Lists, and Topics the viewer follows, plus accounts the viewer does not explicitly follow.
- For You ranks relevance using a neural network trained on interactions such as Likes, Reposts, and Replies.
- For You uses signals such as followed accounts, followed Topics, liked posts, posts liked by the viewer's network, and accounts followed by the viewer's network.
- Search has multiple result categories, including Top, Latest, People, Media, and Lists.
- Top search ranking uses engagement, health, and relevance scores.
- Latest search is the least personalized path and returns matching posts in reverse chronological order with global visibility filtering.
- X filters content that may be harmful, abusive, spammy, blocked, muted, protected, or otherwise ineligible before showing recommendations.

These pages do not publish a universal formula for reach, a guaranteed external-link penalty, or deterministic posting-frequency thresholds.

## 3. The historical baseline (Heavy Ranker)

The values below are historical examples from the 2023 open-source release and are most useful as directional priors. They should not be treated as guaranteed live constants.

**Rule:** Optimize for conversation depth and dwell time, not just likes.

- **Reply Engaged by Author (~75.0):** Historically one of the strongest positive signals.
- **Reply (~13.5):** A strong conversational signal.
- **Good Profile Click (~12.0):** Profile visit and downstream engagement.
- **Good Click / Dwell (~11.0):** Conversation click with meaningful dwell.
- **Retweet (~1.0):** Positive but lower than deep conversation.
- **Favorite / Like (~0.5):** Positive but comparatively low signal.

**Rule:** Avoid negative feedback signals.
- **Report (~-369.0):** Historically a severe negative outcome.
- **Negative feedback (~-74.0):** "Show less often," mute, and block events.

## 4. SimClusters and Two-Tower retrieval

X has historically sourced out-of-network content using graph and embedding-based retrieval systems.

**Recommendation:** Stay in your lane to improve out-of-network fit. Historically, SimClusters modeled community affinity from follow and engagement graphs. More recent architecture snapshots describe Two-Tower retrieval (User Tower + Candidate Tower) for semantic matching. Strategic takeaway: strong topical consistency can improve retrieval quality and out-of-network fit.

## 5. Phoenix and Grok-era architecture snapshots

Recent public architecture snapshots describe a Phoenix-style pipeline with:

- In-network and out-of-network candidate sourcing.
- Multi-action prediction and weighted scoring.
- Author diversity scoring to avoid feed monotony.
- Filtering layers for policy, safety, duplication, and user preferences.

These are useful design signals. They are not a full public contract for every live ranking behavior unless current official X documentation links them as production documentation.

**Not publicly documented as deterministic rules:**

- A universal penalty for external links.
- A strict sentiment-only rule that dictates distribution.
- Exact posting-frequency thresholds that trigger suppression.

**Recommendation:** Use controlled A/B tests for contested tactics (for example, inline links vs first-reply links), and prefer clear, value-dense posts over engagement bait.

**Recommendation:** Pace posts to reduce self-competition in the same feed session.

## 6. Examples

Good example:

```text
<!-- CORRECT: optimized for replies and conversation depth -->
We migrated our entire backend from Node.js to Go last month. Memory usage dropped by 60%, but the developer learning curve was steeper than expected.

Has your team attempted a similar migration? What was the hardest part?
```

Bad example:
```text
<!-- WRONG: optimized for low-value likes and engagement bait -->
10 tools every developer needs. Like and bookmark this right now!
```

## 7. Anti-patterns

### The Like-farming thread

**What it looks like:** "10 tools you need. Like and bookmark this!" **Why it fails:** It optimizes for shallow engagement instead of useful discussion. Historical ranking material also treated deeper conversation signals as more meaningful than likes alone. **What to do instead:** End the thread with a specific, open-ended question to invite substantive replies, then continue the discussion in follow-up responses.

---

Source notes: [sources.md](./sources.md).
