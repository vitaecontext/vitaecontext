<!--
metadata:
  title: "LinkedIn profile optimization"
  platform: "linkedin"
  objective: "Master index for optimizing LinkedIn profiles around current ranking signals, search discovery, and AI-readable profile structure."
  status: "draft"
  last_updated: "2026-05-11"
  tags: ["linkedin", "360Brew", "search", "ai"]
  agent_priority: "high"
-->

# LinkedIn profile optimization

> This directory helps turn a LinkedIn profile from a generic professional summary into a searchable, evidence-backed profile that recruiters and AI tools can understand.
> Public web page: [LinkedIn optimization playbook](https://agentkit-seo.github.io/playbooks/linkedin/).

---

## 1. Overview: The dual-audience problem

Most LinkedIn profiles sound polished and say very little. They use broad claims, vague titles, and soft skills that are hard to verify.

Optimizing a LinkedIn profile is no longer just about adding keywords for a human recruiter to skim. You are now optimizing for two distinct, machine-driven audiences simultaneously.

The first audience is LinkedIn's own ranking, recommendation, and people-search systems. LinkedIn's official help pages say these systems use signals from profile identity, content quality, and recent activity to personalize what members see.

The second audience consists of external AI tools used in recruiting and research. These tools may consume LinkedIn profile data through exports, enrichment products, browser automation, or scraping. The safest optimization strategy is still the same: use explicit job titles, clean skill names, and structured proof of work.

As of April 28, 2026, public commentary around 360Brew is disputed. Some creator and vendor articles describe it as deployed, but secondary reporting and LinkedIn posts quote LinkedIn VP Tim Jurka saying 360Brew was tested with a small group of members and shut down. This module therefore treats 360Brew as research and public debate, not as a production rulebook.

This module provides the structural rules, formatting constraints, and content formulas needed to satisfy both audiences while maintaining an engaging narrative for the human reader who ultimately makes the hiring decision.

```text
Weak headline:
"Student | Developer | Tech enthusiast"

Stronger headline:
"Cybersecurity engineering student | Security research, Python, Linux, network security"
```

## 2. Use this module when

- A LinkedIn profile needs clearer positioning for recruiters, search, or external AI tools.
- The headline, About section, Experience, Featured section, or Skills list feels generic.
- Public profile claims need to stay aligned with the CV, GitHub, portfolio, and context file.
- The user wants activity and engagement advice without relying on algorithm folklore.

## 3. Fast path

1. For a full profile audit, start with [Profile architecture](./profile-architecture.md).
2. For visible positioning, use [Headline strategy](./headline-strategy.md) and [About section](./about-section.md).
3. For proof of work, use [Experience and skills](./experience-and-skills.md) and [Featured section](./featured-section.md).
4. For AI-readable structure, use [AI agent optimization](./ai-agent-optimization.md).
5. For posting and commenting, use [Engagement strategy](./engagement-strategy.md).

## 4. Module index

The optimization logic is divided into the following documents, ordered from foundational algorithms to specific section strategies:

- **[360Brew and ranking signals](./algorithm-360brew.md):** What LinkedIn officially documents, what the public 360Brew debate shows, and what should still be treated as inference.
- **[AI agent optimization](./ai-agent-optimization.md):** Rules for making the profile easy for external AI tools, parsers, and enrichment workflows to understand.
- **[Profile architecture](./profile-architecture.md):** Visual and structural basics, including custom URLs, the Verifications badge, the Voice badge, and Location settings.
- **[Headline strategy](./headline-strategy.md):** Strict formulas for writing highly discoverable, keyword-rich headlines without corporate fluff.
- **[About section](./about-section.md):** Constraints for writing the About section, focusing on first-person voice, clear role positioning, and readable evidence.
- **[Experience and skills](./experience-and-skills.md):** How to keep profile facts aligned with the CV, surface proof links, and use current LinkedIn skills features well.
- **[Featured section](./featured-section.md):** Structuring the Featured carousel with "Proof of Work" (video demos, architecture diagrams, GitHub repositories).
- **[Engagement strategy](./engagement-strategy.md):** Evidence-based posting and commenting practices that align with documented relevance and quality signals.
- **[Sources](./sources.md):** Official help pages, the 360Brew paper, and limited external sources used in this module.

## 5. Reference profiles

The following LinkedIn profiles are actively maintained using the strategies defined in this module and serve as real-world examples of dual-audience optimization:

- **Renato Mignone**: [linkedin.com/in/renato-mignone](https://www.linkedin.com/in/renato-mignone/)
- **Elia Innocenti**: [linkedin.com/in/eliainnocenti](https://www.linkedin.com/in/eliainnocenti/)

## 6. Usage for agents

When an AI agent is tasked with optimizing a user's LinkedIn profile:

1. Review this index to determine which specific sub-module is relevant to the task.
2. If optimizing the overall profile positioning, load `algorithm-360brew.md` and `ai-agent-optimization.md`.
3. If rewriting specific text sections, load `headline-strategy.md` or `about-section.md`.
4. Prefer official LinkedIn guidance over third-party folklore, and label any inferred algorithm behavior as inference rather than fact.

---

Runtime skill: [.skills/agent-skill/agentkit-seo-linkedin/SKILL.md](../../.skills/agent-skill/agentkit-seo-linkedin/SKILL.md). Source notes: [sources.md](./sources.md).
