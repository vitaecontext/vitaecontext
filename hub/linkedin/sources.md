<!--
metadata:
  title: "LinkedIn optimization sources"
  platform: "linkedin"
  objective: "Centralized official LinkedIn sources for profile structure, search, Feed, verification, skills, and activity claims."
  status: "review"
  last_updated: "2026-05-27"
  tags: ["linkedin", "sources", "search", "skills"]
  agent_priority: "low"
-->

# LinkedIn optimization sources

> This file lists official LinkedIn sources that can support LinkedIn module claims. Third-party algorithm commentary and creator-growth posts are excluded from `stable` source support.

---

## 1. Overview

The `linkedin` module uses LinkedIn Help and LinkedIn-published material as the baseline. Public research and vendor commentary about named ranking systems can inform disputed notes, but it must not be presented as settled production behavior.

## 2. Source table

| Source | URL | Type | Covers | Confidence |
|---|---|---|---|---|
| LinkedIn Help: How the Feed ranks content | https://www.linkedin.com/help/linkedin/answer/a9554004 | help-center | Feed ranking uses many signals, including post context and profile, network, and activity signals; demographic fields are not Feed visibility signals | stable |
| LinkedIn Help: LinkedIn relevance | https://www.linkedin.com/help/linkedin/answer/a1339724 | help-center | Identity, Content, and Activity signal groups for relevance and recommendations | likely |
| LinkedIn Help: Order of your profile in people search results | https://www.linkedin.com/help/linkedin/answer/a521944 | help-center | Search-order non-guarantees, relevance to searcher, profile completeness, skills, connections, standard job titles | stable |
| LinkedIn Help: Add and remove skills on your profile | https://www.linkedin.com/help/linkedin/answer/a549047 | help-center | Skills section behavior, adding skills, skill association with profile sections, 100-skill limit | stable |
| LinkedIn Help: Display order of skills | https://www.linkedin.com/help/linkedin/answer/a568137/display-order-of-skills | help-center | Skill ordering and display management | stable |
| LinkedIn Help: Skill endorsements | https://www.linkedin.com/help/linkedin/answer/a565106 | help-center | Endorsement behavior, 100-skill limit, endorsement role in profile strength and opportunity discovery | stable |
| LinkedIn Help: Skill Assessments no longer available | https://www.linkedin.com/help/linkedin/answer/a1690529 | help-center | Discontinuation of LinkedIn Skill Assessments | stable |
| LinkedIn Help: Verifications on your LinkedIn profile | https://www.linkedin.com/help/linkedin/answer/a1359065/verifications-on-your-linkedin-profile | help-center | Verification types, badge behavior, availability limits, LinkedIn's own profile-view and engagement averages | likely |
| LinkedIn Help: Identity verification via CLEAR | https://www.linkedin.com/help/linkedin/answer/a1485597 | help-center | CLEAR eligibility and geography constraints | likely |
| LinkedIn Help: Identity verification via Persona | https://www.linkedin.com/help/linkedin/answer/a6513799 | help-center | Persona eligibility and device requirements | likely |

## 3. Removed or downgraded sources

The previous source list included arXiv 360Brew research, LinkedIn creator commentary, vendor posts, and an open-source outreach example. Those are not official LinkedIn product documentation. Retain 360Brew only as a disputed research context in prose when needed, not as support for live LinkedIn ranking claims.

No clean official source was found for exact field limits across every profile section, fixed Feed weights, posting-time formulas, semantic scores, full 360Brew rollout, applicant outcomes, or recruiter-search ranking guarantees. Treat those claims as `likely`, `inferred`, or `disputed` depending on inspected evidence.

---

See also: [LinkedIn profile optimization](./README.md) and [runtime knowledge](../../.skills/agent-skill/agentkit-seo-linkedin/wiki/knowledge.md).
