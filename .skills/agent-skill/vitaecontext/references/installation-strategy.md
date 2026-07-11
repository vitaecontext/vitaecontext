# Installation strategy

## Principle

Keep the methodology portable and the packaging thin.

## Shared source of truth

The reusable skill logic lives in:

- `.skills/agent-skill/vitaecontext/`
- `.skills/agent-skill/vitaecontext-*`

These shared skills should contain:

- the trigger description
- the workflow
- the local references the agent should read
- provider-agnostic guardrails

## Provider adapters

The provider directories in `.skills/` should only describe or generate:

- install targets
- wrapper commands
- provider-specific metadata

They should not become alternate copies of the platform methodology.

## Packaging recommendation

1. Keep editing the shared skills in-repo.
2. Keep each shared skill self-contained through `SKILL.md`, `references/`, and `agents/openai.yaml`.
3. Generate or copy provider-specific install artifacts from that shared source.
4. Ship the exact same shared skill names across providers whenever possible.
5. Use wrapper commands only to improve invocation ergonomics.

## Distribution recommendation

Treat the installable artifact as the shared skill bundle, not as the full repository. The full repo remains useful for authoring, review, and source traceability, but the runtime package should be able to travel with only the `.skills/agent-skill/` content plus the relevant provider adapter.

## CLI and provider contract

The published `vitaecontext` npm CLI is the shared implementation for install, update, uninstall, export, diagnostics, templates, and VitaeGraph commands. `npx vitaecontext` is a user-facing execution path for that implementation, not a future wrapper.

Provider-native discovery and invocation remain provider-specific. Some providers load skills directly, while others add commands, extensions, or plugin metadata. Keep these responsibilities separate:

- The npm CLI owns deterministic copying, manifests, target resolution, and package commands.
- Shared skill folders own runtime methodology.
- Provider adapters own only provider-specific layout, metadata, and invocation ergonomics.
- The installed shared skill name remains the portable runtime contract.
