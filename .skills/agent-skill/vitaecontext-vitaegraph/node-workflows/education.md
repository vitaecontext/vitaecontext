# Education node workflow

Load this workflow when sources mention a degree, university program, academic course, or thesis.

## Plan the subtree

Create one degree directory per program:

```text
education/<degree-slug>/
├── education.md
├── thesis.md
└── courses/
    └── <course-slug>.md
```

Create `thesis.md` only when a thesis exists. Create individual course records only when the sources contain enough detail to explain topics, practical work, or useful capabilities. A transcript line alone belongs in the degree's coursework map, not automatically in a separate file.

## Build the degree record

Extract and reconcile the institution, official degree title, field, dates, location, completion state, academic focus, relevant coursework, projects, distinctions, and developed capabilities. Link substantial academic projects to project records instead of duplicating their detail.

Use `type: education` and `id: education:<stable-slug>` in `education.md`.

## Build course records

Place university courses only under their degree's `courses/` directory. Set `parent` to the degree ID. Cover course context, substantive topics, assessed or practical work, knowledge developed, and related records. Do not claim professional expertise from attendance alone.

## Build the thesis record

Place the thesis directly under its degree directory and set `parent` to the degree ID. Cover the research question, motivation, method, artifact or implementation, findings, limitations, personal contribution, technologies, career relevance, and public links.

Do not flatten the thesis into a top-level directory or turn it into a generic project summary. Create a related project node only when the thesis produced a substantial implementation that merits its own project record.

## Completeness gate

Re-read all education sources after drafting. Check degree dates and names across files, confirm every course and thesis parent, link academic projects, and ensure the degree overview synthesizes its children.
