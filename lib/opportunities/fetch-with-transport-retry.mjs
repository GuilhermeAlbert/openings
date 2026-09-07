const RETRY_DELAYS_MS = [250, 750];

const wait = (delayMs) => new Promise((resolve) => setTimeout(resolve, delayMs));

export async function fetchWithTransportRetry(
  input,
  init,
  fetchImpl = fetch,
  waitImpl = wait,
) {
  for (let attempt = 0; ; attempt += 1) {
    try {
      return await fetchImpl(input, init);
    } catch (error) {
      const delayMs = RETRY_DELAYS_MS[attempt];
      if (delayMs === undefined) throw error;
      await waitImpl(delayMs);
    }
  }
}
