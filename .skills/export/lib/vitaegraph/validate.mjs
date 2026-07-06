import fs from "node:fs";
import path from "node:path";

import { RECORD_DIRECTORIES, parseVitaeGraph } from "./parse.mjs";

const ID_PATTERN = /^[a-z][a-z0-9-]*:[a-z0-9][a-z0-9-]*$/;
const RECORD_TYPES = new Set([
  "project",
  "experience",
  "education",
  "course",
  "thesis",
  "certification",
  "award",
  "publication"
]);

function asList(value) {
  if (value === undefined || value === null || value === "") return [];
  return Array.isArray(value) ? value : [value];
}

function internalLinkTarget(graph, page, href) {
  const withoutAnchor = href.split("#")[0];
  if (
    !withoutAnchor ||
    /^[a-z][a-z0-9+.-]*:/i.test(withoutAnchor) ||
    withoutAnchor.startsWith("/")
  ) return null;
  try {
    return path.resolve(path.dirname(page.absolutePath), decodeURIComponent(withoutAnchor));
  } catch {
    return false;
  }
}

function expectedTypeForPath(relativePath) {
  const parts = relativePath.split("/");
  if (parts[0] === "projects") return "project";
  if (parts[0] === "experience") return "experience";
  if (parts[0] === "certifications") return "certification";
  if (parts[0] === "awards") return "award";
  if (parts[0] === "publications") return "publication";
  if (parts[0] !== "education") return null;
  if (parts.at(-1) === "education.md") return "education";
  if (parts.at(-1) === "thesis.md") return "thesis";
  if (parts.includes("courses")) return "course";
  return "education";
}

function canonicalPathFor(page) {
  const parts = page.path.split("/");
  const type = page.attributes?.type;
  if (type === "education") return parts.length === 3 && parts[2] === "education.md";
  if (type === "thesis") return parts.length === 3 && parts[2] === "thesis.md";
  if (type === "course") {
    return parts.length === 4 && parts[0] === "education" && parts[2] === "courses";
  }
  if (type === "project") return parts.length === 3 && parts[2] === "project.md";
  if (type === "experience") return parts.length === 3 && parts[2] === "experience.md";
  return parts.length === 2;
}

