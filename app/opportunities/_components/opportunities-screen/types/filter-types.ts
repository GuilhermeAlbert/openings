import type {
  OpportunityFilterFacets,
  OpportunitySortOrder,
  OpportunityViewMode,
} from "@/lib/opportunities/types";

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

export interface OpportunityTagCategoryOptions {
  workModel: FilterOption[];
  stack: FilterOption[];
  seniority: FilterOption[];
  other: FilterOption[];
}

export interface OpportunityFilterOptions {
  repositories: FilterOption[];
  regions: FilterOption[];
  countries: FilterOption[];
  tags: FilterOption[];
  tagCategories: OpportunityTagCategoryOptions;
  authors: FilterOption[];
  itemsPerPage: number[];
}

export type OnFilterFieldChange = <TField extends keyof OpportunityFiltersState>(
  field: TField,
  value: OpportunityFiltersState[TField],
) => void;

export type { OpportunityFilterFacets };
