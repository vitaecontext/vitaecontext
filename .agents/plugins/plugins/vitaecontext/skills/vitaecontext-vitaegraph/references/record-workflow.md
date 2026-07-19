# VitaeGraph record workflow

## Initialization

Use `~/.vitaecontext/vitaegraph` unless the user supplies an exact custom directory. Do not scan for alternative graphs. Keep the compact career context file separate.

Run:

```bash
vitaecontext graph init
vitaecontext graph init --root /path/to/custom-vitaegraph
```

Use `--force` only with explicit approval.

## Canonical structure

```text
vitaegraph/
├── VITAEGRAPH.md
├── index.md
├── projects/<project-slug>/project.md
├── experience/<role-slug>/experience.md
├── education/<degree-slug>/
│   ├── education.md
│   ├── thesis.md
│   └── courses/<course-slug>.md
├── certifications/<credential-slug>.md
├── awards/<award-slug>.md
├── publications/<publication-slug>.md
└── .generated/
```

Create only directories and records supported by the supplied material.

## Record rules

- Store one coherent subject per Markdown record.
- Use stable lowercase IDs in `type:slug` form.
- Require `type`, `id`, and `title`.
- Use `parent` for containment and `related_records` for other record IDs.
- Keep a stable ID even when its title or path later improves.
- Keep uncertainty, contradictions, and missing high-value detail in prose or an `Open questions` section.
- Do not create evidence records, source ledgers, evidence references, or confidence levels.

Validate after changing records and index only after validation passes.
