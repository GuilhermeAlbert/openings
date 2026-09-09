const RETRY_DELAYS_MS = [250, 750];
const TRANSIENT_HTTP_STATUSES = new Set([502, 503, 504]);

const wait = (delayMs, signal) => new Promise((resolve, reject) => {
  if (signal?.aborted) return reject(signal.reason);
  const finish = () => {
    signal?.removeEventListener("abort", abort);
    resolve();
  };
  const timer = setTimeout(finish, delayMs);
  const abort = () => {
    clearTimeout(timer);
    signal?.removeEventListener("abort", abort);
    reject(signal.reason);
  };
  signal?.addEventListener("abort", abort, { once: true });
});

function responseRetryDelay(response, delay) {
  if (delay === undefined || !TRANSIENT_HTTP_STATUSES.has(response.status)) return undefined;
  const retryAfter = response.headers.get("Retry-After");
  if (retryAfter === null) return delay;
  const minimum = /^\d+$/u.test(retryAfter)
    ? Number(retryAfter) * 1000
    : Date.parse(retryAfter) - Date.now();
  // Do not disregard an origin's backoff or turn page loading into a long poll.
  if (!Number.isFinite(minimum) || minimum > delay) return undefined;
  return delay;
}

export async function fetchWithTransportRetry(
  input,
  init,
  fetchImpl = fetch,
  waitImpl = wait,
) {
  const request = input instanceof Request ? input : undefined;
  const method = (init?.method ?? request?.method ?? "GET").toUpperCase();
  const signal = init?.signal === undefined ? request?.signal : init.signal;
  const readOnly = method === "GET" || method === "HEAD";
  for (let attempt = 0; ; attempt += 1) {
    signal?.throwIfAborted();
    let response;
    try {
      response = await fetchImpl(input, attempt === 0 ? init : { ...init, cache: "reload" });
    } catch (error) {
      signal?.throwIfAborted();
      const delayMs = RETRY_DELAYS_MS[attempt];
      if (!readOnly || error?.name === "AbortError" || delayMs === undefined) throw error;
      await waitImpl(delayMs, signal);
      continue;
    }
    const delayMs = readOnly ? responseRetryDelay(response, RETRY_DELAYS_MS[attempt]) : undefined;
    if (delayMs === undefined) return response;
    // Release the failed response; retain the exact snapshot URL on retry.
    void response.body?.cancel().catch(() => undefined);
    await waitImpl(delayMs, signal);
  }
}
