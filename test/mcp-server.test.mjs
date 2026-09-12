import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { test } from "node:test";

import { handleMcpRequest, mcpServerOptions } from "../src/mcp/server.mjs";
import { listMcpResources, readMcpResource } from "../src/mcp/resources.mjs";
import { callMcpTool, listMcpTools } from "../src/mcp/tools.mjs";
import { getMcpPrompt, listMcpPrompts } from "../src/mcp/prompts.mjs";
import { findDefaultCareerContext, resolveDefaultVitaeGraph } from "../src/mcp/locator.mjs";
import { loadConfig, repoRootFromScript } from "../src/config.mjs";

const repoRoot = repoRootFromScript(import.meta.url);
const config = loadConfig(repoRoot);
const fictionalContextPath = path.join(
  repoRoot,
  "hub",
  "context-builder",
  "examples",
  "alex-morgan-fictional-career-context.md"
);

test("locator resolves custom explicit path", () => {
  const result = findDefaultCareerContext(fictionalContextPath, repoRoot);
  assert.equal(result.exists, true);
  assert.equal(result.path, fictionalContextPath);
  assert.equal(result.source, "explicit");
});

test("MCP startup options reject ignored or conflicting filesystem flags", () => {
  assert.deepEqual(mcpServerOptions({ context: "/context.md", root: "/graph" }), {
    contextPath: "/context.md",
    vitaegraphRoot: "/graph"
  });
  assert.throws(() => mcpServerOptions({ contex: "/typo.md" }), /Unknown MCP flag/);
  assert.throws(
    () => mcpServerOptions({ context: "/one.md", "context-path": "/two.md" }),
    /only one/
  );
});

test("locator never substitutes the bundled fictional example for a missing private context", (t) => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "vitaecontext-mcp-home-"));
  t.after(() => fs.rmSync(home, { recursive: true, force: true }));
  const result = findDefaultCareerContext(null, repoRoot, home);
  assert.equal(result.exists, false);
  assert.equal(result.source, "default_directory");
  assert.equal(result.path, path.join(home, ".vitaecontext", "career-context.md"));
});

test("locator requires explicit selection when multiple non-canonical contexts match", (t) => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "vitaecontext-mcp-ambiguous-"));
  t.after(() => fs.rmSync(home, { recursive: true, force: true }));
  const contextDirectory = path.join(home, ".vitaecontext");
  fs.mkdirSync(contextDirectory);
  fs.writeFileSync(path.join(contextDirectory, "one-career-context.md"), "# One\n");
  fs.writeFileSync(path.join(contextDirectory, "two.context.md"), "# Two\n");

  const result = findDefaultCareerContext(null, repoRoot, home);
  assert.equal(result.exists, false);
  assert.equal(result.source, "ambiguous_default_directory");
  assert.equal(result.candidates.length, 2);
});

test("listMcpResources lists standard URIs and wikis", () => {
  const { resources } = listMcpResources(repoRoot, config, { contextPath: fictionalContextPath });
  const uris = resources.map((r) => r.uri);
  assert.ok(uris.includes("career-context://current"));
  assert.ok(uris.includes("vitaegraph://index"));
  assert.ok(uris.includes("vitaecontext://wiki/vitaecontext-build"));
  assert.ok(uris.includes("vitaecontext://wiki/vitaecontext-vitaegraph"));
});

test("readMcpResource reads wiki entries and career context", () => {
  const wikiResult = readMcpResource("vitaecontext://wiki/build", repoRoot, config);
  assert.equal(wikiResult.contents.length, 1);
  assert.ok(wikiResult.contents[0].text.length > 50);

  const contextResult = readMcpResource("career-context://current", repoRoot, config, {
    contextPath: fictionalContextPath
  });
  assert.equal(contextResult.contents.length, 1);
  assert.ok(contextResult.contents[0].text.includes("Alex Morgan"));
});

test("listMcpTools and callMcpTool execute get_career_context", async () => {
  const { tools } = listMcpTools();
  const names = tools.map((t) => t.name);
  assert.ok(names.includes("get_career_context"));
  assert.ok(names.includes("search_vitaegraph"));
  assert.ok(names.includes("validate_career_context"));

  const toolResult = await callMcpTool(
    "get_career_context",
    { for: "cv" },
    repoRoot,
    config,
    { contextPath: fictionalContextPath }
  );
  assert.equal(toolResult.isError, undefined);
  assert.ok(toolResult.content[0].text.includes("Career Context packet - cv"));
  assert.ok(toolResult.content[0].text.includes("Alex Morgan"));
});

