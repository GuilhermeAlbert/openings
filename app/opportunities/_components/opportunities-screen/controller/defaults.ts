import { REPOSITORIES } from "@/lib/constants/repositories";
import type { OpportunityFiltersState } from "@/app/opportunities/_components/opportunities-screen/types";

export const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 50] as const;
export const INITIAL_BATCH_SIZE = 60;
export const LOAD_MORE_BATCH_SIZE = 40;

export const DEFAULT_FILTERS: OpportunityFiltersState = {
  repository: "all",
  region: "all",
  country: "Brazil",
  tags: [],
  authors: [],
  searchText: "",
  sortOrder: "recent",
  itemsPerPage: 20,
  viewMode: "list",
  page: 1,
};

export const KNOWN_REPOSITORIES = new Set(
  REPOSITORIES.map((repository) => repository.repository),
);
export const KNOWN_REGIONS = new Set(
  REPOSITORIES.map((repository) => repository.region),
);
export const KNOWN_COUNTRIES = new Set(
  REPOSITORIES.map((repository) => repository.country),
);
