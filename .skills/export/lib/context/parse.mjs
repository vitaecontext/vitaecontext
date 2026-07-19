import fs from "node:fs";
import path from "node:path";

const REQUIRED_SECTIONS = ["goals and targeting", "education", "skills index", "languages"];
const ORDERED_SECTIONS = [
  "goals and targeting",
  "education",
  "professional experience",
  "research and publications",
  "skills index",
  "certifications and achievements",
  "languages",
  "extracurricular and leadership",
  "output preferences",
  "public profile snapshot"
];
const TLDR_TAGS = new Set(["PROJECT", "THESIS", "COMPETITION", "ROLE"]);
const EMPTY_VALUE = /^(?:null|n\/a|na|none|undefined|tbd|todo|-)$/i;
const PLACEHOLDER = /(?:\[(?:your|replace|add|insert|describe)\b[^\]]*\]|<(?:name|path|role|value)[^>]*>|\bTODO\b|\bTBD\b)/i;

function normalizeHeading(value) {
  return value
    .replace(/[`*_]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function scanMarkdown(content) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const visible = [];
  let fence = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const marker = line.match(/^\s*(```+|~~~+)/)?.[1] ?? null;
    if (marker) {
      if (!fence) fence = marker[0];
      else if (marker[0] === fence) fence = null;
      visible.push("");
      continue;
    }
    visible.push(fence ? "" : line);
  }

  return { lines, visible };
}

