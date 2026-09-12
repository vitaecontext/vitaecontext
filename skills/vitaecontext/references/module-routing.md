# Module routing

Use this routing table when deciding which VitaeContext skill to load.

| User intent | Shared skill | Internal skill references to start with |
| --- | --- | --- |
| Personal context file, source-of-truth document, fact consolidation | `vitaecontext-build` | `references/spec-and-structure.md`, `references/operating-workflow.md` |
| Detailed career graph, hierarchical records, graph validation, indexing, or selective deep retrieval | `vitaecontext-vitaegraph` | `references/record-workflow.md`, `references/retrieval-and-handoff.md` |

## Cross-module sequence

When a request needs both private artifacts, use this order unless the user asks otherwise:

1. Resolve the factual source: use an explicit existing Career Context file for compact repeated facts, or an explicit existing VitaeGraph for selective deep records.
2. Use `vitaecontext-build` first when facts are scattered, conflicting, or no usable source of truth exists.
3. Use `vitaecontext-vitaegraph` only for records that need more depth than the compact file holds.

Do not create or convert either private artifact merely because the other one exists. If both exist, use the compact context file for current positioning and repeated hard facts, then retrieve only the smallest relevant VitaeGraph subtree for deeper evidence.

## Ambiguity tie-breakers

Use these defaults when the user asks for broad improvement without naming a module:

- Mixed facts, inconsistent claims, or more than one public surface: start with `vitaecontext-build`.
- Detailed projects, roles, degree subtrees, thesis work, record relationships, graph validation, or graph indexing: start with `vitaecontext-vitaegraph`.

If two routes remain plausible, state the assumption and proceed with the route that can produce the smallest useful next action.
