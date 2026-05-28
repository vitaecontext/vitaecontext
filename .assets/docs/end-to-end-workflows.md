# AgentKit SEO end-to-end demos

This file demonstrates what AgentKit SEO can do once an agent already has the skills installed and available. It assumes the user is working inside a provider agentic coding tool such as Codex, Claude Code, Gemini CLI, Antigravity, OpenCode, or another environment that can read files, inspect public URLs, process pasted text, and use screenshots when the provider supports image inputs.

These demos are not installation instructions. Use [getting-started.md](./getting-started.md) for setup and [architecture-map.md](./architecture-map.md) for maintainer validation.

## 1. Demo setup

The user starts with scattered career material:

```text
Inputs available:
- current CV as PDF, DOCX text, LaTeX, or Markdown
- LinkedIn profile export, pasted sections, or screenshots
- GitHub profile URL and selected repository URLs
- portfolio URL or local source folder
- X/Twitter profile URL, pinned post, recent posts, or screenshots
- target roles or job descriptions
- project notes, metrics, demos, talks, articles, and proof links
```

The agent should first route through the root skill or the root runtime wiki, then load only the module needed for the current task.

```text
Use AgentKit SEO to plan the workflow before editing anything.
Inspect the available inputs, choose the relevant skill, and tell me which files,
screenshots, URLs, or pasted sections you need for the first pass.
Do not invent missing facts.
```

Expected agent output:

```text
- selected AgentKit SEO module
- inputs already usable
- smallest missing input set
- proposed first-pass workflow
- risks or inaccessible surfaces
```

## 2. Demo: build the private context file

Goal: turn scattered material into one private source of truth before optimizing public surfaces.

Example inputs:

```text
- ~/career/current-cv.pdf
- pasted LinkedIn About and Experience sections
- https://github.com/<user>
- https://<user>.github.io
- screenshots of LinkedIn Featured and Skills sections
- target role: security-focused software engineer
- project notes with metrics and proof links
```

Prompt:

```text
Use agentkit-seo-agent-context-optimization.

Create my agent-context-file from these inputs:
- CV: ~/career/current-cv.pdf
- LinkedIn sections: pasted below
- GitHub: https://github.com/<user>
- Portfolio: https://<user>.github.io
- Screenshots: LinkedIn Featured and Skills sections attached
- Target role: security-focused software engineer
- Project notes: pasted below

Write the result to ~/.agentkit-seo/<name>-context.md if file editing is available.
Separate verified facts, supplied context, inferences, and missing evidence.
Ask before turning uncertain claims into public copy.
```

Expected output:

```text
- context-file draft or saved file path
- source ledger for every major claim
- conflicts found across CV, LinkedIn, GitHub, and portfolio material
- missing evidence list
- reusable positioning summary
- next recommended platform skill
```

## 3. Demo: GitHub profile and repository audit

Goal: improve hiring visibility and agent-readiness on GitHub without rewriting unsupported claims.

Example inputs:

```text
- ~/.agentkit-seo/<name>-context.md
- GitHub profile URL
- 2-3 repository URLs
- local checkout for one portfolio repository
- optional screenshot of pinned repositories
```

Prompt:

```text
Use agentkit-seo-github.

Audit my GitHub profile and selected repositories for hiring visibility.
Read my context file first:
~/.agentkit-seo/<name>-context.md

Inputs:
- Profile: https://github.com/<user>
- Repositories:
  - https://github.com/<user>/<repo-1>
  - https://github.com/<user>/<repo-2>
- Local repository path for code inspection: ./<repo-1>
- Screenshot attached: current pinned repositories

Return an evidence-labeled audit, then propose concrete README, About, topic,
pinned-repo, social-preview, and agent-readiness improvements.
```

Expected output:

```text
- source ledger: profile, repositories, local files, screenshots, inaccessible inputs
- quick wins ranked by impact
- profile README recommendations
- repository README and About text improvements
- topic and pinned repository recommendations
- agent-readiness suggestions only where they fit the repository
- patch plan when local files can be edited
```

## 4. Demo: LinkedIn profile rewrite

Goal: rewrite profile sections from verified facts, supplied section text, screenshots, and proof links.

Example inputs:

```text
- ~/.agentkit-seo/<name>-context.md
- pasted LinkedIn headline, About, Experience, Featured, and Skills sections
- screenshots of profile layout or Featured cards
- target job description
- proof links from GitHub, portfolio, articles, talks, or demos
```

Prompt:

```text
Use agentkit-seo-linkedin.

Optimize my LinkedIn profile for the target role below.
Read my context file first:
~/.agentkit-seo/<name>-context.md

Inputs:
- Current LinkedIn headline, About, Experience, Featured, and Skills sections pasted below
- Screenshots attached for layout and Featured assets
- Target job description pasted below
- Proof links pasted below

Return:
1. Evidence-labeled audit
2. Rewritten headline options
3. Rewritten About section
4. Experience bullet improvements
5. Featured and Skills recommendations
6. Missing inputs needed for a stronger second pass
```

