import fs from "node:fs";
import path from "node:path";

import { normalizeRelativePath } from "../filesystem.mjs";

export const RECORD_DIRECTORIES = new Set([
  "projects",
  "experience",
  "education",
  "certifications",
  "awards",
  "publications"
]);

function parseScalar(value) {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "null") return null;
  return trimmed.replace(/^["']|["']$/g, "");
}

export function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { attributes: null, body: content };

  const attributes = {};
  let currentList = null;
  for (const rawLine of match[1].split(/\r?\n/)) {
    const listMatch = rawLine.match(/^\s+-\s+(.+)$/);
    if (listMatch && currentList) {
      attributes[currentList].push(parseScalar(listMatch[1]));
      continue;
    }
    const fieldMatch = rawLine.match(/^([a-z][a-z0-9_-]*):\s*(.*)$/);
    if (!fieldMatch) continue;
    const [, key, value] = fieldMatch;
    if (value === "") {
      attributes[key] = [];
      currentList = key;
    } else if (value.startsWith("[") && value.endsWith("]")) {
      attributes[key] = value
        .slice(1, -1)
        .split(",")
        .map((item) => parseScalar(item))
        .filter(Boolean);
      currentList = null;
    } else {
      attributes[key] = parseScalar(value);
      currentList = null;
    }
  }
  return { attributes, body: content.slice(match[0].length) };
}

export function markdownLinks(content) {
  return [...content.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)].map((match) => match[1].trim());
}

function listMarkdownFiles(root, current = root) {
  const files = [];
  if (!fs.existsSync(current)) return files;
  for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
    if (entry.name === ".generated") continue;
    const target = path.join(current, entry.name);
    if (entry.isDirectory()) files.push(...listMarkdownFiles(root, target));
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(target);
  }
  return files.sort((a, b) => a.localeCompare(b));
}

export function parseVitaeGraph(root) {
  const resolvedRoot = path.resolve(root);
  const files = listMarkdownFiles(resolvedRoot);
  const pages = files.map((file) => {
    const content = fs.readFileSync(file, "utf8");
    const relativePath = normalizeRelativePath(path.relative(resolvedRoot, file));
    const parsed = parseFrontmatter(content);
    const heading = parsed.body.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? null;
    return {
      path: relativePath,
      absolutePath: file,
      content,
      body: parsed.body,
      attributes: parsed.attributes,
      title: parsed.attributes?.title ?? heading,
      links: markdownLinks(content)
    };
  });
  const records = pages.filter((page) => page.attributes?.id);
  return {
    root: resolvedRoot,
    pages,
    records
  };
}
