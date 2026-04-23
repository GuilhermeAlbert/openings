function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function normalizeAuthorHandle(handle: string) {
  return handle.trim().replace(/^@+/, "");
}

export function buildCommunityPath(repository: string) {
  const segments = repository
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment));

  if (segments.length === 0) {
    return "/community";
  }

  return `/community/${segments.join("/")}`;
}

export function buildUserPath(handle: string) {
  const normalized = normalizeAuthorHandle(handle);

  if (!normalized) {
    return "/users";
  }

  return `/users/${encodeURIComponent(normalized)}`;
}

export function repositoryFromCommunitySegments(segments: string[]) {
  return segments.map((segment) => safeDecode(segment)).join("/");
}

export function authorHandleFromRoute(handle: string) {
  return normalizeAuthorHandle(safeDecode(handle));
}
