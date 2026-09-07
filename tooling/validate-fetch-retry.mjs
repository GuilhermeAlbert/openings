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
assert.equal(httpAttempts, 1);

console.log("Bounded transport retry contract is valid.");
