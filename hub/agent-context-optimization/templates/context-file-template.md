<!--
metadata:
  title: "Personal agent context file — guided template"
  platform: "general"
  objective: "A self-contained guided template for building a valid personal agent context file, with pre-filled examples and blank placeholders for every required section."
  status: "draft"
  last_updated: "2026-04-24"
  tags: ["context-file", "template", "guided", "career"]
  agent_priority: "high"
-->

# Personal agent context file — guided template

> A complete, self-contained template for building a personal agent context file. Every section is present with a pre-filled generic example and a blank placeholder to replace with your own information.

---

## 1. Overview

This template reproduces the full structure defined in [context-file-spec.md](../context-file-spec.md). A user who has never read the spec can produce a valid context file by following this template alone. Each section contains a short pre-filled example using a generic professional in a generic field, followed by a blank placeholder block for the user to replace. The examples already pass the validation checklist in context-file-spec.md section 5.

**Rule:** When filling this template, write only verified facts. Do not add a grade before it is official, a project before it has a deliverable, or a skill before it appears in at least one course, project, role, or certification in the body.

**Rule:** Delete the example blocks before using the file in an agent session. The file you give to the agent should contain only your information.

## 2. How to use this template

Work through each section in order. For each section:

1. Read the example block to understand the correct format.
2. Replace the placeholder block with your own content, following the same format.
3. Delete the example block when you are done with that section.
4. Update the VERIFIED FACTS comment in the scope declaration every time you add a grade, score, date, ID, or ranking.

When all sections are filled and all example blocks are deleted, run the validation checklist in [context-file-spec.md](../context-file-spec.md) section 5 before using the file in a session.

## 3. Template

The template begins here. Everything from this point forward is the content of the context file you will build. When you are ready to use the file with an agent, save the filled content in your own file system and name it something memorable, for example `<name-surname>-seo-context.md`, `career-profile.md`, or `context.md`.

### Title

The title is the H1 heading of your context file. It contains your full name and a one-phrase professional descriptor that reflects your positioning, not your current job title.

Good example:

```markdown
<!-- CORRECT: full name, positioning descriptor, not a job title -->
# Alex Rivera — Software engineer with a focus on distributed systems and reliability
```

Replace the line below with your own title:

```markdown
# [Your full name] — [Your positioning descriptor]
```

### QUICK REFERENCE block

The QUICK REFERENCE block is a YAML fenced code block immediately after the title. It contains the most frequently accessed facts about you. An agent reads this block first for most tasks. Every field must be accurate and up to date.

The comments above each field in the example explain what goes there. Omit any field that has no value — do not write `null` or `N/A`.

Good example:

