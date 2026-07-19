import process from "node:process";

import { initializeContext } from "./init.mjs";
import { validateContextFile } from "./parse.mjs";
import { writeContextSummary } from "./summary.mjs";

function printDiagnostics(result) {
  for (const warning of result.warnings) console.warn(`warning: ${result.path}:${warning.line}: ${warning.message} [${warning.code}]`);
  for (const error of result.errors) console.error(`error: ${result.path}:${error.line}: ${error.message} [${error.code}]`);
}

function validationJson(result) {
  return {
    schemaVersion: result.schemaVersion,
    valid: result.valid,
    path: result.path,
    title: result.title,
    sectionNames: result.sections.map((section) => section.normalized),
    errors: result.errors,
    warnings: result.warnings
  };
}

export function runContextCommand(repoRoot, subject, filePath, flags) {
  if (subject === "init") {
    const destination = initializeContext(repoRoot, flags.output, Boolean(flags.force));
    if (flags.json) process.stdout.write(`${JSON.stringify({ schemaVersion: 1, path: destination }, null, 2)}\n`);
    else console.log(`Initialized Career Context at ${destination}`);
    return;
  }
  if (subject === "validate") {
    if (!filePath) throw new Error("Usage: vitaecontext context validate <file> [--json]");
    const result = validateContextFile(filePath);
    if (flags.json) process.stdout.write(`${JSON.stringify(validationJson(result), null, 2)}\n`);
    else {
      printDiagnostics(result);
      if (result.valid) console.log(`Career Context valid: ${result.path}`);
    }
    if (!result.valid) process.exitCode = 1;
    return;
  }
  if (subject === "summary") {
    if (!filePath) throw new Error("Usage: vitaecontext context summary <file> --for <surface> [--output <file>] [--json]");
    const result = writeContextSummary(filePath, flags.for ?? "general", flags.output);
    if (flags.json) process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    else if (result.output) console.log(`Wrote ${result.surface} Career Context packet to ${result.output}`);
    else process.stdout.write(result.content);
    return;
  }
  throw new Error("Usage: vitaecontext context init|validate|summary");
}
