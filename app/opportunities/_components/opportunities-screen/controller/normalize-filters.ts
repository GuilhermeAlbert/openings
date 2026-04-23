import { DEFAULT_FILTERS } from "./defaults";
import type {
  OpportunityFilterOptions,
  OpportunityFiltersState,
} from "@/app/opportunities/_components/opportunities-screen/types";

export function normalizeFilters(
  filters: OpportunityFiltersState,
  options: OpportunityFilterOptions,
  forcedRepository: string | null,
  forcedAuthor: string | null,
) {
  const repositoryValues = new Set(options.repositories.map((option) => option.value));
  const regionValues = new Set(options.regions.map((option) => option.value));
  const countryValues = new Set(options.countries.map((option) => option.value));
  const tagValues = new Set(options.tags.map((option) => option.value));
  const authorValues = new Set(options.authors.map((option) => option.value));

  return {
    ...filters,
    repository: forcedRepository ??
      (repositoryValues.has(filters.repository)
        ? filters.repository
        : DEFAULT_FILTERS.repository),
    region: regionValues.has(filters.region) ? filters.region : DEFAULT_FILTERS.region,
    country: countryValues.has(filters.country) ? filters.country : DEFAULT_FILTERS.country,
    tags: filters.tags.filter((tag) => tagValues.has(tag)),
    authors: forcedAuthor
      ? [forcedAuthor]
      : filters.authors.filter((author) => authorValues.has(author)),
  };
}