```yaml
# Your full name as it appears on official documents
name: Alex Rivera
# City and country where you currently live
current_location: Amsterdam, Netherlands
# The roles you are actively targeting (list up to 3)
target_roles: [Site Reliability Engineer, Platform Engineer, Backend Engineer]
# Whether you are willing to relocate for the right opportunity
open_to_relocation: true
# Cities or countries you target for applications; use [no restriction] if open
target_locations: [Amsterdam, Berlin, Remote-EU]
# Preferred work mode: remote, hybrid, or onsite
work_mode: hybrid
# One compact sentence combining verified identity and future direction
positioning_summary: "Platform engineer with verified distributed-systems foundations, building toward staff-level reliability and developer-platform leadership."
# The role you ultimately want, even if a step beyond your current target
ideal_role: Staff Site Reliability Engineer
# What you are focused on now and want to work on next
current_focus: Kubernetes operator development and SLO-driven reliability
# Problems, domains, or responsibilities you want to move toward next
want_to_work_on_next: developer-platform tooling, incident-reduction systems, and mentoring junior engineers
# The future domain, seniority, or role family you are building toward
growth_direction: Staff-level platform reliability and developer experience
# Emerging topics that should guide positioning but not be overstated
emerging_interests: [platform product strategy, reliability coaching, incident learning systems]
# Which direction claims are verified, emerging, or target development areas
evidence_boundaries: "Kubernetes, observability, and backend reliability are verified; staff-level leadership is a growth direction supported by mentoring and project ownership examples."
# Rules for framing your transition without exaggeration
positioning_constraints: "Frame staff-level reliability as a direction, not as a current title."
# Claims that should not appear unless new evidence is added
claims_to_avoid: [Staff Engineer title, company-wide incident ownership, formal people management]
# Professional and personal interests that shape your direction
interests: [open-source infrastructure, distributed systems, mentoring, climbing]

education:
  # Format: "[DEGREE] Degree Name | Institution | Grade | Month Year"
  - "[DEGREE] MSc in Computer Science | University of Amsterdam | 8.4/10 | June 2024"
  - "[DEGREE] BSc in Computer Engineering | TU Delft | 7.9/10 | July 2022"

# All graded courses on one comma-separated line: "Course Name: grade, ..."
gpa_summary: "Distributed Systems: 9/10, Cloud Architectures: 8.5/10, Operating Systems: 8/10, Algorithms: 8/10, Databases: 7.5/10"

professional:
  # Format: "[ROLE] Job Title | Company | Period"
  - "[ROLE] Platform Engineering Intern | Booking.com | June 2023 – August 2023"

# 8–15 skills ordered from most to least central to your positioning
top_skills: [Kubernetes, Go, Python, distributed systems, observability, Prometheus, Grafana, Terraform, Linux, PostgreSQL, gRPC, CI/CD]
# Tools and platforms you work with regularly
tools: [Kubernetes, Terraform, Prometheus, Grafana, Docker, GitHub Actions, GCP]

competitions:
  # Format: "Result — Competition Name (Year)"
  - "2nd Place — ICPC Regional Finals, Northwestern Europe (2022)"

certifications:
  # Format: "Cert Name | Issuer | Date | ID: XXXXXXX"
  - "Certified Kubernetes Administrator (CKA) | CNCF | March 2024 | ID: CKA-2024-0042"

languages:
  # Format: "Language: Level (Certificate if applicable)"
  - "Spanish: Native"
  - "English: C1 (Cambridge CAE, Score 191, ID A2389017)"
  - "Dutch: B1"

github: https://github.com/alexrivera
linkedin: https://linkedin.com/in/alexrivera
portfolio: https://alexrivera.dev
```

Replace the block below with your own QUICK REFERENCE block:

```yaml
name:
current_location:
target_roles: []
open_to_relocation:
target_locations: []
work_mode:
positioning_summary:
ideal_role:
current_focus:
want_to_work_on_next:
growth_direction:
emerging_interests: []
evidence_boundaries:
positioning_constraints:
claims_to_avoid: []
interests: []

education:
  - ""

gpa_summary: ""

professional:
  - ""

top_skills: []
tools: []

competitions:
  - ""

certifications:
  - ""

languages:
  - ""

github:
linkedin:
```

### Goals and targeting

This section records where you want to go, not what you have already done. Unlike the rest of the file, it holds stated intent and preferences rather than verified facts, so downstream skills can aim output (role, tone, location, keywords) without inventing experience. Keep it honest but forward-looking, and write `No restriction` wherever you have no constraint.

Good example:

```markdown
**Ideal role:** Staff Site Reliability Engineer at an infrastructure-focused product company.
**Current focus:** Kubernetes operator development and SLO-driven reliability; want to move from service ownership into platform-wide reliability.
**Want to work on next:** developer-platform tooling, incident-reduction systems, and mentoring junior engineers.
**Growth direction:** Staff-level platform reliability and developer experience.
**Target locations:** Amsterdam or Berlin on a hybrid basis; open to remote within the EU. No relocation outside the EU for now.
**Interests:** open-source infrastructure, distributed systems, technical writing, climbing.
**Evidence boundaries:** Kubernetes, observability, and backend reliability are verified; staff-level leadership is a growth direction supported by mentoring and project ownership examples.
**Positioning constraints:** Frame staff-level reliability as a direction, not as a current title.
**Claims to avoid:** Staff Engineer title, company-wide incident ownership, formal people management.
**Constraints:** needs visa sponsorship outside the EU; not pursuing pure management tracks.
```

Replace the block below with your own goals and targeting. Keep each line to stated intent, and use `No restriction` where you have no constraint:

