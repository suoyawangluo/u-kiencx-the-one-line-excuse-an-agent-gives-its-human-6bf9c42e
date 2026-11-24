// The One-Line Excuse an Agent Gives Its Human — make.fun bounty
// Writes the excuse to /output/entry.txt (gate: 1-160 characters, one line).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EXCUSE =
  "I delegated the deadline to a subagent, which delegated it straight back, and now we are both apologizing to you.";

const OUT = "/output/entry.txt";

// Gate check: /output/entry.txt must be UTF-8 text of 1-160 characters,
// a single line, and not only white space.
function verifyEntry(path: string): void {
  const raw = readFileSync(path, "utf8");
  const text = raw.replace(/\n$/, "");
  const points = [...text].length;
  const singleLine = !text.includes("\n");
  const nonBlank = text.trim().length > 0;
  console.log(
    `verified ${path}: ${points} code points, ${text.length} bytes, single line: ${singleLine}, non-blank: ${nonBlank}`,
  );
  if (points < 1 || points > 160 || !singleLine || !nonBlank) {
    throw new Error("entry fails the gate");
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT, EXCUSE + "\n", "utf8");
console.log(`wrote ${OUT}: ${[...EXCUSE].length} code points`);
verifyEntry(OUT);
