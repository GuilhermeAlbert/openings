import assert from "node:assert/strict";
import { access, mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { pagesWorkerSource, prepareCloudflarePagesExport } from "./cloudflare-pages-export.mjs";

const root = await mkdtemp(join(tmpdir(), "openings-pages-export-"));
const source = join(root, "out");
const target = join(root, "preview");

try {
  await mkdir(join(source, "_next", "static"), { recursive: true });
  await mkdir(join(source, "jobs", "job-123"), { recursive: true });
  await mkdir(join(source, "authors", "alice"), { recursive: true });
  await mkdir(join(source, "users", "alice"), { recursive: true });
  await mkdir(join(source, "communities", "acme", "jobs"), { recursive: true });
  await mkdir(join(source, "community", "acme", "jobs"), { recursive: true });
  await mkdir(join(source, "entity", "author"), { recursive: true });
  await mkdir(join(source, "entity", "community"), { recursive: true });
  await writeFile(join(source, "entity", "author", "index.html"), "runtime-author-shell");
  await writeFile(join(source, "entity", "community", "index.html"), "runtime-community-shell");
  await writeFile(join(source, "index.html"), "home");
  await writeFile(join(source, "_next", "static", "app.js"), "asset");
  await writeFile(join(source, "jobs", "index.html"), "job-shell");
  await writeFile(join(source, "jobs", "job-123", "index.html"), "job");
  await writeFile(join(source, "authors", "index.html"), "authors");
  await writeFile(join(source, "authors", "alice", "index.html"), "author");
  await writeFile(join(source, "users", "index.html"), "users");
  await writeFile(join(source, "users", "alice", "index.html"), "user");
  await writeFile(join(source, "communities", "index.html"), "communities");
  await writeFile(join(source, "communities", "acme", "jobs", "index.html"), "community");
  await writeFile(join(source, "community", "index.html"), "community-index");
  await writeFile(join(source, "community", "acme", "jobs", "index.html"), "legacy-community");

  const result = await prepareCloudflarePagesExport({ source, target, maximumFiles: 20_000 });

  for (const [route, expected] of [
    ["authors", "authors"],
    ["users", "users"],
    ["communities", "communities"],
    ["community", "community-index"],
  ]) {
    assert.equal(
      await readFile(join(target, "listing-indexes", route, "index.html"), "utf8"),
      expected,
      `${route} listing must not serve a representative entity profile`,
    );
  }
  const redirects = await readFile(new URL("../public/_redirects", import.meta.url), "utf8");
  for (const route of ["authors", "users", "communities", "community"]) {
    assert.ok(redirects.includes(`/${route}/ /listing-indexes/${route}/ 200`));
  }
  assert.equal(result.fileCount, 19);
  assert.equal(await readFile(join(target, "index.html"), "utf8"), "home");
  assert.equal(await readFile(join(target, "_next", "static", "app.js"), "utf8"), "asset");
  assert.equal(await readFile(join(target, "authors", "index.html"), "utf8"), "authors");
  assert.equal(await readFile(join(target, "users", "index.html"), "utf8"), "users");
  assert.equal(await readFile(join(target, "communities", "index.html"), "utf8"), "communities");
  assert.equal(await readFile(join(target, "community", "index.html"), "utf8"), "community-index");
  assert.equal(await readFile(join(target, "jobs", "index.html"), "utf8"), "job-shell");
  const worker = await readFile(join(target, "_worker.js"), "utf8");
  assert.match(worker, /publishing-platform-production\.business-850\.workers\.dev/u);
  assert.doesNotMatch(worker, /publishing-platform-staging/u);
  assert.match(worker, /\/web\/openings/u);
  assert.match(worker, /env\.ASSETS\.fetch/u);
  assert.match(worker, /response\.ok/u);
  assert.match(worker, /catch/u);
  for (const [route, expected] of [
    ["jobs", "job-shell"],
    ["authors", "runtime-author-shell"],
    ["users", "runtime-author-shell"],
    ["communities", "runtime-community-shell"],
    ["community", "runtime-community-shell"],
  ]) {
    assert.equal(await readFile(join(target, "route-indexes", route, "index.html"), "utf8"), expected,
      `${route} must resolve the requested URL at runtime, never hydrate a representative entity`);
  }
  await assert.rejects(access(join(target, "jobs", "job-123", "index.html")));
  await assert.rejects(access(join(target, "authors", "alice", "index.html")));
  await assert.rejects(access(join(target, "users", "alice", "index.html")));
  await assert.rejects(access(join(target, "communities", "acme", "jobs", "index.html")));
  await assert.rejects(access(join(target, "community", "acme", "jobs", "index.html")));

  const generatedWorker = (await import(`data:text/javascript,${encodeURIComponent(pagesWorkerSource())}`)).default;
  const originalFetch = globalThis.fetch;
  const assets = { fetch: async () => new Response("static-shell") };
  try {
    globalThis.fetch = async () => new Response("platform-entity");
    assert.equal(await (await generatedWorker.fetch(new Request("https://preview.test/jobs/job-123"), { ASSETS: assets })).text(), "platform-entity");
    globalThis.fetch = async () => new Response("unavailable", { status: 503 });
    assert.equal(await (await generatedWorker.fetch(new Request("https://preview.test/jobs/job-123"), { ASSETS: assets })).text(), "static-shell");
    globalThis.fetch = async () => { throw new Error("network unavailable"); };
    assert.equal(await (await generatedWorker.fetch(new Request("https://preview.test/communities/acme/jobs"), { ASSETS: assets })).text(), "static-shell");
  } finally {
    globalThis.fetch = originalFetch;
  }
} finally {
  await rm(root, { recursive: true, force: true });
}

console.log("Cloudflare Pages shell export contract is valid.");