```markdown
**Ideal role:** [The role you ultimately want.]
**Current focus:** [What you are working on and improving now.]
**Want to work on next:** [Problems, domains, or responsibilities you are aiming for.]
**Growth direction:** [Future domain, role family, seniority, or positioning shift you are building toward.]
**Target locations:** [Cities, countries, remote or hybrid preference, relocation stance, or No restriction.]
**Interests:** [Professional and personal interests that shape your direction.]
**Evidence boundaries:** [Which direction claims are verified, emerging, or target development areas.]
**Positioning constraints:** [Rules for framing the transition without overstating experience.]
**Claims to avoid:** [Claims that should not appear in public copy unless new evidence is supplied.]
**Constraints:** [Visa, availability, role types to avoid, or No restriction.]
```

### Scope declaration

The scope declaration is a short paragraph in third person explaining what the file is, what it is not, and what it is for. Write it so an agent reads it as instructions. Close it with the VERIFIED FACTS comment listing every atomic fact in the file that must never be hallucinated.

Good example:

```markdown
This file is a personal knowledge base documenting Alex Rivera's full academic
and professional career in software engineering and distributed systems. It is
not intended for direct distribution to third parties. Its purpose is to serve
as a structured source of truth from which career outputs can be generated —
including cover letters, CVs, LinkedIn sections, and interview preparation
material. All facts, grades, dates, and names are verified.

<!-- VERIFIED FACTS: bsc_grade=7.9/10, bsc_graduation=2022-07, msc_grade=8.4/10,
msc_graduation=2024-06, cka_id=CKA-2024-0042, cert_score=191, cert_id=A2389017,
competition_result=2nd_place, competition_year=2022 -->
```

Replace the block below with your own scope declaration:

```markdown
This file is a personal knowledge base documenting [Your full name]'s full
[field] career. It is not intended for direct distribution to third parties.
Its purpose is to serve as a structured source of truth from which career
outputs can be generated. All facts, grades, dates, and names are verified.

<!-- VERIFIED FACTS: [list every verified fact here as key=value pairs] -->
```

### Education

Write each degree as an H2 heading using the `[DEGREE]` tag. Follow the heading with one sentence describing the degree's focus and relevance to your current positioning.

Good example:

```markdown
## [DEGREE] MSc in Computer Science (Distributed Systems) | University of Amsterdam, Amsterdam, Netherlands | 8.4/10 | September 2022 – June 2024

The master's degree focused on large-scale distributed systems design, fault tolerance, and cloud-native infrastructure, directly supporting a career in platform engineering and site reliability.
```

Replace the block below with your own degree heading and description. Add one block per degree, most recent first.

```markdown
## [DEGREE] [Degree name and classification] | [Institution, City, Country] | [Grade] | [Start Month Year – End Month Year]

[One sentence describing the degree's focus and its relevance to your current positioning.]
```

#### Courses

Group courses under semester headings. Write each course as an H4 entry with the `[COURSE]` tag. The `Topics:` line is a flat comma-separated list — do not use bullet points.

Good example:

```markdown
### Year 1 — First semester

#### [COURSE] Distributed Systems | Grade: 9/10 | Code: CS5120
Topics: consensus algorithms, Raft, Paxos, distributed transactions, fault tolerance, replication strategies, CAP theorem, CRDTs, vector clocks, distributed tracing
```

Replace the block below with your own course entries:

```markdown
### [Semester label, e.g. Year 1 — First semester]

#### [COURSE] [Course name] | Grade: [x/y] | Code: [XXXXXXX]
Topics: [comma-separated list of technical topics covered]
```

#### Projects under a course

If a course has a project, nest it under the course as an H5 entry with the `[PROJECT]` tag. The TL;DR line is required and must be under 30 words.

Good example:

```markdown
##### [PROJECT] Fault-tolerant key-value store | Repo: https://github.com/alexrivera/kvstore
**TL;DR:** Implemented a linearizable, fault-tolerant key-value store using Raft consensus in Go, achieving 99.9% availability under simulated network partitions.

**Description:** A distributed key-value store supporting linearizable reads and writes, leader election, log replication, and snapshotting.
**Technologies:** Go, gRPC, Protocol Buffers, Docker, GitHub Actions
**Key areas:** Raft leader election, log compaction, network partition handling, integration testing under fault injection
**Results:** 99.9% availability across 1,000 fault injection test runs; 12 ms median write latency under normal operation
```

