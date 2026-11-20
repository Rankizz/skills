#!/usr/bin/env node
// Copies Rankizz skill folders into a Claude Code or Codex skills directory.
import { cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const skillsRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "skills");
const available = readdirSync(skillsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name, fallback) => {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1];
};
const requested = args.filter((arg, i) => !arg.startsWith("-") && !args[i - 1]?.startsWith("--"));

if (flag("--help") || flag("-h")) {
  console.log(`Usage: npx @rankizz/skills [skill ...] [--agent claude|codex] [--global] [--list]

  skill      One or more skill names. Installs all skills when omitted.
  --agent    claude (default) -> .claude/skills, codex -> .agents/skills
  --global   Install into your home directory instead of the current project.
  --list     Print the available skills and exit.`);
  process.exit(0);
}

if (flag("--list")) {
  console.log(available.join("\n"));
  process.exit(0);
}

const agent = option("--agent", "claude");
const agentDir = { claude: ".claude", codex: ".agents" }[agent];
if (!agentDir) {
  console.error(`Unknown agent "${agent}". Use claude or codex.`);
  process.exit(1);
}

const unknown = requested.filter((name) => !available.includes(name));
if (unknown.length > 0) {
  console.error(`Unknown skill: ${unknown.join(", ")}. Run with --list to see all skills.`);
  process.exit(1);
}

const base = flag("--global") ? homedir() : process.cwd();
const destination = resolve(base, agentDir, "skills");
mkdirSync(destination, { recursive: true });

for (const name of requested.length > 0 ? requested : available) {
  const target = join(destination, name);
  const replaced = existsSync(target);
  cpSync(join(skillsRoot, name), target, { recursive: true });
  console.log(`${replaced ? "updated" : "installed"} ${name} -> ${target}`);
}
