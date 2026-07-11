# VitaeGraph maintenance and migration

## Maintenance workflow

Use this workflow for an existing graph. Read `VITAEGRAPH.md`, `index.md`, the target records, and only the records connected through affected parent or related-record links.

1. State the requested correction or structural outcome.
2. Inventory affected record IDs, paths, parents, related records, root summaries, and index links.
3. Separate verified corrections from unresolved source conflicts.
4. Preview destructive or many-record actions before writing.
5. Apply the smallest coherent change.
6. Update backlinks, root synthesis, and `index.md` only where the change affects them.
7. Validate the graph, then rebuild generated indexes when canonical Markdown changed.

## Stable identity

- Preserve a record ID when only its title, status, path, or wording changes.
- When moving a record, update Markdown links and keep its ID stable.
- When splitting one record, keep the original ID on the record that retains the original subject. Give the new subject a new ID and connect the records when the source supports the relationship.
- When merging duplicates, choose the surviving ID before writing, redirect relationships to it, and remove the duplicate only after approval.

## Corrections and conflicts

- Correct a fact directly when the supplied source clearly supersedes the old value.
- When sources conflict and precedence is unclear, preserve the conflict under `Open questions` and ask for the smallest fact needed to resolve it.
- Do not retain a polished but unsupported statement merely to avoid changing a summary.
- Recheck `VITAEGRAPH.md` and `index.md` after correcting dates, titles, status, ownership, target direction, or claims to avoid.

## Removal rules

Preview the record path, ID, inbound relationships, and index links before deletion. Delete only when the user asked for removal or confirmed that the subject is a duplicate, erroneous, or intentionally retired record.

Before deleting:

- remove or redirect inbound `parent` and `related_records` references
- repair readable Markdown links
- decide whether useful content belongs in a surviving record
- update root and index summaries that mention the record

Do not delete a record merely because it is old, private, incomplete, or outside the current positioning. Historical depth is part of the graph unless the user chooses otherwise.

## Migration rules

For hierarchy or path migrations, return a compact preview containing old path, new path, stable ID, relationship changes, and links to repair. Apply the migration only after approval when it spans multiple records or removes paths.

Generated files are never migrated manually. Validate canonical Markdown and rebuild `.generated/` after the migration.
