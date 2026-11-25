// makefun-x-reposts-02 entry program (Node 22, stdlib only).
// Copies POSTS.json from the repository root to the output directory.
// The house reads the posts themselves from X; nothing written here counts.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const repoDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

const raw = readFileSync(join(repoDir, "POSTS.json"), "utf8");
const data = JSON.parse(raw);
if (!data || !Array.isArray(data.posts)) {
  throw new Error("POSTS.json must be an object with a posts array");
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "POSTS.json");
writeFileSync(target, JSON.stringify(data, null, 2) + "\n");
console.log(`copied ${data.posts.length} post(s) to ${target}`);
