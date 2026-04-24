import {
  DEFAULT_FILTERS,
  KNOWN_COUNTRIES,
  KNOWN_REGIONS,
  KNOWN_REPOSITORIES,
} from "./defaults";
import type { OpportunityFiltersState } from "@/app/opportunities/_components/opportunities-screen/types";

export function buildServerFilters(
  filters: Pick<
    OpportunityFiltersState,
    "repository" | "region" | "country" | "sortOrder"
  >,
  forcedRepository: string | null,
) {
  return {
    repository: forcedRepository ??
      (filters.repository === "all" || KNOWN_REPOSITORIES.has(filters.repository)
        ? filters.repository
        : DEFAULT_FILTERS.repository),
    region:
      filters.region === "all" || KNOWN_REGIONS.has(filters.region)
        ? filters.region
        : DEFAULT_FILTERS.region,
    country: filters.country === "all" || KNOWN_COUNTRIES.has(filters.country)
      ? filters.country
      : DEFAULT_FILTERS.country,
    sortOrder: filters.sortOrder,
  };
}
