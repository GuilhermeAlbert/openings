const DEFAULT_SNAPSHOT_URL =
  "https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities.json";

type UnknownRecord = Record<string, unknown>;

let snapshotItemsPromise: Promise<unknown[]> | null = null;

function asRecord(value: unknown): UnknownRecord | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  return value as UnknownRecord;
}

function stringOrNull(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function normalizeAuthorHandle(handle: string) {
  return handle.trim().replace(/^@+/, "");
}

function resolveSnapshotUrl() {
  return (
    process.env.OPENINGS_DATA_SNAPSHOT_URL ||
    process.env.NEXT_PUBLIC_OPENINGS_DATA_SNAPSHOT_URL ||
    DEFAULT_SNAPSHOT_URL
  );
}

function normalizeSnapshotItems(payload: unknown) {
  if (Array.isArray(payload)) {
    return payload;
  }

  const record = asRecord(payload);

  if (!record || !Array.isArray(record.items)) {
    return null;
  }

  return record.items;
}

async function loadSnapshotItemsUncached() {
  const snapshotUrl = resolveSnapshotUrl();
  const response = await fetch(snapshotUrl, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(
      `Snapshot source unavailable (${response.status}) at ${snapshotUrl}`,
    );
  }

  const payload = await response.json().catch(() => null);
  const items = normalizeSnapshotItems(payload);

  if (!items) {
    throw new Error(`Invalid snapshot payload at ${snapshotUrl}`);
  }

  return items;
}

export function loadSnapshotItems() {
  if (!snapshotItemsPromise) {
    snapshotItemsPromise = loadSnapshotItemsUncached();
  }

  return snapshotItemsPromise;
}

export async function listSnapshotRepositories() {
  const items = await loadSnapshotItems();
  const repositories = new Set<string>();

  for (const item of items) {
    const repository = stringOrNull(asRecord(item)?.repository);

    if (repository) {
      repositories.add(repository);
    }
  }

  return Array.from(repositories).sort((left, right) =>
    left.localeCompare(right),
  );
}

export async function listSnapshotAuthorHandles() {
  const items = await loadSnapshotItems();
  const handles = new Set<string>();

  for (const item of items) {
    const authorRecord = asRecord(asRecord(item)?.author);
    const rawHandle = stringOrNull(authorRecord?.handle);

    if (!rawHandle) {
      continue;
    }

    const normalized = normalizeAuthorHandle(rawHandle);

    if (normalized) {
      handles.add(normalized);
    }
  }

  return Array.from(handles).sort((left, right) =>
    left.localeCompare(right),
  );
}
