import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useI18n } from "@/components/providers/i18n-provider";
import { buildCommunityPath, buildUserPath } from "@/lib/opportunities/routing";
import { buildServerFilters } from "./server-filters";
import { normalizeForcedAuthor } from "./normalize-forced-author";
import { useDerivedOpportunities } from "./use-derived-opportunities";
import { useFiltersState } from "./use-filters-state";
import { useForcedAuthorAutoload } from "./use-forced-author-autoload";
import { useLoadMoreHandler } from "./use-load-more-handler";
import { useRemoteOpportunities } from "./use-remote-opportunities";
import { useUrlSync } from "./use-url-sync";
import type { OpportunitiesScreenProps } from "@/app/opportunities/_components/opportunities-screen/types";
export function useOpportunitiesScreenController({ forcedRepository, forcedAuthor }: OpportunitiesScreenProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale, messages } = useI18n();
  const opportunitiesMessages = messages.opportunities;
  const normalizedForcedRepository = forcedRepository?.trim() || null;
  const normalizedForcedAuthor = normalizeForcedAuthor(forcedAuthor);
  const hasForcedScope = Boolean(normalizedForcedRepository || normalizedForcedAuthor);
  const [selectedOpportunityId, setSelectedOpportunityId] = React.useState<string | null>(null);
  const [filtersExpanded, setFiltersExpanded] = React.useState(true);
  const { filters, setFilters, handleFieldChange, handleToggleTag, handleToggleAuthor, handleClearFilters } = useFiltersState({
    searchParamsValue: searchParams.toString(),
    hasSearchCountry: searchParams.has("country"),
    forcedRepository: normalizedForcedRepository,
    forcedAuthor: normalizedForcedAuthor,
    hasForcedScope,
    resetSuccessMessage: opportunitiesMessages.feedback.filtersReset,
  });
  const serverFilters = React.useMemo(() => buildServerFilters(filters, normalizedForcedRepository), [filters, normalizedForcedRepository]);
  const handleBeforeReload = React.useCallback(() => {
    setSelectedOpportunityId(null);
    setFilters((previous) => (previous.page === 1 ? previous : { ...previous, page: 1 }));
  }, [setFilters]);
  const remote = useRemoteOpportunities({ serverFilters, onBeforeReload: handleBeforeReload, messages: opportunitiesMessages.feedback });
  const derived = useDerivedOpportunities({
    opportunities: remote.opportunities,
    filters,
    selectedOpportunityId,
    forcedRepository: normalizedForcedRepository,
    forcedAuthor: normalizedForcedAuthor,
    locale,
    rangeMessages: opportunitiesMessages.range,
  });
  const filtersForUrl = React.useMemo(() => ({ ...derived.normalizedFilters, page: derived.currentPage }), [derived.currentPage, derived.normalizedFilters]);
  useUrlSync({ pathname, router, currentSearch: searchParams.toString(), filtersForUrl });
  const hasMore = derived.currentPage < derived.totalPages || remote.hasMoreRemote;
  const handleLoadMore = useLoadMoreHandler({
    currentPage: derived.currentPage,
    totalPages: derived.totalPages,
    isLoading: remote.isLoading,
    isFetchingMore: remote.isFetchingMore,
    hasMoreRemote: remote.hasMoreRemote,
    nextCursor: remote.nextCursor,
    setIsFetchingMore: remote.setIsFetchingMore,
    setFilters,
    loadMoreFromApi: remote.loadMoreFromApi,
  });
  useForcedAuthorAutoload({
    forcedAuthor: normalizedForcedAuthor,
    isLoading: remote.isLoading,
    isFetchingMore: remote.isFetchingMore,
    hasMoreRemote: remote.hasMoreRemote,
    nextCursor: remote.nextCursor,
    filteredCount: derived.filteredOpportunities.length,
    onLoadMore: handleLoadMore,
  });
  return {
    opportunitiesMessages,
    filtersExpanded,
    setFiltersExpanded,
    handleFieldChange,
    handleToggleTag,
    handleToggleAuthor,
    handleClearFilters,
    handleLoadMore,
    hasMore,
    selectedOpportunity: derived.selectedOpportunity,
    isDetailsOpen: derived.isDetailsOpen,
    selectedOpportunityId: derived.selectedOpportunity?.id ?? null,
    options: derived.options,
    normalizedFilters: derived.normalizedFilters,
    rangeLabel: derived.rangeLabel,
    totalCount: derived.totalCount,
    currentPage: derived.currentPage,
    totalPages: derived.totalPages,
    activeFiltersCount: derived.activeFiltersCount,
    hasActiveFilters: derived.hasActiveFilters,
    visibleOpportunities: derived.visibleOpportunities,
    isLoading: remote.isLoading,
    isFetchingMore: remote.isFetchingMore,
    setSelectedOpportunityId,
    onCommunitySelect: (repository: string) => router.push(buildCommunityPath(repository)),
    onAuthorSelect: (authorHandle: string) => router.push(buildUserPath(authorHandle)),
  };
}
