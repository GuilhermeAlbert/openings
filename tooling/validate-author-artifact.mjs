import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile("lib/opportunities/author-artifact.ts", "utf8");
const client = await readFile("app/entity/author/client-author-page.tsx", "utf8");

assert.match(source, /schemaVersion\s*!==\s*1/u);
assert.match(source, /api\/authors/u);
assert.match(source, /encodeURIComponent\(normalizedHandle\)/u);
assert.match(source, /response\.status\s*===\s*404/u);
assert.match(source, /AUTHOR_ARTIFACT_MAX_BYTES/u);
assert.match(client, /fetchAuthorArtifact/u);
assert.doesNotMatch(client, /getSnapshotUserByHandle/u);

for (const kind of ["author", "community"]) {
  const shell = await readFile(`app/entity/${kind}/client-${kind}-page.tsx`, "utf8");
  assert.match(shell, /catch\(\(\) => \{ if \(active\) setLoadError\(true\); \}\)/u,
    `${kind}: request failure must not become a missing profile`);
  assert.match(shell, /loadError\s*\? messages\.opportunities\.feedback\.selectedLoadError/u);
  assert.match(shell, /role=\{loadError \? "alert" : "status"\}/u);
}

console.log("Author entity shell fetches one validated profile artifact.");