test("callMcpTool validates career context", async () => {
  const valResult = await callMcpTool(
    "validate_career_context",
    {},
    repoRoot,
    config,
    { contextPath: fictionalContextPath }
  );
  assert.equal(valResult.isError, undefined);
  const data = JSON.parse(valResult.content[0].text);
  assert.equal(data.valid, true);
  assert.ok(data.sections.length > 3);
});

test("search_vitaegraph uses the generated search index with normalized type filters", async (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "vitaecontext-mcp-graph-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, ".generated"));
  fs.writeFileSync(
    path.join(root, ".generated", "search-index.json"),
    JSON.stringify({
      documents: [
        {
          id: "project:compiler",
          type: "Project",
          title: "Compiler Toolkit",
          path: "projects/compiler/project.md",
          text: "Built a Rust parser for a compiler research project.",
          tags: ["Rust", "Parsing"]
        }
      ]
    })
  );

  const result = await callMcpTool(
    "search_vitaegraph",
    { query: "parser", type: "project", tag: "rust" },
    repoRoot,
    config,
    { vitaegraphRoot: root }
  );
  const data = JSON.parse(result.content[0].text);
  assert.equal(data.matchCount, 1);
  assert.equal(data.records[0].id, "project:compiler");
  assert.match(data.records[0].excerpt, /Rust parser/);
});

test("VitaeGraph record resources resolve indexed nested paths and reject traversal", (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "vitaecontext-mcp-record-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const relativeRecord = path.join("projects", "compiler", "project.md");
  fs.mkdirSync(path.join(root, ".generated"), { recursive: true });
  fs.mkdirSync(path.dirname(path.join(root, relativeRecord)), { recursive: true });
  fs.writeFileSync(path.join(root, relativeRecord), "# Compiler Toolkit\n");
  fs.writeFileSync(
    path.join(root, ".generated", "graph.json"),
    JSON.stringify({ nodes: [{ id: "project:compiler", path: relativeRecord }] })
  );

  const result = readMcpResource("vitaegraph://record/project%3Acompiler", repoRoot, config, {
    vitaegraphRoot: root
  });
  assert.match(result.contents[0].text, /Compiler Toolkit/);
  assert.throws(
    () => readMcpResource("vitaegraph://record/..%2F..%2Foutside", repoRoot, config, { vitaegraphRoot: root }),
    (error) => error.code === -32602
  );
});

test("listMcpPrompts and getMcpPrompt render valid prompts", () => {
  const { prompts } = listMcpPrompts();
  const names = prompts.map((p) => p.name);
  assert.ok(names.includes("cv_tailoring"));
  assert.ok(names.includes("linkedin_audit"));

  const promptResult = getMcpPrompt(
    "cv_tailoring",
    { targetRole: "Staff Backend Engineer" },
    repoRoot,
    config,
    { contextPath: fictionalContextPath }
  );
  assert.equal(promptResult.messages.length, 1);
  assert.ok(promptResult.messages[0].content.text.includes("Staff Backend Engineer"));
  assert.throws(
    () => getMcpPrompt("cv_tailoring", {}, repoRoot, config),
    (error) => error.code === -32602
  );
});

test("mcp server binary executes live over stdio json-rpc 2.0 stream", async () => {
  const serverPath = path.join(repoRoot, "bin", "vitaecontext-mcp.mjs");
  const child = spawn(process.execPath, [serverPath], {
    stdio: ["pipe", "pipe", "inherit"]
  });

  let buffer = "";
  const responses = [];

  child.stdout.setEncoding("utf8");
  child.stdout.on("data", (data) => {
    buffer += data;
    const lines = buffer.split("\n");
    buffer = lines.pop();
    for (const line of lines) {
      if (line.trim()) {
        responses.push(JSON.parse(line));
      }
    }
  });

  child.stdin.write(
    JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "test", version: "1.0.0" } }
    }) + "\n"
  );

  child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/list", params: {} }) + "\n");
  child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id: 3, method: "resources/list", params: {} }) + "\n");
  child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id: 4, method: "tools/call", params: { name: "unknown", arguments: {} } }) + "\n");

  await new Promise((resolve) => setTimeout(resolve, 300));
  child.kill();

  assert.equal(responses.length, 4);
  const r1 = responses.find((r) => r.id === 1);
  assert.equal(r1.result.protocolVersion, "2024-11-05");
  assert.equal(r1.result.serverInfo.name, "vitaecontext");

  const r2 = responses.find((r) => r.id === 2);
  assert.ok(r2.result.tools.some((t) => t.name === "get_career_context"));

  const r3 = responses.find((r) => r.id === 3);
  assert.ok(r3.result.resources.length >= 5);

  const r4 = responses.find((r) => r.id === 4);
  assert.equal(r4.error.code, -32602);
});