function parseInlineList(value) {
  const inner = value.slice(1, -1).trim();
  if (!inner) return [];
  return inner.split(",").map((entry) => entry.trim().replace(/^['"]|['"]$/g, ""));
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) return parseInlineList(trimmed);
  if (/^(?:true|false)$/i.test(trimmed)) return trimmed.toLowerCase() === "true";
  if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) return Number(trimmed);
  return trimmed.replace(/^['"]|['"]$/g, "");
}

export function parseFlatYaml(content) {
  const values = {};
  const errors = [];
  const lines = content.replace(/\r\n/g, "\n").split("\n");

  for (let index = 0; index < lines.length; index += 1) {
    const raw = lines[index];
    if (!raw.trim() || raw.trimStart().startsWith("#")) continue;
    if (/^\s/.test(raw)) {
      errors.push({ line: index + 1, message: "Unexpected indentation; QUICK REFERENCE supports flat values and flat arrays only" });
      continue;
    }
    const match = raw.match(/^([A-Za-z][A-Za-z0-9_-]*):(?:\s*(.*))?$/);
    if (!match) {
      errors.push({ line: index + 1, message: "Invalid QUICK REFERENCE YAML entry" });
      continue;
    }
    const [, key, rawValue = ""] = match;
    if (Object.hasOwn(values, key)) {
      errors.push({ line: index + 1, message: `Duplicate QUICK REFERENCE field: ${key}` });
      continue;
    }

    if (rawValue.trim()) {
      let value = rawValue.trim();
      const quote = value.startsWith('"') ? '"' : value.startsWith("'") ? "'" : null;
      while (quote && !value.endsWith(quote) && index + 1 < lines.length && /^\s+\S/.test(lines[index + 1])) {
        index += 1;
        value += ` ${lines[index].trim()}`;
      }
      values[key] = parseScalar(value);
      continue;
    }

    const items = [];
    while (index + 1 < lines.length) {
      const item = lines[index + 1].match(/^\s{2,}-\s+(.+)$/);
      if (!item) break;
      items.push(parseScalar(item[1]));
      index += 1;
    }
    if (items.length === 0) {
      errors.push({ line: index + 1, message: `QUICK REFERENCE field '${key}' has no value` });
    }
    values[key] = items;
  }

  return { values, errors };
}

function findHeadings(visible) {
  const headings = [];
  for (let index = 0; index < visible.length; index += 1) {
    const match = visible[index].match(/^(#{1,6})\s+(.+?)\s*$/);
    if (!match) continue;
    headings.push({ level: match[1].length, title: match[2].trim(), normalized: normalizeHeading(match[2]), line: index + 1, index });
  }
  return headings;
}

function sectionContent(lines, headings, heading) {
  const next = headings.find((candidate) => candidate.index > heading.index && candidate.level <= heading.level);
  const end = next?.index ?? lines.length;
  return lines.slice(heading.index, end).join("\n").trim();
}

function findQuickReference(lines, headings) {
  const heading = headings.find((entry) => entry.level === 2 && entry.normalized === "quick reference");
  if (!heading) return { heading: null, yaml: null, start: null, end: null };
  let start = heading.index + 1;
  while (start < lines.length && !lines[start].trim()) start += 1;
  if (!/^\s*```ya?ml\s*$/i.test(lines[start] ?? "")) {
    return { heading, yaml: null, start, end: null };
  }
  let end = start + 1;
  while (end < lines.length && !/^\s*```\s*$/.test(lines[end])) end += 1;
  if (end >= lines.length) return { heading, yaml: null, start, end: null };
  return { heading, yaml: lines.slice(start + 1, end).join("\n"), start, end };
}

function diagnostic(code, line, message, severity = "error") {
  return { code, line, message, severity };
}

function validateKnownSectionOrder(headings, diagnostics) {
  const positions = ORDERED_SECTIONS
    .map((name) => ({ name, heading: headings.find((entry) => entry.level === 2 && entry.normalized === name) }))
    .filter((entry) => entry.heading);
  for (let index = 1; index < positions.length; index += 1) {
    if (positions[index].heading.index < positions[index - 1].heading.index) {
      diagnostics.push(diagnostic(
        "section_order",
        positions[index].heading.line,
        `'${positions[index].heading.title}' must appear after '${positions[index - 1].heading.title}'`
      ));
    }
  }
}

function validateTldrEntries(lines, headings, diagnostics) {
  for (const heading of headings.filter((entry) => entry.level >= 3)) {
    const tag = heading.title.match(/\[([A-Z]+)\]/)?.[1];
    if (!TLDR_TAGS.has(tag)) continue;
    const content = sectionContent(lines, headings, heading);
    if (!/(?:^|\n)(?:\*\*)?TL;DR(?:\*\*)?:/i.test(content)) {
      diagnostics.push(diagnostic("missing_tldr", heading.line, `${tag} entry is missing a TL;DR field`));
    }
  }
}

function validateChronology(visible, diagnostics) {
  for (let index = 0; index < visible.length; index += 1) {
    for (const match of visible[index].matchAll(/\b(19\d{2}|20\d{2})\s*[-–—]\s*(19\d{2}|20\d{2})\b/g)) {
      if (Number(match[1]) > Number(match[2])) {
        diagnostics.push(diagnostic("reversed_date_range", index + 1, `Date range starts after it ends: ${match[0]}`));
      }
    }
  }
}

function validateVerifiedFacts(content, diagnostics) {
  const comments = [...content.matchAll(/<!--\s*VERIFIED FACTS:\s*([\s\S]*?)-->/gi)];
  if (comments.length === 0) {
    diagnostics.push(diagnostic("missing_verified_facts", 1, "Add a VERIFIED FACTS comment for hard factual anchors"));
    return;
  }
  const facts = new Map();
  for (const comment of comments) {
    for (const entry of comment[1].split(/[,\n]/).map((value) => value.trim()).filter(Boolean)) {
      const match = entry.match(/^([^=]+)=(.+)$/);
      if (!match) continue;
      const key = match[1].trim().toLowerCase();
      const value = match[2].trim();
      if (facts.has(key) && facts.get(key) !== value) {
        diagnostics.push(diagnostic("conflicting_verified_fact", 1, `VERIFIED FACTS contains conflicting values for '${key}'`));
      }
      facts.set(key, value);
    }
  }
}

function findGitRoot(filePath) {
  if (!filePath) return null;
  let current = path.dirname(path.resolve(filePath));
  while (true) {
    if (fs.existsSync(path.join(current, ".git"))) return current;
    const parent = path.dirname(current);
    if (parent === current) return null;
    current = parent;
  }
}

export function parseContextDocument(content, options = {}) {
  const { lines, visible } = scanMarkdown(content);
  const headings = findHeadings(visible);
  const diagnostics = [];
  const h1s = headings.filter((entry) => entry.level === 1);

  if (h1s.length !== 1) {
    diagnostics.push(diagnostic("h1_count", h1s[0]?.line ?? 1, `Career Context must contain exactly one H1; found ${h1s.length}`));
  } else if (!/\s[-–—]\s/.test(h1s[0].title)) {
    diagnostics.push(diagnostic("h1_descriptor", h1s[0].line, "H1 must include a full name and positioning descriptor separated by a dash"));
  }

  const quick = findQuickReference(lines, headings);
  let quickReference = {};
  if (!quick.heading) {
    diagnostics.push(diagnostic("missing_quick_reference", h1s[0]?.line ?? 1, "Missing QUICK REFERENCE H2 section"));
  } else {
    const firstH2 = headings.find((entry) => entry.level === 2);
    if (firstH2 !== quick.heading) {
      diagnostics.push(diagnostic("quick_reference_position", quick.heading.line, "QUICK REFERENCE must be the first H2 after the title"));
    }
    if (!quick.yaml) {
      diagnostics.push(diagnostic("quick_reference_yaml", quick.heading.line, "QUICK REFERENCE must begin with a closed YAML fence"));
    } else {
      const parsed = parseFlatYaml(quick.yaml);
      quickReference = parsed.values;
      for (const error of parsed.errors) {
        diagnostics.push(diagnostic("quick_reference_yaml", (quick.start ?? quick.heading.index) + error.line + 1, error.message));
      }
      for (const field of ["name", "positioning_summary"]) {
        if (!quickReference[field]) diagnostics.push(diagnostic("missing_quick_field", quick.heading.line, `QUICK REFERENCE is missing '${field}'`));
      }
      for (const [key, value] of Object.entries(quickReference)) {
        const values = Array.isArray(value) ? value : [value];
        if (values.some((entry) => typeof entry === "string" && (EMPTY_VALUE.test(entry.trim()) || PLACEHOLDER.test(entry)))) {
          diagnostics.push(diagnostic("empty_quick_value", quick.heading.line, `QUICK REFERENCE field '${key}' contains an empty or placeholder value`));
        }
      }
    }
  }

  const goalsDeclined = /<!--\s*goals_declined:\s*true\s*-->/i.test(content);
  for (const required of REQUIRED_SECTIONS) {
    if (required === "goals and targeting" && goalsDeclined) continue;
    if (!headings.some((entry) => entry.level === 2 && entry.normalized === required)) {
      diagnostics.push(diagnostic("missing_section", 1, `Missing required section: ${required}`));
    }
  }

  if (quick.end !== null) {
    const nextH2 = headings.find((entry) => entry.level === 2 && entry.index > quick.heading.index);
    const scope = lines.slice((quick.end ?? quick.heading.index) + 1, nextH2?.index ?? lines.length).join("\n")
      .replace(/<!--[\s\S]*?-->/g, "")
      .trim();
    if (!scope) diagnostics.push(diagnostic("missing_scope_declaration", quick.heading.line, "Add a short scope declaration after QUICK REFERENCE"));
  }

  validateKnownSectionOrder(headings, diagnostics);
  validateTldrEntries(lines, headings, diagnostics);
  validateChronology(visible, diagnostics);
  validateVerifiedFacts(content, diagnostics);

  for (let index = 0; index < visible.length; index += 1) {
    if (PLACEHOLDER.test(visible[index])) {
      diagnostics.push(diagnostic("placeholder", index + 1, "Replace template placeholder text before using this Career Context"));
    }
  }

  if (options.filePath && findGitRoot(options.filePath) && !/<!--\s*FICTIONAL EXAMPLE:/i.test(content)) {
    diagnostics.push(diagnostic(
      "tracked_workspace_path",
      1,
      "This file is inside a Git workspace. Keep personal Career Context files out of commits and public repositories.",
      "warning"
    ));
  }

  const errors = diagnostics.filter((entry) => entry.severity === "error")
    .sort((a, b) => a.line - b.line || a.code.localeCompare(b.code));
  const warnings = diagnostics.filter((entry) => entry.severity === "warning")
    .sort((a, b) => a.line - b.line || a.code.localeCompare(b.code));
  const sections = headings
    .filter((entry) => entry.level === 2)
    .map((heading) => ({ ...heading, content: sectionContent(lines, headings, heading) }));

  return {
    schemaVersion: 1,
    valid: errors.length === 0,
    title: h1s.length === 1 ? h1s[0].title : null,
    quickReference,
    quickReferenceYaml: quick.yaml,
    sections,
    errors,
    warnings
  };
}

export function validateContextFile(filePath) {
  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) throw new Error(`Career Context file does not exist: ${absolutePath}`);
  if (!fs.statSync(absolutePath).isFile()) throw new Error(`Career Context path is not a file: ${absolutePath}`);
  const result = parseContextDocument(fs.readFileSync(absolutePath, "utf8"), { filePath: absolutePath });
  return { ...result, path: absolutePath };
}
