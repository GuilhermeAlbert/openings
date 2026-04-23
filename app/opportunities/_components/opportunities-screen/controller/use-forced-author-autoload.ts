import * as React from "react";

interface UseForcedAuthorAutoloadParams {
  forcedAuthor: string | null;
  isLoading: boolean;
  isFetchingMore: boolean;
  hasMoreRemote: boolean;
  nextCursor: string | null;
  filteredCount: number;
  onLoadMore: () => Promise<void>;
}

export function useForcedAuthorAutoload({
  forcedAuthor,
  isLoading,
  isFetchingMore,
  hasMoreRemote,
  nextCursor,
  filteredCount,
  onLoadMore,
}: UseForcedAuthorAutoloadParams) {
  React.useEffect(() => {
    if (!forcedAuthor || isLoading || isFetchingMore) return;
    if (filteredCount > 0 || !hasMoreRemote || !nextCursor) return;
    queueMicrotask(() => void onLoadMore());
  }, [
    filteredCount,
    forcedAuthor,
    hasMoreRemote,
    isFetchingMore,
    isLoading,
    nextCursor,
    onLoadMore,
  ]);
}