export function validateVitaeGraph(root) {
  const graph = parseVitaeGraph(root);
  const errors = [];
  const warnings = [];
  for (const required of ["VITAEGRAPH.md", "index.md"]) {
    if (!graph.pages.some((page) => page.path === required)) {
      errors.push({ code: "missing_required_file", path: required, message: `Missing ${required}` });
    }
  }

  const ids = new Map();
  const knownIds = new Set(graph.records.map((record) => record.attributes.id));
  const recordsById = new Map(
    graph.records.map((record) => [record.attributes.id, record])
  );

  for (const page of graph.pages) {
    const firstDirectory = page.path.split("/")[0];
    const isRecordPage =
      RECORD_DIRECTORIES.has(firstDirectory) && page.path !== "evidence/source-ledger.md";
    if (isRecordPage && !page.attributes) {
      errors.push({ code: "missing_frontmatter", path: page.path, message: "Record page needs frontmatter" });
      continue;
    }
    if (isRecordPage && !page.attributes?.id) {
      errors.push({ code: "missing_id", path: page.path, message: "Record page needs a stable id" });
      continue;
    }
    if (page.attributes?.id) {
      const id = page.attributes.id;
      if (typeof id !== "string" || !ID_PATTERN.test(id)) {
        errors.push({ code: "invalid_id", path: page.path, message: `Invalid record id: ${id}` });
      }
      if (ids.has(id)) {
        errors.push({
          code: "duplicate_id",
          path: page.path,
          message: `Duplicate id ${id}; first used in ${ids.get(id)}`
        });
      } else {
        ids.set(id, page.path);
      }
      for (const field of ["type", "title"]) {
        if (typeof page.attributes[field] !== "string" || !page.attributes[field].trim()) {
          errors.push({ code: "missing_field", path: page.path, message: `Missing required field: ${field}` });
        }
      }
      if (page.attributes.type && !RECORD_TYPES.has(page.attributes.type)) {
        errors.push({
          code: "invalid_record_type",
          path: page.path,
          message: `Unknown record type: ${page.attributes.type}`
        });
      }
      const expectedIdPrefix = page.attributes.type;
      if (
        typeof expectedIdPrefix === "string" &&
        typeof id === "string" &&
        ID_PATTERN.test(id) &&
        id.split(":")[0] !== expectedIdPrefix
      ) {
        errors.push({
          code: "record_id_type_mismatch",
          path: page.path,
          message: `Record id '${id}' must use '${expectedIdPrefix}:' for type '${page.attributes.type}'`
        });
      }
      const expectedType = expectedTypeForPath(page.path);
      if (expectedType && page.attributes.type && page.attributes.type !== expectedType) {
        errors.push({
          code: "record_type_directory_mismatch",
          path: page.path,
          message: `Record type '${page.attributes.type}' does not match '${firstDirectory}' directory`
        });
      }
      if (
        page.attributes.visibility !== undefined &&
        !["private", "public"].includes(page.attributes.visibility)
      ) {
        errors.push({
          code: "invalid_visibility",
          path: page.path,
          message: `Unknown visibility: ${page.attributes.visibility}`
        });
      }
      for (const field of ["related_records", "tags"]) {
        if (page.attributes[field] !== undefined && !Array.isArray(page.attributes[field])) {
          errors.push({
            code: "invalid_list_field",
            path: page.path,
            message: `${field} must be a YAML list`
          });
        }
      }
      for (const relatedId of asList(page.attributes.related_records)) {
        if (relatedId === id) {
          errors.push({
            code: "self_record_reference",
            path: page.path,
            message: "A record cannot relate to itself"
          });
          continue;
        }
        if (!knownIds.has(relatedId)) {
          errors.push({
            code: "missing_record_reference",
            path: page.path,
            message: `Unknown related record: ${relatedId}`
          });
        }
      }
      if (page.attributes.parent !== undefined) {
        if (typeof page.attributes.parent !== "string" || !ID_PATTERN.test(page.attributes.parent)) {
          errors.push({
            code: "invalid_parent_reference",
            path: page.path,
            message: `Invalid parent record: ${page.attributes.parent}`
          });
        } else if (!knownIds.has(page.attributes.parent)) {
          errors.push({
            code: "missing_parent_reference",
            path: page.path,
            message: `Unknown parent record: ${page.attributes.parent}`
          });
        } else if (page.attributes.parent === id) {
          errors.push({
            code: "self_parent_reference",
            path: page.path,
            message: "A record cannot contain itself"
          });
        } else if (
          ["course", "thesis"].includes(page.attributes.type) &&
          recordsById.get(page.attributes.parent)?.attributes.type !== "education"
        ) {
          errors.push({
            code: "invalid_parent_type",
            path: page.path,
            message: `${page.attributes.type} records must have an education parent`
          });
        }
      }
      if (["course", "thesis"].includes(page.attributes.type) && !page.attributes.parent) {
        errors.push({
          code: "missing_parent",
          path: page.path,
          message: `${page.attributes.type} records must belong to an education record`
        });
      }
      if (!canonicalPathFor(page)) {
        warnings.push({
          code: "legacy_record_layout",
          path: page.path,
          message: "Record uses a legacy flat layout; move it into the canonical hierarchical structure"
        });
      }
    }

    for (const href of page.links) {
      const target = internalLinkTarget(graph, page, href);
      if (target === false) {
        errors.push({ code: "invalid_internal_link", path: page.path, message: `Invalid link: ${href}` });
      } else if (target && !fs.existsSync(target)) {
        errors.push({ code: "broken_internal_link", path: page.path, message: `Broken link: ${href}` });
      }
    }
  }

  for (const record of graph.records) {
    const visited = new Set([record.attributes.id]);
    let parentId = record.attributes.parent;
    while (parentId && recordsById.has(parentId)) {
      if (visited.has(parentId)) {
        errors.push({
          code: "parent_cycle",
          path: record.path,
          message: `Parent relationship forms a cycle through ${parentId}`
        });
        break;
      }
      visited.add(parentId);
      parentId = recordsById.get(parentId).attributes.parent;
    }
  }

  const sortDiagnostics = (items) =>
    items.sort((a, b) =>
      `${a.path}\0${a.code}\0${a.message}`.localeCompare(`${b.path}\0${b.code}\0${b.message}`)
    );
  return {
    valid: errors.length === 0,
    root: graph.root,
    recordCount: graph.records.length,
    errors: sortDiagnostics(errors),
    warnings: sortDiagnostics(warnings),
    graph
  };
}