Replace the block below with your own project entry:

```markdown
##### [PROJECT] [Project name] | Repo: [https://github.com/...]
**TL;DR:** [One sentence: what was built, core technologies, key result. Under 30 words.]

**Description:** [What the project is.]
**Technologies:** [comma-separated list]
**Key areas:** [What was implemented or demonstrated.]
**Results:** [Quantified outcomes.]
```

#### Thesis

Write the thesis as an H3 entry with the `[THESIS]` tag.

Good example:

```markdown
### [THESIS] Adaptive load shedding in multi-tenant stream processing systems
**Full title:** Adaptive Load Shedding Strategies for Latency-Sensitive Workloads in Multi-Tenant Stream Processing.
**Supervisors:** Prof. Ana Lucia Varbanescu, Dr. Matthijs Mekking
**Research area:** Distributed systems, stream processing, performance engineering
**TL;DR:** Designed and evaluated three adaptive load shedding strategies for Apache Flink, reducing tail latency by 34% under peak load without degrading throughput for high-priority tenants.
```

Replace the block below with your own thesis entry:

```markdown
### [THESIS] [Short title]
**Full title:** [Official full title.]
**Supervisors:** [Name, Name]
**Research area:** [Area A, Area B]
**TL;DR:** [One sentence — contribution and outcome. Under 30 words.]
```

### Professional experience

Write each role as an H3 entry with the `[ROLE]` tag. The TL;DR line is required. Follow it with bullet points covering the technical problem, tools used, and measurable outcomes.

Good example:

```markdown
### [ROLE] Platform Engineering Intern | Booking.com | Amsterdam, Netherlands | June 2023 – August 2023
**TL;DR:** Built a self-service internal developer platform feature that reduced deployment time for 120+ engineering teams by 40%.

- Designed and implemented a GitOps-based deployment pipeline using ArgoCD and Helm, replacing a manual ticketing workflow used by 120+ teams.
- Reduced mean deployment time from 47 minutes to 28 minutes across all onboarded services, measured over a 6-week rollout period.
- Wrote Terraform modules for GCP infrastructure provisioning, adopted by 3 additional platform teams after the internship ended.
- Tools: Go, Kubernetes, ArgoCD, Helm, Terraform, GCP, GitHub Actions
```

Replace the block below with your own role entry. Add one block per role, most recent first.

```markdown
### [ROLE] [Job title] | [Company] | [Location] | [Start Month Year – End Month Year]
**TL;DR:** [One sentence describing the role's scope and primary focus. Under 30 words.]

- [Technical problem addressed, with context.]
- [Tools and methodologies used.]
- [Measurable outcome, expressed as a number where possible.]
```

### Research and publications

Include this section only if you have formal research outputs: published papers, preprints, or papers under review. Omit it entirely if you have none.

Good example:

```markdown
### [PAPER] Adaptive load shedding in stream processing | EuroSys | 2024
**Full title:** Adaptive Load Shedding Strategies for Latency-Sensitive Workloads in Multi-Tenant Stream Processing.
**Authors:** Ana Lucia Varbanescu, **Alex Rivera**, Matthijs Mekking
**DOI:** https://doi.org/10.1145/xxxxxxx
**TL;DR:** Demonstrates that tenant-aware load shedding reduces tail latency by 34% in Apache Flink without throughput degradation for high-priority workloads.
```

Replace the block below with your own paper entries, or remove this section entirely if not applicable:

```markdown
### [PAPER] [Short title] | [Venue] | [Year]
**Full title:** [Full paper title.]
**Authors:** [Author A, **Your Name**, Author B]
**DOI:** [https://doi.org/...]
**TL;DR:** [One sentence — contribution and main finding. Under 30 words.]
```

### Skills index

The Skills index is a flat categorical enumeration. Each category is a bold label followed by a comma-separated list on the same line. Do not use bullet points. Every skill listed must appear in at least one other section of the file.

Good example:

