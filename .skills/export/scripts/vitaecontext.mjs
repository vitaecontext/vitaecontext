#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { parseFlags, usage } from "../lib/args.mjs";
import { loadConfig, repoRootFromScript } from "../lib/config.mjs";
import { doctor } from "../lib/doctor.mjs";
import { exportProvider } from "../lib/export.mjs";
import { installProvider } from "../lib/install.mjs";
import { runGraphCommand } from "../lib/vitaegraph/cli.mjs";
import { listCommands, listProviders, listSkills } from "../lib/list.mjs";
import { templateContext } from "../lib/template.mjs";
import { uninstallProvider } from "../lib/uninstall.mjs";
import { checkForUpdates } from "../lib/update.mjs";
import { showVersion } from "../lib/version.mjs";

const invokedAs = path.basename(process.argv[1] ?? "vitaecontext");
if (invokedAs === "agentkit-seo") {
  console.error(
    "warning: 'agentkit-seo' is deprecated and kept as a compatibility alias; use 'vitaecontext' instead."
  );
}

async function run() {
  const [, , command, ...rest] = process.argv;
  if (!command || command === "help" || command === "--help" || command === "-h") {
    usage();
    return;
  }

  const repoRoot = repoRootFromScript(import.meta.url);
  const config = loadConfig(repoRoot);

  if (command === "version") {
    showVersion(config);
    return;
  }

  if (command === "update") {
    const flags = parseFlags(rest);
    await checkForUpdates(config, flags);
    return;
  }

  if (command === "doctor") {
    parseFlags(rest);
    doctor(repoRoot, config);
    return;
  }

  if (command === "template") {
    const subject = rest[0];
    const flags = parseFlags(rest.slice(1));
    if (subject === "context") {
      templateContext(repoRoot, flags);
      return;
    }
    throw new Error("Usage: vitaecontext template context [--output <file>] [--force]");
  }

  if (command === "graph") {
    const subject = rest[0];
    const flags = parseFlags(rest.slice(1));
    runGraphCommand(repoRoot, subject, flags);
    return;
  }

  if (command === "list") {
    const subject = rest[0];
    const flags = parseFlags(rest.slice(1));
    if (subject === "providers") {
      listProviders(config);
      return;
    }
    if (subject === "skills") {
      listSkills(config);
      return;
    }
    if (subject === "commands") {
      if (!flags.provider) {
        throw new Error("Usage: vitaecontext list commands --provider <provider>");
      }
      listCommands(config, flags.provider);
      return;
    }
    throw new Error("Usage: vitaecontext list providers|skills|commands --provider <provider>");
  }

  if (command === "install") {
    const flags = parseFlags(rest);
    if (!flags.provider) {
      throw new Error(
        "Usage: vitaecontext install --provider <provider> [--project-root <dir>|--target-dir <dir>] [--commands-target-dir <dir>] [--force]"
      );
    }
    if (flags.provider === "all") {
      throw new Error("Install accepts one provider at a time so destinations stay explicit.");
    }
    if (!config.providers[flags.provider]) {
      const available = Object.keys(config.providers).sort().join(", ");
      throw new Error(`Unknown provider '${flags.provider}'. Available: ${available}`);
    }
    installProvider(repoRoot, flags.provider, config, flags);
    return;
  }

  if (command === "uninstall") {
    const flags = parseFlags(rest);
    if (!flags.provider) {
      throw new Error(
        "Usage: vitaecontext uninstall --provider <provider> [--project-root <dir>|--target-dir <dir>] [--dry-run] [--force]"
      );
    }
    if (flags.provider === "all") {
      throw new Error("Uninstall accepts one provider at a time so destinations stay explicit.");
    }
    if (!config.providers[flags.provider]) {
      const available = Object.keys(config.providers).sort().join(", ");
      throw new Error(`Unknown provider '${flags.provider}'. Available: ${available}`);
    }
    uninstallProvider(repoRoot, flags.provider, config, flags);
    return;
  }

  if (command !== "export") {
    throw new Error(`Unknown command: ${command}`);
  }

  const flags = parseFlags(rest);
  if (!flags.provider || !flags.output) {
    throw new Error("Usage: vitaecontext export --provider <provider|all> --output <dir> [--force]");
  }

  const providers = config.providers;
  const selected =
    flags.provider === "all"
      ? Object.keys(providers)
      : [flags.provider];

  for (const provider of selected) {
    if (!providers[provider]) {
      const available = [...Object.keys(providers).sort(), "all"].join(", ");
      throw new Error(`Unknown provider '${provider}'. Available: ${available}`);
    }
  }

  const outputRoot = path.resolve(flags.output);
  fs.mkdirSync(outputRoot, { recursive: true });

  for (const provider of selected) {
    exportProvider(repoRoot, outputRoot, provider, config, Boolean(flags.force));
  }

  console.log(`Exported ${selected.length} provider bundle(s) to ${outputRoot}`);
  for (const provider of selected) {
    console.log(`- ${provider}: ${path.join(outputRoot, provider)}`);
  }
}

run().catch((error) => {
  console.error(`error: ${error.message}`);
  process.exit(1);
});
