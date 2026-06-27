# Privacy Policy

Last updated: 2026-06-01

AgentKit SEO is a local-first, open-source npm package. It provides Markdown skills, provider adapters, command wrappers, templates, and a small CLI for exporting or installing those files into supported agent environments.

This policy explains what the package itself does with data. Third-party agent tools, package registries, GitHub, npm, and the user's chosen AI providers have their own privacy policies.

## Data collection

AgentKit SEO does not collect personal data.

The package does not include:

- hosted accounts
- analytics beacons
- telemetry events
- advertising identifiers
- a remote application backend
- automatic upload of local files

The CLI runs locally and uses local filesystem operations to copy bundled skill files, command files, provider files, templates, and install manifests.

## Local files the package may read

The CLI may read files that are part of the installed package, including:

- `package.json`
- `.skills/export/export-config.json`
- bundled skill folders under `.skills/agent-skill/`
- bundled provider files under `.skills/providers/`
- the context-file template under `hub/agent-context-optimization/templates/`

When commands use explicit flags such as `--output`, `--target-dir`, `--commands-target-dir`, or `--project-root`, the CLI uses the paths supplied by the user to write exported or installed files.

## Local files the package may write

Depending on the command and provider, AgentKit SEO may write files to local destinations such as:

- an export directory selected by the user
- `~/.claude/skills/` for Claude Code installs
- `~/.agents/skills/` plus `~/.codex/skills/` or `CODEX_HOME/skills` for Codex installs
- `~/.gemini/extensions/agentkit-seo/` for Gemini CLI installs
- `~/.config/opencode/skills/` for OpenCode installs
- a context-file template path selected with `agentkit-seo template context --output`

Install and export commands may also write local manifest files such as `agentkit-seo-install.json` or `agentkit-seo-export.json`. These manifests record package metadata, provider names, installed skill names, command names, timestamps, and target paths.

## Personal career context

AgentKit SEO encourages users to maintain a private **personal career context file** for verified career facts. That file can contain sensitive information such as work history, education, links, target roles, achievements, constraints, and personal positioning notes.

AgentKit SEO does not create or upload a personal career context file unless the user explicitly asks an agent or CLI command to create a template at a chosen local path. Users should not commit private context files, CV exports, screenshots, recruiter notes, or other sensitive career material to public repositories.

## Network access

The package CLI is designed to work from local package contents. It does not need a hosted AgentKit SEO service.

The one exception is `agentkit-seo update`: when a user explicitly runs that command, the CLI makes a single outbound request to the public npm registry (`https://registry.npmjs.org`) to read the latest published version of the package. It sends no personal data, runs only when invoked, and is never triggered automatically or in the background. All other CLI commands work from local files only.

Network access may also occur outside the package's control when users:

- install the package from npm or GitHub
- clone or fetch this repository
- use Gemini CLI, Claude Code, Codex, OpenCode, or another agent provider
- ask an agent to inspect public URLs, profiles, repositories, or portfolio pages

Those tools and services control their own network behavior and data handling.

## Third-party AI providers

AgentKit SEO skills are instructions for agent environments. If a user gives an AI agent a CV, LinkedIn export, GitHub profile, portfolio source, screenshots, or a personal career context file, that provider may process the content under its own terms and privacy policy.

Review the privacy settings and data-use policy of the chosen AI provider before sending sensitive personal or career information to an agent.

## Security reports

Report suspected security or privacy vulnerabilities privately using the process in [SECURITY.md](./SECURITY.md).

Do not open a public GitHub issue for a vulnerability that could expose private data or local filesystem contents.

## Changes to this policy

Privacy changes are documented through normal repository commits and releases. Material changes should update the `Last updated` date in this file.
