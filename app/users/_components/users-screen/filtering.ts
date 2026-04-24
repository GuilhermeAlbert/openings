import type { UserSummary } from "@/lib/opportunities/users";
import type { UserFilterOption } from "./types";

const ALL = "all";

function buildOptions(items: UserSummary[], key: "country" | "region") {
  const counts = new Map<string, number>();

  for (const item of items) {
    counts.set(item[key], (counts.get(item[key]) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([value, count]) => ({ value, count } satisfies UserFilterOption));
}

export function buildCountryOptions(items: UserSummary[]) {
  return buildOptions(items, "country");
}

export function buildRegionOptions(items: UserSummary[], country: string) {
  const scoped = country === ALL ? items : items.filter((item) => item.country === country);
  return buildOptions(scoped, "region");
}

export function filterUsers(items: UserSummary[], country: string, region: string) {
  return items.filter((item) => {
    const countryMatch = country === ALL || item.country === country;
    const regionMatch = region === ALL || item.region === region;
    return countryMatch && regionMatch;
  });
}
