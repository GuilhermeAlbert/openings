import type {
  CommunityProfileSummary,
  OpportunityItem,
  OpportunitySortOrder,
  UserProfileSummary,
  OpportunityViewMode,
} from "./domain-types";
import type {
  OnFilterFieldChange,
  OpportunityFilterOptions,
  OpportunityFiltersState,
} from "./filter-types";

export interface OpportunitiesFiltersProps {
  state: OpportunityFiltersState;
  options: OpportunityFilterOptions;
  isExpanded: boolean;
  activeFiltersCount: number;
  onExpandedChange: (open: boolean) => void;
  onFieldChange: OnFilterFieldChange;
  onToggleTag: (tag: string) => void;
  onToggleAuthor: (authorHandle: string) => void;
  onClearFilters: () => void;
}

export interface OpportunitiesToolbarProps {
  totalCount: number;
  rangeLabel: string;
  sortOrder: OpportunitySortOrder;
  viewMode: OpportunityViewMode;
  currentPage: number;
  totalPages: number;
  onSortOrderChange: (value: OpportunitySortOrder) => void;
  onViewModeChange: (value: OpportunityViewMode) => void;
}

export interface OpportunitiesListProps {
  items: OpportunityItem[];
  viewMode: OpportunityViewMode;
  selectedOpportunityId: string | null;
  isLoading: boolean;
  isFetchingMore: boolean;
  hasMore: boolean;
  hasActiveFilters: boolean;
  rangeLabel: string;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  skeletonCount: number;
  onLoadMore: () => void;
  onClearFilters: () => void;
  onSelectOpportunity: (item: OpportunityItem) => void;
  onCommunitySelect: (repository: string) => void;
  onAuthorSelect: (authorHandle: string) => void;
  hideCommunityIdentity: boolean;
  hideAuthorIdentity: boolean;
}

export interface OpportunityCardProps {
  item: OpportunityItem;
  viewMode: OpportunityViewMode;
  isSelected: boolean;
  onSelectOpportunity: (item: OpportunityItem) => void;
  onCommunitySelect: (repository: string) => void;
  onAuthorSelect: (authorHandle: string) => void;
  hideCommunityIdentity: boolean;
  hideAuthorIdentity: boolean;
}

export interface ViewModeToggleProps {
  value: OpportunityViewMode;
  onChange: (mode: OpportunityViewMode) => void;
}

export interface OpportunitiesScreenProps {
  forcedRepository?: string;
  forcedAuthor?: string;
  forcedAuthorProfile?: UserProfileSummary | null;
  forcedRepositoryProfile?: CommunityProfileSummary | null;
}

export interface OpportunityDrawerProps {
  item: OpportunityItem | null;
  open: boolean;
  onClose: () => void;
  onCommunitySelect: (repository: string) => void;
  onAuthorSelect: (authorHandle: string) => void;
}
