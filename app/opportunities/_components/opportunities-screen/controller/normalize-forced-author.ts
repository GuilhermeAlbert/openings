import { normalizeAuthorHandle } from "@/lib/opportunities/routing";

export function normalizeForcedAuthor(forcedAuthor?: string) {
  if (!forcedAuthor) return null;
  const normalized = normalizeAuthorHandle(forcedAuthor);
  return normalized || null;
}
