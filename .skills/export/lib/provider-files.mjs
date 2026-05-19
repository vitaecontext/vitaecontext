import fs from "node:fs";
import path from "node:path";

import {
  normalizeRelativePath,
  readJsonFile,
  removeIfExists,
  writeJsonFile
} from "./filesystem.mjs";

export function readSkillName(skillFilePath) {
  const content = fs.readFileSync(skillFilePath, "utf8");
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return null;
  }
  const nameMatch = match[1].match(/^name:\s*(.+)$/m);
  return nameMatch ? nameMatch[1].trim() : null;
}

function shouldCopySkillPath(skillRoot, sourcePath, excludedPaths) {
  if (!excludedPaths || excludedPaths.length === 0) {
    return true;
  }

  const relativePath = normalizeRelativePath(path.relative(skillRoot, sourcePath));
  return !excludedPaths.some(
    (excludedPath) => relativePath === excludedPath || relativePath.startsWith(`${excludedPath}/`)
  );
}

export function copySkillFolders(repoRoot, skills, targetRoot, excludedPaths = []) {
  const exported = [];

  for (const skill of skills) {
    const source = path.join(repoRoot, skill.source);
    const destination = path.join(targetRoot, skill.name);
    if (!fs.existsSync(source)) {
      throw new Error(`Skill source does not exist: ${source}`);
    }
    fs.cpSync(source, destination, {
      recursive: true,
      filter: (sourcePath) => shouldCopySkillPath(source, sourcePath, excludedPaths)
    });
    exported.push(skill.name);
  }

  return exported;
}

function syncJsonPackageVersion(targetPath, packageMetadata) {
  const json = readJsonFile(targetPath);
  json.version = packageMetadata.version;
  writeJsonFile(targetPath, json);
}

export function copyProviderFiles(repoRoot, files, targetRoot, force, packageMetadata) {
  const copied = [];

  if (!files || files.length === 0) {
    return copied;
  }

  fs.mkdirSync(targetRoot, { recursive: true });

  for (const file of files) {
    const source = path.join(repoRoot, file.source);
    const destination = path.join(targetRoot, file.target ?? path.basename(file.source));
    if (!fs.existsSync(source)) {
      throw new Error(`Provider file source does not exist: ${source}`);
    }
    if (fs.existsSync(destination)) {
      if (!force) {
        throw new Error(
          `Provider file target already exists: ${destination}. Use --force to replace AgentKit SEO provider files.`
        );
      }
      removeIfExists(destination);
    }
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.cpSync(source, destination, { recursive: true });
    if (file.syncPackageVersion) {
      syncJsonPackageVersion(destination, packageMetadata);
    }
    copied.push(path.relative(targetRoot, destination));
  }

  return copied;
}

export function copyCommandFiles(repoRoot, commands, targetRoot, force) {
  const copied = [];

  if (!commands || commands.length === 0) {
    return copied;
  }

  fs.mkdirSync(targetRoot, { recursive: true });

  for (const command of commands) {
    const source = path.join(repoRoot, command.source);
    const destination = path.join(targetRoot, path.basename(command.source));
    if (!fs.existsSync(source)) {
      throw new Error(`Command source does not exist: ${source}`);
    }
    if (fs.existsSync(destination)) {
      if (!force) {
        throw new Error(
          `Command target already exists: ${destination}. Use --force to replace AgentKit SEO command files.`
        );
      }
      removeIfExists(destination);
    }
    fs.cpSync(source, destination);
    copied.push(command.name);
  }

  return copied;
}

export function installSkillFolders(repoRoot, skills, targetRoot, force, excludedPaths = []) {
  const installed = [];

  fs.mkdirSync(targetRoot, { recursive: true });

  for (const skill of skills) {
    const source = path.join(repoRoot, skill.source);
    const destination = path.join(targetRoot, skill.name);
    if (!fs.existsSync(source)) {
      throw new Error(`Skill source does not exist: ${source}`);
    }
    if (fs.existsSync(destination)) {
      if (!force) {
        throw new Error(
          `Install target already exists: ${destination}. Use --force to replace AgentKit SEO skill folders.`
        );
      }
      removeIfExists(destination);
    }
    fs.cpSync(source, destination, {
      recursive: true,
      filter: (sourcePath) => shouldCopySkillPath(source, sourcePath, excludedPaths)
    });
    installed.push(skill.name);
  }

  return installed;
}
