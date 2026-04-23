import * as React from "react";
import type { Dispatch, SetStateAction } from "react";
import type { OpportunityFiltersState } from "@/app/opportunities/_components/opportunities-screen/types";

interface UseLoadMoreHandlerParams {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  isFetchingMore: boolean;
  hasMoreRemote: boolean;
  nextCursor: string | null;
  setIsFetchingMore: Dispatch<SetStateAction<boolean>>;
  setFilters: Dispatch<SetStateAction<OpportunityFiltersState>>;
  loadMoreFromApi: () => Promise<boolean>;
}

export function useLoadMoreHandler(params: UseLoadMoreHandlerParams) {
  return React.useCallback(async () => {
    if (params.isLoading || params.isFetchingMore) return;
    if (params.currentPage < params.totalPages) {
      params.setFilters((previous) => ({
        ...previous,
        page: Math.min(previous.page + 1, params.totalPages),
      }));
      return;
    }
    if (!params.hasMoreRemote || !params.nextCursor) return;
    params.setIsFetchingMore(true);
    const hasNewItems = await params.loadMoreFromApi();
    if (hasNewItems) {
      params.setFilters((previous) => ({ ...previous, page: previous.page + 1 }));
    }
    params.setIsFetchingMore(false);
  }, [params]);
}
