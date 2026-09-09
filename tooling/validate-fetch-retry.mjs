import assert from "node:assert/strict";

import { fetchWithTransportRetry } from "../lib/opportunities/fetch-with-transport-retry.mjs";

let attempts = 0;
const response = await fetchWithTransportRetry(
  "https://example.test/data.json",
  {},
  async () => {
    attempts += 1;
    if (attempts < 3) throw new TypeError("fetch failed");
    return new Response("{}", { status: 200 });
  },
  async () => {},
);

assert.equal(response.status, 200);
assert.equal(attempts, 3);

let httpAttempts = 0;
const unavailable = await fetchWithTransportRetry(
  "https://example.test/data.json",
  {},
  async () => {
    httpAttempts += 1;
    return new Response("unavailable", { status: 503 });
  },
  async () => {},
);

assert.equal(unavailable.status, 503);
assert.equal(httpAttempts, 3);

const calls = [];
const delays = [];
const recovered = await fetchWithTransportRetry(
  "https://example.test/aliases.json?snapshot=unchanged",
  { cache: "force-cache" },
  async (url, init) => {
    calls.push({ url, cache: init.cache });
    return calls.length === 1
      ? new Response("Backend.max_conn reached", { status: 503 })
      : new Response('{"ids":{}}', { status: 200 });
  },
  async (delay) => delays.push(delay),
);
assert.equal(recovered.status, 200);
assert.deepEqual(delays, [250]);
assert.deepEqual(calls, [
  { url: "https://example.test/aliases.json?snapshot=unchanged", cache: "force-cache" },
  { url: "https://example.test/aliases.json?snapshot=unchanged", cache: "reload" },
]);

for (const status of [400, 401, 403, 404, 429]) {
  let count = 0;
  const result = await fetchWithTransportRetry("https://example.test/data.json", {}, async () => {
    count += 1;
    return new Response("error", { status });
  }, async () => assert.fail("must not retry permanent or quota errors"));
  assert.equal(result.status, status);
  assert.equal(count, 1);
}

let deferredCalls = 0;
await fetchWithTransportRetry("https://example.test/data.json", {}, async () => {
  deferredCalls += 1;
  return new Response("busy", { status: 503, headers: { "Retry-After": "60" } });
}, async () => assert.fail("must not retry before the server permits"));
assert.equal(deferredCalls, 1);

const cancellation = new AbortController();
cancellation.abort();
await assert.rejects(fetchWithTransportRetry("https://example.test/data.json", { signal: cancellation.signal },
  async () => assert.fail("must not fetch after cancellation"), async () => assert.fail("must not wait after cancellation")),
  { name: "AbortError" });

let postCalls = 0;
await fetchWithTransportRetry("https://example.test/data.json", { method: "POST" }, async () => {
  postCalls += 1;
  return new Response("busy", { status: 503 });
}, async () => assert.fail("must not retry writes"));
assert.equal(postCalls, 1);

let requestPostCalls = 0;
await fetchWithTransportRetry(new Request("https://example.test/data.json", { method: "POST" }), undefined,
  async () => { requestPostCalls += 1; return new Response("busy", { status: 503 }); }, async () => {});
assert.equal(requestPostCalls, 1);
await assert.rejects(fetchWithTransportRetry(new Request("https://example.test/data.json", { signal: cancellation.signal }), undefined,
  async () => assert.fail("must not fetch an aborted Request"), async () => {}), { name: "AbortError" });

console.log("Bounded transport retry contract is valid.");
