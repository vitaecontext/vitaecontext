# VitaeGraph retrieval and handoff

Read `VITAEGRAPH.md`, then `index.md`. Select the smallest relevant subtree and follow `parent`, `CONTAINS`, and `RELATED_TO` relationships only as needed.

For a downstream platform task, pass:

- the selected record facts and substantive context
- demonstrated capabilities relevant to the task
- explicit limitations, contradictions, and claims to avoid
- public links needed by the downstream output

Treat `visibility: public` as eligibility for consideration, not publication consent. Before passing content to a public-output skill, apply the root `Claims to avoid`, record limitations, open questions, and the user's requested scope. A private record may still be read for internal consistency when authorized, but its private details must not appear in public copy.

Do not pass the full graph, unrelated private records, temporary repository reports, or local paths unless the user explicitly needs them. Do not invent direction, constraint, evidence, or avoid record types: target direction and claims to avoid live in `VITAEGRAPH.md`, while uncertainty belongs in record prose and `Open questions`.

When generated artifacts exist, use them for routing and lexical lookup. Treat Markdown as canonical.
