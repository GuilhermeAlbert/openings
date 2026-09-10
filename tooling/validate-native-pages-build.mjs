import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";

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

const workflowDirectory = ".github/workflows";
const workflowSources = await Promise.all(
  (await readdir(workflowDirectory))
    .filter((name) => /\.ya?ml$/u.test(name))
    .map((name) => readFile(`${workflowDirectory}/${name}`, "utf8")),
);
assert.doesNotMatch(
  workflowSources.join("\n"),
  /wrangler(?:@[^\s]+)?\s+pages\s+deploy|preflight-cloudflare-pages/iu,
  "Native Pages must be the only Cloudflare Pages deployment owner",
);
for (const retiredPath of [
  ".github/workflows/deploy-cloudflare-production.yml",
  "tooling/preflight-cloudflare-pages.mjs",
]) {
  await assert.rejects(
    access(retiredPath),
    (error) => error?.code === "ENOENT",
    `${retiredPath} must stay retired`,
  );
}

console.log("Native Pages build contract is valid.");
