const BOOLEAN_FLAGS = new Set(["force", "dry-run", "json"]);

export function usage() {
  console.log(`AgentKit SEO CLI

Usage:
  agentkit-seo version
  agentkit-seo update [--json] [--timeout <ms>]
  agentkit-seo doctor
  agentkit-seo export --provider <provider|all> --output <dir> [--force]
  agentkit-seo install --provider <provider> [--project-root <dir>|--target-dir <dir>] [--commands-target-dir <dir>] [--force]
  agentkit-seo install --provider shared --target-dir <dir> [--force]
  agentkit-seo uninstall --provider <provider> [--project-root <dir>|--target-dir <dir>] [--dry-run] [--force]
  agentkit-seo template context [--output <file>] [--force]
  agentkit-seo list providers
  agentkit-seo list skills
  agentkit-seo list commands --provider <provider>
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
