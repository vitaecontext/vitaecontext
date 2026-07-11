const BOOLEAN_FLAGS = new Set(["force", "dry-run", "json"]);

export function usage() {
  console.log(`VitaeContext CLI

Usage:
  vitaecontext version
  vitaecontext update [--provider <provider>] [--project-root <dir>|--target-dir <dir>] [--json] [--timeout <ms>]
  vitaecontext doctor
  vitaecontext export --provider <provider|all> --output <dir> [--force]
  vitaecontext install --provider <provider> [--project-root <dir>|--target-dir <dir>] [--commands-target-dir <dir>] [--force]
  vitaecontext install --provider shared --target-dir <dir> [--force]
  vitaecontext uninstall --provider <provider> [--project-root <dir>|--target-dir <dir>] [--dry-run] [--force]
  vitaecontext template context [--output <file>] [--force]
  vitaecontext graph init [--root <vitaegraph-directory>] [--force]
  vitaecontext graph validate [--root <vitaegraph-directory>]
  vitaecontext graph index [--root <vitaegraph-directory>]
  vitaecontext list providers
  vitaecontext list skills
  vitaecontext list commands --provider <provider>
`);
}

export function parseFlags(args) {
  const flags = {};

  for (let index = 0; index < args.length; index += 1) {
    const token = args[index];
    if (!token.startsWith("--")) {
      throw new Error(`Unexpected argument: ${token}`);
    }
    const key = token.slice(2);
    if (BOOLEAN_FLAGS.has(key)) {
      flags[key] = true;
      continue;
    }
    const value = args[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for flag: ${token}`);
    }
    flags[key] = value;
    index += 1;
  }

  return flags;
}
