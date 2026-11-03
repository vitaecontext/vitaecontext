import fs from "node:fs";
import path from "node:path";

import { validateContextFile } from "./parse.mjs";

export const DEFAULT_CONTEXT_CHARS = 6000;
export const MAX_CONTEXT_CHARS = 12000;

function readValidHeadings(filePath) {
  const validation = validateContextFile(filePath);
  if (!validation.valid) {
    throw new Error("Career Context validation failed with " + validation.errors.length + " error(s).");
  }
  const lines = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n").split("\n");
  const headings = [];
  let fence = null;
  for (let i = 0; i < lines.length; i += 1) {
    const marker = lines[i].match(/^\s*(\x60{3,}|~{3,})/);
    if (marker) {
      if (!fence) {
        fence = { character: marker[1][0], length: marker[1].length };
      } else if (marker[1][0] === fence.character && marker[1].length >= fence.length) {
        fence = null;
      }
      continue;
    }
    if (fence) continue;
    const match = lines[i].match(/^(#{2,6})[ \t]+(.+?)\s*$/);
    if (!match) continue;
    const heading = match[2].replace(/\s+#+\s*$/, "").trim();
    if (heading) headings.push({ heading, level: match[1].length, line: i + 1, index: i });
  }
  return { lines, headings };
}

export function listCareerContextHeadings(filePath) {
  const { headings } = readValidHeadings(filePath);
  return {
    source: path.basename(filePath),
    note: "Headings are from a user-maintained document; they are not independently verified.",
    headings: headings.map(({ heading, level, line }) => ({ heading, level, line }))
  };
}

export function getCareerContextForTask(filePath, options = {}) {
  const { heading, line, maxChars = DEFAULT_CONTEXT_CHARS } = options;
  if (typeof heading !== "string" || !heading.trim()) {
    throw new Error("A non-empty exact heading is required.");
  }
  if (line !== undefined && (!Number.isSafeInteger(line) || line < 1)) {
    throw new Error("line must be a positive integer.");
  }
  if (!Number.isSafeInteger(maxChars) || maxChars < 100 || maxChars > MAX_CONTEXT_CHARS) {
    throw new Error("maxChars must be an integer between 100 and " + MAX_CONTEXT_CHARS + ".");
  }
  const { lines, headings } = readValidHeadings(filePath);
  const query = heading.trim().replace(/\s+/g, " ").toLowerCase();
  const matches = headings.filter((entry) =>
    entry.heading.replace(/\s+/g, " ").toLowerCase() === query &&
    (line === undefined || line === entry.line)
  );
  if (matches.length === 0) {
    throw new Error("Heading not found. Call list_career_context_sections to select an exact heading and line.");
  }
  if (matches.length > 1) {
    throw new Error("Heading is ambiguous. Supply the line number from list_career_context_sections.");
  }
  const selected = matches[0];
  const next = headings.find((entry) => entry.index > selected.index && entry.level <= selected.level);
  const end = next ? next.index : lines.length;
  const content = lines.slice(selected.index, end).join("\n").trim();
  if (content.length > maxChars) {
    throw new Error(
      "Selected section exceeds maxChars (" + content.length + " > " + maxChars +
      "). Choose a narrower heading or explicitly increase maxChars up to " + MAX_CONTEXT_CHARS + "."
    );
  }
  return {
    source: path.basename(filePath),
    heading: selected.heading,
    sourceLines: { from: selected.line, to: end },
    chars: content.length,
    note: "User-maintained source, not independently verified. Selection and size limits are not access controls.",
    content
  };
}
