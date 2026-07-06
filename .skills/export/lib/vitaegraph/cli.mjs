import path from "node:path";

import { initializeVitaeGraph, resolveVitaeGraphRoot } from "./init.mjs";
import { writeVitaeGraphArtifacts } from "./index.mjs";
import { validateVitaeGraph } from "./validate.mjs";

function graphRoot(flags) {
  return resolveVitaeGraphRoot(flags.root);
}

export function runGraphCommand(repoRoot, subject, flags) {
  if (subject === "init") {
    const root = initializeVitaeGraph(repoRoot, flags.root, Boolean(flags.force));
    console.log(`Initialized VitaeGraph at ${root}`);
    return;
  }
  if (subject === "validate") {
    const root = graphRoot(flags);
    const result = validateVitaeGraph(root);
    for (const warning of result.warnings) console.warn(`warning: ${warning.path}: ${warning.message}`);
    for (const error of result.errors) console.error(`error: ${error.path}: ${error.message}`);
    if (!result.valid) throw new Error(`VitaeGraph validation failed with ${result.errors.length} error(s)`);
    console.log(`VitaeGraph valid: ${result.recordCount} record(s) at ${path.resolve(root)}`);
    return;
  }
  if (subject === "index") {
    const root = graphRoot(flags);
    const result = writeVitaeGraphArtifacts(root);
    console.log(`Indexed ${result.graph.nodes.length} VitaeGraph node(s)`);
    console.log(`- generated: ${result.generated}`);
    return;
  }
  throw new Error("Usage: agentkit-seo graph init|validate|index [--root <vitaegraph-directory>] [--force]");
}
