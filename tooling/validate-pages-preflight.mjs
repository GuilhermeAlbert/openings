import assert from "node:assert/strict";
import { preflightPages } from "./preflight-cloudflare-pages.mjs";

const env = { CLOUDFLARE_ACCOUNT_ID: "a".repeat(32), CLOUDFLARE_API_TOKEN: "test-only-token" };
const project = { name: "openings-dev-web", production_branch: "production" };
const calls = [];
const successFetch = async (url, options) => {
  calls.push(url);
  assert.equal(options.method, "GET");
  assert.equal(options.redirect, "error");
  assert.equal(options.headers.Authorization, `Bearer ${env.CLOUDFLARE_API_TOKEN}`);
  assert.ok(options.signal instanceof AbortSignal);
  return Response.json({ success: true, result: url.endsWith("/upload-token") ? { jwt: "ephemeral-test-value" } : project });
};
assert.equal(await preflightPages(env, successFetch), undefined);
assert.deepEqual(calls, [
  `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/pages/projects/openings-dev-web`,
  `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/pages/projects/openings-dev-web/upload-token`,
]);
for (const invalid of [{}, { ...env, CLOUDFLARE_ACCOUNT_ID: "../other" }, { ...env, CLOUDFLARE_API_TOKEN: "" }]) {
  await assert.rejects(preflightPages(invalid, () => assert.fail("invalid configuration must not fetch")), /configuration/);
}
for (const response of [
  () => new Response("sensitive provider text", { status: 403 }),
  () => Response.json({ success: false, errors: [{ message: "sensitive provider text" }] }),
  () => new Response("not-json"),
  () => Response.json({ success: true, result: { ...project, production_branch: "wrong" } }),
  () => Response.json({ success: true, result: { ...project, name: "wrong" } }),
]) {
  let count = 0;
  await assert.rejects(preflightPages(env, async () => { count++; return response(); }), error => {
    assert.doesNotMatch(error.message, /sensitive|test-only-token|ephemeral-test-value/);
    return true;
  });
  assert.equal(count, 1);
}
await assert.rejects(preflightPages(env, async () => { throw new Error("sensitive transport detail"); }), /request failed/);
let count = 0;
await assert.rejects(preflightPages(env, async () => Response.json({ success: true, result: ++count === 1 ? project : {} })), /upload permission/);
assert.equal(count, 2);
console.log("Pages preflight contract is valid.");
