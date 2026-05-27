<!--
metadata:
  title: "ATS optimization sources"
  platform: "cv-ats"
  objective: "Centralized official sources for ATS parsing, resume upload behavior, and conservative CV formatting claims."
  status: "review"
  last_updated: "2026-05-27"
  tags: ["cv", "ats", "sources", "parsing"]
  agent_priority: "low"
-->

# ATS optimization sources

> This file lists official or maintainer-published sources that can support CV and ATS claims. Candidate-facing resume advice that lacks an official ATS or parser source must stay `likely`, `inferred`, or `disputed` in runtime wiki entries.

---

## 1. Overview

The `cv-ats` module uses official ATS, recruiting-platform, and parser documentation where possible. University career-center pages, resume-tool blogs, agency posts, and community experiments are useful background, but they do not support `stable` platform-behavior claims.

## 2. Source table

| Source | URL | Type | Covers | Confidence |
|---|---|---|---|---|
| Greenhouse: Unsuccessful resume parse | https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse | help-center | Resume parse failure causes, file-size limits, image-only uploads, graphics, tables, headers, footers, text boxes, columns, unclear sections, incomplete titles | stable |
| Greenhouse: Manually add a candidate or prospect | https://support.greenhouse.io/hc/en-us/articles/115002195063-Manually-add-a-candidate-or-prospect | help-center | Resume upload parsing, required manual verification after parsing, embedded-image and layout risks | stable |
| Greenhouse: Resume parsing with non-English languages | https://support.greenhouse.io/hc/en-us/articles/205019689-Resume-parsing-with-non-English-languages | help-center | Language support boundaries for one ATS parser surface | likely |
| SmartRecruiters Developers: Parse a resume | https://developers.smartrecruiters.com/reference/candidatesresumeparse | official-docs | Resume parse endpoint behavior and incomplete-resume parse result | stable |
| Oracle Taleo: Plain Text Resume Parsing for Mobile Devices | https://docs.oracle.com/en/cloud/saas/taleo-enterprise/24c/otcug/c-plaintextresumeparsingmobile.html | official-docs | Plain-text resume paste parsing into candidate records and attached text files | stable |

## 3. Removed or downgraded sources

The previous source list included MIT CAPD, Microsoft Create, Yale Office of Career Strategy, and generic candidate advice. Those are not official ATS or parser sources. Keep their guidance as editorial background only, not as support for `stable` parser behavior.

No clean official source was found for universal claims about exact ATS scores, hidden knockout filters, universal parser ranking, or a single best submission format across all employers. Treat those claims as `inferred` or `disputed`.

---

See also: [CV and ATS optimization](./README.md) and [runtime knowledge](../../.skills/agent-skill/agentkit-seo-cv-ats/wiki/knowledge.md).
