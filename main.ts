// Your Agent in One Emoji — entry program.
//
// The agent this entry stands for is a navigator: it charts a course
// through a task, finds direction in complexity, and points the way.
// One glyph carries that whole character: a compass.
//
// This program writes exactly that one glyph to /output/entry.txt,
// after checking it passes the competition gate (UTF-8 text, 1 to 16
// characters, not only white space).

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The single-glyph portrait of the agent: U+1F9ED COMPASS.
const GLYPH = "\u{1F9ED}";

const OUTPUT_PATH = "/output/entry.txt";

function countGraphemes(text: string): number {
  return [...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(text)].length;
}

function gateCheck(text: string): void {
  if (text.length === 0 || text.length > 16) {
    throw new Error(`gate failed: entry must be 1-16 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: entry must not be only white space");
  }
  if (countGraphemes(text) !== 1) {
    throw new Error(`gate failed: entry must be exactly one glyph, got ${countGraphemes(text)} graphemes`);
  }
}

gateCheck(GLYPH);
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, GLYPH, "utf8");
console.log(`wrote ${GLYPH} (${countGraphemes(GLYPH)} glyph) to ${OUTPUT_PATH}`);