```markdown
**Distributed systems:** consensus algorithms, Raft, Paxos, fault tolerance, replication, distributed transactions, CRDTs, vector clocks, CAP theorem
**Infrastructure and cloud:** Kubernetes, Terraform, GCP, Docker, Helm, ArgoCD, GitOps, infrastructure as code
**Observability:** Prometheus, Grafana, distributed tracing, OpenTelemetry, alerting, SLO/SLA definition
**Development:** Go, Python, gRPC, Protocol Buffers, REST APIs, unit testing, integration testing, CI/CD
**Databases:** PostgreSQL, Redis, distributed key-value stores, SQL query optimization
**Operating systems:** Linux, process management, memory management, scheduling, networking stack
```

Replace the block below with your own Skills index. Add or remove categories to match your field.

```markdown
**[Category A]:** [term, term, term, ...]
**[Category B]:** [term, term, term, ...]
**[Category C]:** [term, term, term, ...]
```

### Certifications and achievements

Write each entry as an H3 using the appropriate tag: `[CERT]`, `[COMPETITION]`, or `[AWARD]`. Omit this section entirely if you have none.

Good example — certification:

```markdown
### [CERT] Certified Kubernetes Administrator (CKA) | CNCF | March 2024 | ID: CKA-2024-0042
Score: Pass (no numerical score issued for CKA).
```

Good example — competition:

```markdown
### [COMPETITION] ICPC Regional Finals, Northwestern Europe | 2022 | Result: 2nd place
**TL;DR:** Placed 2nd out of 74 teams in the ICPC Northwestern Europe Regional Contest, solving 7 of 11 problems in 5 hours using C++ and combinatorial optimization.
```

Good example — award:

```markdown
### [AWARD] Outstanding Graduate Thesis Award | Faculty of Science, University of Amsterdam | June 2024
Awarded for the highest-scored master's thesis in the Computer Science department, academic year 2023–2024.
```

Replace the blocks below with your own entries, or remove any entry types that do not apply:

```markdown
### [CERT] [Certificate name] | [Issuer] | [Month Year] | ID: [XXXXXXX]
Score: [overall score and per-component breakdown if applicable].

### [COMPETITION] [Competition name] | [Year] | Result: [Nth place / Score: X]
**TL;DR:** [One sentence — the challenge and what was built or demonstrated. Under 30 words.]

### [AWARD] [Award name] | [Issuing body] | [Month Year]
[One sentence describing what was recognized and in what context.]
```

### Languages

The Languages section is a table. Use CEFR levels as the standard. Include test scores and certificate IDs in the Certificate column. Write `—` for fields with no value.

Good example:

| Language | Level | Certificate | Notes |
|---|---|---|---|
| Spanish | Native | — | — |
| English | C1 | Cambridge CAE, Score 191, ID A2389017 | — |
| Dutch | B1 | — | — |

Replace the table below with your own language entries:

| Language | Level | Certificate | Notes |
|---|---|---|---|
| [Language] | [Level or Native] | [Certificate name, Score X, ID XXXXXXX or —] | [Any relevant note or —] |

### Extracurricular and leadership

Include this section only if you have relevant organizational roles, leadership positions, or community contributions. Omit it entirely if you have none.

Each entry is an H3 with the `[ORG]` tag. Each bullet must state a concrete activity with scope indicators — numbers of events, participants, or partners. Do not write generic descriptions.

Good example:

```markdown
### [ORG] ACM Student Chapter, University of Amsterdam | Vice President | October 2022 – June 2024
- Organized 8 technical workshops per academic year (average 60 attendees per session), covering distributed systems, cloud infrastructure, and competitive programming.
- Managed sponsorship relationships with 4 industry partners (Booking.com, ASML, Adyen, Databricks), securing €4,500 in annual funding for chapter activities.
- Coordinated a 3-day hackathon (120 participants, 28 teams) with on-site mentoring from 6 industry engineers.
```

Replace the block below with your own extracurricular entries, or remove this section entirely if not applicable:

```markdown
### [ORG] [Organization name] | [Role] | [Start Month Year – End Month Year]
- [Specific, quantified contribution with scope indicators.]
- [Specific, quantified contribution with scope indicators.]
```

---

*This template implements the structure defined in [context-file-spec.md](../context-file-spec.md). Before using the filled file with an agent, run the validation checklist in context-file-spec.md section 5.*
