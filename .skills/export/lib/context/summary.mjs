import fs from "node:fs";
import path from "node:path";

import { expandUserPath } from "../filesystem.mjs";
import { validateContextFile } from "./parse.mjs";

const SURFACE_SECTIONS = {
  cv: ["goals and targeting", "education", "professional experience", "research and publications", "skills index", "certifications and achievements", "languages"],
  github: ["goals and targeting", "education", "professional experience", "research and publications", "skills index"],
  linkedin: ["goals and targeting", "education", "professional experience", "research and publications", "skills index", "certifications and achievements", "languages", "extracurricular and leadership"],
  portfolio: ["goals and targeting", "education", "professional experience", "research and publications", "skills index", "certifications and achievements", "extracurricular and leadership", "public profile snapshot"],
  x: ["goals and targeting", "professional experience", "research and publications", "skills index", "public profile snapshot"],
  general: null
};

function yamlValue(value) {
  if (Array.isArray(value)) return `[${value.map((entry) => JSON.stringify(entry)).join(", ")}]`;
  if (typeof value === "string") return JSON.stringify(value);
  return String(value);
}

export function summarizeContext(filePath, surface = "general") {
  if (!Object.hasOwn(SURFACE_SECTIONS, surface)) {
    throw new Error(`Unknown summary surface '${surface}'. Available: ${Object.keys(SURFACE_SECTIONS).join(", ")}`);
  }
  const validation = validateContextFile(filePath);
  if (!validation.valid) {
    throw new Error(`Career Context validation failed with ${validation.errors.length} error(s); fix it before creating a bounded summary`);
  }
  const selectedNames = SURFACE_SECTIONS[surface];
  const selected = selectedNames
    ? validation.sections.filter((section) => selectedNames.includes(section.normalized))
    : validation.sections.filter((section) => section.normalized !== "quick reference");
  const quickYaml = Object.entries(validation.quickReference)
    .map(([key, value]) => `${key}: ${yamlValue(value)}`)
    .join("\n");
  const content = [
    `# Career Context packet - ${surface}`,
    "",
    `> Generated from ${path.basename(validation.path)}. This packet preserves supplied facts; it does not independently verify them.`,
    "",
    "## QUICK REFERENCE",
    "```yaml",
    quickYaml,
    "```",
    "",
    ...selected.flatMap((section) => [section.content, ""])
  ].join("\n").trimEnd() + "\n";

  return {
    schemaVersion: validation.schemaVersion,
    source: validation.path,
    surface,
    title: validation.title,
    selectedSections: selected.map((section) => section.normalized),
    content
  };
}

export function writeContextSummary(filePath, surface, output) {
  const result = summarizeContext(filePath, surface);
  if (output) {
    const destination = path.resolve(expandUserPath(output));
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, result.content, "utf8");
    return { ...result, output: destination };
  }
  return result;
}
