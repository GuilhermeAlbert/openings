import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const workflow = await readFile(
  ".github/workflows/deploy-cloudflare-production.yml",
  "utf8",
);

assert.match(workflow, /^name: Deploy Cloudflare Production$/mu);
assert.match(workflow, /^\s{2}workflow_dispatch:$/mu);
assert.doesNotMatch(workflow, /^\s{2}push:/mu);
assert.match(workflow, /permissions:\s*\n\s{2}contents: read/u);
assert.match(workflow, /group: cloudflare-production-\$\{\{ github\.ref \}\}/u);
assert.match(workflow, /cancel-in-progress: false/u);
assert.match(workflow, /if: github\.ref == 'refs\/heads\/main'/u);
assert.match(workflow, /^\s{4}environment: production$/mu);
assert.match(workflow, /timeout-minutes: 30/u);
assert.match(
  workflow,
  /actions\/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1/u,
);
assert.match(
  workflow,
  /actions\/setup-node@249970729cb0ef3589644e2896645e5dc5ba9c38/u,
);
assert.match(workflow, /node-version: ["']20["']/u);

const commands = [
  "node tooling/preflight-cloudflare-pages.mjs",
  "npm ci",
  "npm run test",
  "npm run lint",
  "npm run build:cloudflare-production",
  "npx --yes wrangler@4.86.0 pages deploy .cloudflare/pages-production --project-name=openings-dev-web --branch=production",
];
commands.reduce((previousIndex, command) => {
  const index = workflow.indexOf(command);
  assert.ok(index > previousIndex, `${command} must follow its prerequisite`);
  return index;
}, -1);

assert.match(
  workflow,
  /^\s{10}CLOUDFLARE_ACCOUNT_ID: \$\{\{ secrets\.CLOUDFLARE_ACCOUNT_ID \}\}$/mu,
);
assert.match(
  workflow,
  /^\s{10}CLOUDFLARE_API_TOKEN: \$\{\{ secrets\.CLOUDFLARE_API_TOKEN \}\}$/mu,
);
assert.doesNotMatch(workflow, /ftp|hostinger|lftp|custom-domain|\bdns\b/iu);
assert.doesNotMatch(workflow, /branches:\s*\[main\]/u);
assert.doesNotMatch(workflow, /contents: write|pull-requests: write|deployments: write/u);

console.log("Cloudflare production workflow contract is valid.");
