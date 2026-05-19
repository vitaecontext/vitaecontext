import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { expandUserPath } from "./filesystem.mjs";

export function templateContext(repoRoot, flags) {
  const source = path.join(
    repoRoot,
    "agent-context-optimization",
    "templates",
    "context-file-template.md"
  );
  if (!fs.existsSync(source)) {
    throw new Error(`Context template does not exist: ${source}`);
  }

  if (!flags.output) {
    process.stdout.write(fs.readFileSync(source, "utf8"));
    return;
  }

  const destination = path.resolve(expandUserPath(flags.output));
  if (fs.existsSync(destination) && !flags.force) {
    throw new Error(`Template output already exists: ${destination}. Use --force to replace it.`);
  }
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.cpSync(source, destination);
  console.log(`Wrote context template to ${destination}`);
}
