import { DEFAULT_FILTERS } from "./defaults";
import type { OpportunityFiltersState } from "@/app/opportunities/_components/opportunities-screen/types";

export function getActiveFiltersCount(
  filters: OpportunityFiltersState,
  forcedRepository: string | null,
  forcedAuthor: string | null,
) {
  return [
    !forcedRepository && filters.repository !== DEFAULT_FILTERS.repository,
    filters.region !== DEFAULT_FILTERS.region,
    filters.country !== DEFAULT_FILTERS.country,
    filters.tags.length > 0,
    !forcedAuthor && filters.authors.length > 0,
    filters.searchText.trim().length > 0,
    filters.sortOrder !== DEFAULT_FILTERS.sortOrder,
    filters.itemsPerPage !== DEFAULT_FILTERS.itemsPerPage,
  ].filter(Boolean).length;
}
