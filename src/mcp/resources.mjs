import fs from "node:fs";
import path from "node:path";

import { invalidParams, resourceNotFound } from "./errors.mjs";
import { findDefaultCareerContext, resolveDefaultVitaeGraph } from "./locator.mjs";

const WIKI_MODULES = new Set([
  "vitaecontext",
  "vitaecontext-build",
  "vitaecontext-vitaegraph"
]);

function pathInside(root, relativePath) {
  const resolvedRoot = path.resolve(root);
  const resolvedTarget = path.resolve(resolvedRoot, relativePath);
  const relative = path.relative(resolvedRoot, resolvedTarget);
  if (!relative || relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) return null;
  try {
    const realRoot = fs.realpathSync(resolvedRoot);
    const realTarget = fs.realpathSync(resolvedTarget);
    const realRelative = path.relative(realRoot, realTarget);
    return realRelative && realRelative !== ".." && !realRelative.startsWith(`..${path.sep}`) && !path.isAbsolute(realRelative)
      ? realTarget
      : null;
  } catch {
    return null;
  }
}

function contextNotFoundText(context) {
  if (context.source === "ambiguous_default_directory") {
    return "# Career Context Not Selected\n\nMultiple Career Context files were found in `~/.vitaecontext/`. Set `VITAECONTEXT_CAREER_CONTEXT` or start the server with `--context <file>` to select one.";
  }
  return "# Career Context Not Found\n\nNo private Career Context file was found at `~/.vitaecontext/`. Run `npx vitaecontext context init` to create one.";
}

export function listMcpResources(repoRoot, config, options = {}) {
  const context = findDefaultCareerContext(options.contextPath, repoRoot);
  const graph = resolveDefaultVitaeGraph(options.vitaegraphRoot, repoRoot);

  const resources = [
    {
      uri: "career-context://current",
      name: "Current Career Context",
      description: "The user's private, user-maintained Career Context source of truth.",
      mimeType: "text/markdown"
    },
    {
      uri: "vitaegraph://index",
      name: "VitaeGraph Index",
      description: "Structured knowledge graph of experience, projects, education, and credentials.",
      mimeType: "application/json"
    }
  ];

  for (const mod of WIKI_MODULES) {
    resources.push({
      uri: `vitaecontext://wiki/${mod}`,
      name: `VitaeContext Wiki: ${mod}`,
      description: `Durable platform knowledge and constraint rules for ${mod}.`,
      mimeType: "text/markdown"
    });
  }

  return {
    resources,
    contextLocated: context.exists,
    graphLocated: graph.exists
  };
}

export function readMcpResource(uri, repoRoot, config, options = {}) {
  if (uri === "career-context://current") {
    const context = findDefaultCareerContext(options.contextPath, repoRoot);
    if (!context.exists) {
      return {
        contents: [
          {
            uri,
            mimeType: "text/markdown",
            text: contextNotFoundText(context)
          }
        ]
      };
    }
    const content = fs.readFileSync(context.path, "utf8");
    return {
      contents: [
        {
          uri,
          mimeType: "text/markdown",
          text: content
        }
      ]
    };
  }

  if (uri === "vitaegraph://index") {
    const graph = resolveDefaultVitaeGraph(options.vitaegraphRoot, repoRoot);
    const indexPath = path.join(graph.root, ".generated", "graph.json");
    if (!fs.existsSync(indexPath)) {
      throw resourceNotFound(uri, "VitaeGraph index not found. Run 'vitaecontext graph index' to generate it.");
    }
    const content = fs.readFileSync(indexPath, "utf8");
    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: content
        }
      ]
    };
  }

  if (uri.startsWith("vitaegraph://record/")) {
    let recordId;
    try {
      recordId = decodeURIComponent(uri.replace("vitaegraph://record/", ""));
    } catch {
      throw invalidParams("Invalid encoded VitaeGraph record ID", { uri });
    }
    if (!recordId || recordId.includes("/") || recordId.includes("\\")) {
      throw invalidParams("Invalid VitaeGraph record ID", { uri });
    }
    const graph = resolveDefaultVitaeGraph(options.vitaegraphRoot, repoRoot);
    const indexPath = path.join(graph.root, ".generated", "graph.json");
    if (!fs.existsSync(indexPath)) {
      throw resourceNotFound(uri, "VitaeGraph index not found. Run 'vitaecontext graph index' to generate it.");
    }
    const graphData = JSON.parse(fs.readFileSync(indexPath, "utf8"));
    const node = graphData.nodes?.find((candidate) => candidate.id === recordId);
    const target = node?.path ? pathInside(graph.root, node.path) : null;
    if (!target || !fs.existsSync(target) || !fs.statSync(target).isFile()) {
      throw resourceNotFound(uri, `VitaeGraph record '${recordId}' not found.`);
    }
    return {
      contents: [{ uri, mimeType: "text/markdown", text: fs.readFileSync(target, "utf8") }]
    };
  }

  if (uri.startsWith("vitaecontext://wiki/")) {
    const moduleName = uri.replace("vitaecontext://wiki/", "");
    const normalizedModule = moduleName.startsWith("vitaecontext-")
      ? moduleName
      : moduleName === "vitaecontext"
      ? "vitaecontext"
      : `vitaecontext-${moduleName}`;

    if (!WIKI_MODULES.has(normalizedModule)) {
      throw resourceNotFound(uri, `Wiki entry for module '${moduleName}' not found.`);
    }

    const wikiKnowledge = path.join(repoRoot, "skills", normalizedModule, "wiki", "knowledge.md");
    const wikiIndex = path.join(repoRoot, "skills", normalizedModule, "wiki", "index.md");
    const wikiRoot = path.join(repoRoot, "skills", normalizedModule, "wiki", "vitaecontext.md");

    const target = [wikiKnowledge, wikiIndex, wikiRoot].find((file) => fs.existsSync(file));
    if (!target) {
      throw resourceNotFound(uri, `Wiki entry for module '${moduleName}' not found.`);
    }

    const text = fs.readFileSync(target, "utf8");
    return {
      contents: [{ uri, mimeType: "text/markdown", text }]
    };
  }

  throw resourceNotFound(uri);
}
