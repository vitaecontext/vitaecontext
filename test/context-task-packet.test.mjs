import assert from "node:assert/strict";
import path from "node:path";
import { test } from "node:test";

import { getCareerContextForTask, listCareerContextHeadings } from "../src/context/task-packet.mjs";
import { repoRootFromScript } from "../src/config.mjs";

const root = repoRootFromScript(import.meta.url);
const context = path.join(root, "hub/context-builder/examples/alex-morgan-fictional-career-context.md");

test("task packet lists headings without returning their bodies", () => {
  const index = listCareerContextHeadings(context);
  assert.ok(index.headings.some((entry) => entry.heading === "[PROJECT] QueueWatch"));
  assert.ok(index.headings.some((entry) => entry.heading === "Goals and targeting"));
  assert.equal(JSON.stringify(index).includes("TL;DR:"), false);
});

test("task packet reads a single hierarchical record without unrelated sections", () => {
  const packet = getCareerContextForTask(context, { heading: "[PROJECT] QueueWatch", maxChars: 12000 });
  assert.match(packet.content, /QueueWatch/);
  assert.doesNotMatch(packet.content, /## Education/);
  assert.doesNotMatch(packet.content, /## QUICK REFERENCE/);
  assert.equal(packet.heading, "[PROJECT] QueueWatch");
  assert.ok(packet.sourceLines.to >= packet.sourceLines.from);
});

test("task packet fails closed on missing, oversized and invalid selections", () => {
  assert.throws(() => getCareerContextForTask(context, { heading: "Nonexistent" }), /Heading not found/);
  assert.throws(() => getCareerContextForTask(context, { heading: "Experience", maxChars: 100 }), /exceeds maxChars/);
  assert.throws(() => getCareerContextForTask(context, { heading: "Experience", maxChars: 12001 }), /between 100/);
  assert.throws(() => getCareerContextForTask(context, { heading: "Experience", line: -3 }), /positive integer/);
});
