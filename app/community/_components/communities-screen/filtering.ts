import type { CommunitySummary } from "@/lib/opportunities/communities";
import type { CommunityFilterOption } from "./types";

const ALL = "all";

function buildOptions(items: CommunitySummary[], key: "country" | "region") {
  const counts = new Map<string, number>();

  for (const item of items) {
    const value = item[key];
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([value, count]) => ({ value, count } satisfies CommunityFilterOption));
}

export function buildCountryOptions(items: CommunitySummary[]) {
  return buildOptions(items, "country");
}

export function buildRegionOptions(items: CommunitySummary[], country: string) {
  const scoped = country === ALL ? items : items.filter((item) => item.country === country);
  return buildOptions(scoped, "region");
}

export function filterCommunities(
  items: CommunitySummary[],
  country: string,
  region: string,
) {
  return items.filter((item) => {
    const countryMatch = country === ALL || item.country === country;
    const regionMatch = region === ALL || item.region === region;
    return countryMatch && regionMatch;
  });
}
