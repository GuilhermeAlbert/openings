import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const packageJson = JSON.parse(await readFile("package.json", "utf8"));

assert.equal(
  packageJson.scripts["pages:build"],
  "npm ci && npm test && npm run lint && npm run build:cloudflare-production",
  "Native Pages builds must install, validate, lint, and prepare the production export in order",
);
assert.equal(
  (await readFile(".node-version", "utf8")).trim(),
  "24.14.1",
  "Native Pages builds must use Node.js 24.14.1",
);
assert.equal(
  packageJson.scripts["build:cloudflare-production"],
  "OPENINGS_CLOUDFLARE_SHELL_ONLY=1 npm run build && node tooling/cloudflare-pages-export.mjs",
  "Native Pages builds must preserve the existing production export command",
);

console.log("Native Pages build contract is valid.");