Expected output:

```text
- profile inputs used and missing sections
- search and positioning diagnosis
- rewritten sections grounded in context
- proof-link recommendations
- claims blocked until evidence is supplied
- depth note for login-gated or inaccessible profile areas
```

## 5. Demo: ATS-safe CV tailoring

Goal: tailor a CV to a target role while preserving parser safety and factual accuracy.

Example inputs:

```text
- ~/.agentkit-seo/<name>-context.md
- current CV as LaTeX, Markdown, DOCX text, or extracted PDF text
- target job description
- optional screenshot or PDF render for visual QA
```

Prompt:

```text
Use agentkit-seo-cv-ats.

Tailor my CV for this target role without inventing facts.
Read my context file first:
~/.agentkit-seo/<name>-context.md

Inputs:
- CV source file: ./cv/main.tex
- Rendered PDF: ./cv/main.pdf
- Target job description pasted below

Return a parser-safe audit and propose edits.
If editing is available, patch the LaTeX source and then run a compact QA pass
against the rendered text.
```

Expected output:

```text
- inputs used and target-role assumptions
- parser-risk findings
- keyword and evidence alignment
- revised summary, bullets, and section ordering
- unsupported claims removed or flagged
- post-build QA notes for rendered PDF and extracted text when available
```

## 6. Demo: portfolio SEO and AI readability

Goal: inspect a live or local portfolio and improve metadata, structured data, content clarity, proof links, and crawlability.

Example inputs:

```text
- ~/.agentkit-seo/<name>-context.md
- portfolio URL
- local source folder or built HTML
- screenshots of key pages
- target audience or role
```

Prompt:

```text
Use agentkit-seo-web-portfolio.

Audit my portfolio for SEO, AI readability, and hiring proof.
Read my context file first:
~/.agentkit-seo/<name>-context.md

Inputs:
- Live site: https://<user>.github.io
- Local source: ./portfolio
- Screenshots attached for homepage, project page, and mobile layout
- Target audience: recruiters and engineering managers for security/software roles

Return an audit and a patch plan.
If local editing is available, update metadata, structured data, page copy,
project proof links, and crawlability files where appropriate.
```

Expected output:

```text
- crawled or inspected pages
- metadata and structured-data findings
- content clarity and proof gaps
- sitemap, robots, canonical, and indexability checks
- patch plan or applied changes
- verification commands or rendered-output checks
```

## 7. Demo: X/Twitter profile and posting surface

Goal: align the profile, pinned post, recent posts, and proof links with the user's professional positioning.

Example inputs:

```text
- ~/.agentkit-seo/<name>-context.md
- public X/Twitter profile URL
- pasted bio, pinned post, and recent posts
- screenshots if public access is blocked or incomplete
- target audience and posting constraints
```

Prompt:

```text
Use agentkit-seo-x-twitter.

Audit my X/Twitter profile and recent posts for professional positioning.
Read my context file first:
~/.agentkit-seo/<name>-context.md

Inputs:
- Profile: https://x.com/<user>
- Bio, pinned post, and 10 recent posts pasted below
- Screenshots attached if public access is incomplete
- Target audience: technical founders, security engineers, and hiring managers

Return profile rewrite options, pinned-post improvements, topic-lane guidance,
and a short posting plan. Label ranking or Premium-dependent advice by confidence.
```

Expected output:

```text
- public inputs inspected and blocked inputs
- bio and pinned-post rewrite options
- topic lanes connected to verified proof
- recent-post pattern diagnosis
- confidence labels for ranking, Premium, or platform-dependent advice
- missing inputs for a deeper account pass
```

## 8. Demo: full cross-platform refresh

Goal: coordinate all public surfaces from the same private context file.

Prompt:

```text
Use AgentKit SEO for a full cross-platform refresh.

Start from my context file:
~/.agentkit-seo/<name>-context.md

Surfaces:
- GitHub profile and selected repos
- LinkedIn profile sections
- CV source and target job description
- Portfolio URL and local source
- X/Twitter bio, pinned post, and recent posts

Plan the work in phases. Start with consistency and evidence checks before
rewriting public copy. Do not load every module at once; route one step at a time.
```

Expected output:

```text
- cross-platform source ledger
- consistency conflicts across surfaces
- recommended module order
- first-pass changes by surface
- shared positioning language
- claims that need more evidence
- follow-up prompts for each focused skill
```

## 9. See also

- [Getting started](./getting-started.md)
- [Architecture map](./architecture-map.md)
- [Root runtime wiki](../../.skills/agent-skill/agentkit-seo/wiki/agentkit-seo.md)
- [Agent context optimization hub](../../hub/agent-context-optimization/README.md)
