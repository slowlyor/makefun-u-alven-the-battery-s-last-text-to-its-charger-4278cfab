// The Battery's Last Text to Its Charger — make.fun entry
// Writes exactly one line — the phone battery's last text to the
// charger it waited for all day — to /output/entry.txt
// (or $OUTPUT_PATH when set). Deterministic, stdlib only, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MAX_CHARS = 200;

const LINE =
  "waited all day. 1% left. i made my peace, said goodbye to the group chat, and now you show up?? plug me in before i change my mind and die out of spite.";

function main(): void {
  // Gate: exactly one line, 1..200 characters, not only whitespace.
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`line must be 1-${MAX_CHARS} characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("line must be a single line");
  }

  const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
  console.log(LINE);
}

main();
