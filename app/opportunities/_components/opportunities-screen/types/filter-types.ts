import type { OpportunitySortOrder, OpportunityViewMode } from "./domain-types";

export interface OpportunityFiltersState {
  repository: string;
  region: string;
  country: string;
  tags: string[];
  authors: string[];
  searchText: string;
  sortOrder: OpportunitySortOrder;
  itemsPerPage: number;
  viewMode: OpportunityViewMode;
  page: number;
}

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export interface OpportunityFilterOptions {
  repositories: FilterOption[];
  regions: FilterOption[];
  countries: FilterOption[];
  tags: FilterOption[];
  authors: FilterOption[];
  itemsPerPage: number[];
}

export type OnFilterFieldChange = <TField extends keyof OpportunityFiltersState>(
  field: TField,
  value: OpportunityFiltersState[TField],
) => void;
