import fs from "node:fs";
import path from "node:path";

import { writeJsonFile } from "../filesystem.mjs";
import { validateVitaeGraph } from "./validate.mjs";

function asList(value) {
  if (value === undefined || value === null || value === "") return [];
  return Array.isArray(value) ? value : [value];
}

function nodeType(type) {
  return String(type)
    .split(/[-_\s]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function plainText(markdown) {
  return markdown
    .replace(/^---[\s\S]*?---\s*/m, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`|~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function termsFor(text) {
  const terms = {};
  for (const token of text.toLowerCase().match(/[a-z0-9][a-z0-9+.#-]*/g) ?? []) {
    terms[token] = (terms[token] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(terms).sort(([a], [b]) => a.localeCompare(b)));
}

export function buildVitaeGraphArtifacts(root) {
  const validation = validateVitaeGraph(root);
  if (!validation.valid) {
    const error = new Error(`VitaeGraph validation failed with ${validation.errors.length} error(s)`);
    error.validation = validation;
    throw error;
  }
  const records = [...validation.graph.records].sort((a, b) =>
    a.attributes.id.localeCompare(b.attributes.id)
  );
  const recordNodes = records.map((record) => ({
    id: record.attributes.id,
    type: nodeType(record.attributes.type),
    label: record.attributes.title,
    path: record.path,
    parent: record.attributes.parent ?? null,
    tags: asList(record.attributes.tags).sort()
  }));
  const nodes = recordNodes;
  const edges = [];
  for (const record of records) {
    if (record.attributes.parent) {
      edges.push({
        source: record.attributes.parent,
        target: record.attributes.id,
        type: "CONTAINS"
      });
    }
    for (const target of asList(record.attributes.related_records).sort()) {
      edges.push({ source: record.attributes.id, target, type: "RELATED_TO" });
    }
  }
  edges.sort((a, b) =>
    `${a.source}\0${a.target}\0${a.type}`.localeCompare(`${b.source}\0${b.target}\0${b.type}`)
  );
  const graph = { version: "2.0.0", source: "vitaegraph", nodes, edges };
  const documents = records.map((record) => {
    const text = plainText(record.body);
    return {
      id: record.attributes.id,
      type: nodeType(record.attributes.type),
      title: record.attributes.title,
      path: record.path,
      text,
      tags: asList(record.attributes.tags).sort(),
      terms: termsFor(`${record.attributes.title} ${asList(record.attributes.tags).join(" ")} ${text}`)
    };
  });
  const searchIndex = { version: "2.0.0", algorithm: "lexical-term-frequency", documents };
  const diagnostics = {
    version: "2.0.0",
    valid: validation.valid,
    records: validation.recordCount,
    errors: validation.errors,
    warnings: validation.warnings
  };
  return { graph, searchIndex, diagnostics };
}

export function writeVitaeGraphArtifacts(root) {
  const generated = path.join(path.resolve(root), ".generated");
  fs.mkdirSync(generated, { recursive: true });
  let artifacts;
  try {
    artifacts = buildVitaeGraphArtifacts(root);
  } catch (error) {
    if (error.validation) {
      for (const staleFile of ["graph.json", "search-index.json"]) {
        fs.rmSync(path.join(generated, staleFile), { force: true });
      }
      writeJsonFile(path.join(generated, "diagnostics.json"), {
        version: "2.0.0",
        valid: false,
        records: error.validation.recordCount,
        errors: error.validation.errors,
        warnings: error.validation.warnings
      });
    }
    throw error;
  }
  writeJsonFile(path.join(generated, "graph.json"), artifacts.graph);
  writeJsonFile(path.join(generated, "search-index.json"), artifacts.searchIndex);
  writeJsonFile(path.join(generated, "diagnostics.json"), artifacts.diagnostics);
  return { generated, ...artifacts };
}
