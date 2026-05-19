import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";

import { expandUserPath } from "./filesystem.mjs";

function executableExists(candidate) {
  if (!candidate) {
    return false;
  }

  const pathEntries = (process.env.PATH ?? "").split(path.delimiter).filter(Boolean);
  const pathext =
    process.platform === "win32"
      ? (process.env.PATHEXT ?? ".EXE;.CMD;.BAT;.COM")
        .split(";")
        .filter(Boolean)
      : [""];

  if (path.isAbsolute(candidate)) {
    const absoluteCandidates =
      process.platform === "win32" && path.extname(candidate) === ""
        ? pathext.map((extension) => `${candidate}${extension.toLowerCase()}`)
        : [candidate];
    return absoluteCandidates.some((filePath) => {
      try {
        return fs.statSync(filePath).isFile();
      } catch {
        return false;
      }
    });
  }

  return pathEntries.some((entry) =>
    pathext.some((extension) => {
      const filePath = path.join(
        entry,
        process.platform === "win32" ? `${candidate}${extension.toLowerCase()}` : candidate
      );
      try {
        return fs.statSync(filePath).isFile();
      } catch {
        return false;
      }
    })
  );
}

function detectProviderExecutable(commands = []) {
  for (const command of commands) {
    if (executableExists(command)) {
      return command;
    }
  }
  return null;
}

function detectProviderBinaryOnPath(commands = []) {
  for (const command of commands) {
    const result = spawnSync(command, ["--version"], { stdio: "ignore" });
    if (!result.error) {
      return command;
    }
  }
  return null;
}

function getProviderRuntimeHints(provider, providerSpec) {
  const globalTarget = providerSpec.globalTarget
    ? path.resolve(expandUserPath(providerSpec.globalTarget))
    : null;

  const hints = {
    "claude-code": {
      displayName: "Claude Code",
      commands: ["claude"],
      configRoots: [path.join(os.homedir(), ".claude")],
      installHint:
        "Install Claude Code first or use --project-root/--target-dir to preview the skill bundle in a custom location."
    },
    codex: {
      displayName: "Codex",
      commands: ["codex"],
      configRoots: [
        process.env.CODEX_HOME ? path.resolve(process.env.CODEX_HOME) : null,
        path.join(os.homedir(), ".codex"),
        path.join(os.homedir(), ".agents", "skills")
      ].filter(Boolean),
      installHint:
        "Install Codex first or set CODEX_HOME/--target-dir if this machine uses a non-default skills location. AgentKit SEO also writes ~/.agents/skills for Codex compatibility."
    },
    "gemini-cli": {
      displayName: "Gemini CLI",
      commands: ["gemini"],
      configRoots: [path.join(os.homedir(), ".gemini")],
      installHint:
        "Install Gemini CLI first or rerun with --target-dir to generate the extension bundle in a custom location."
    },
    opencode: {
      displayName: "OpenCode",
      commands: ["opencode"],
      configRoots: [path.join(os.homedir(), ".config", "opencode"), path.join(os.homedir(), ".opencode")],
      installHint:
        "Install OpenCode first or rerun with --project-root/--target-dir if this machine uses a different skills directory."
    }
  };

  const providerHints = hints[provider];
  if (!providerHints) {
    return null;
  }

  return {
    ...providerHints,
    globalTarget
  };
}

export function warnIfProviderRuntimeLooksMissing(provider, providerSpec, flags, targetRoot) {
  const hints = getProviderRuntimeHints(provider, providerSpec);
  if (!hints) {
    return;
  }

  const foundExecutable = detectProviderExecutable(hints.commands) ?? detectProviderBinaryOnPath(hints.commands);
  const foundConfigRoot = hints.configRoots.find((root) => root && fs.existsSync(root)) ?? null;
  const explicitTarget = Boolean(flags["target-dir"] || flags["project-root"]);

  if (!foundExecutable && !foundConfigRoot) {
    console.warn(
      `warning: ${hints.displayName} was not detected on this machine. AgentKit SEO will still install files to ${targetRoot}. ${hints.installHint}`
    );
    return;
  }

  if (!explicitTarget && !foundConfigRoot && hints.globalTarget) {
    console.warn(
      `warning: ${hints.displayName} was not detected in its usual config location. AgentKit SEO is creating ${hints.globalTarget}. If this machine uses a different location, rerun with --target-dir or --project-root.`
    );
  }
}
