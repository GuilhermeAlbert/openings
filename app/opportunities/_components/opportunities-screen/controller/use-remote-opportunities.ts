import * as React from "react";
import { toast } from "sonner";
import { fetchOpportunitiesPage } from "./api";
import { dedupeOpportunities } from "./filtering";
import { INITIAL_BATCH_SIZE, LOAD_MORE_BATCH_SIZE } from "./defaults";
import type { OpportunityFiltersState, OpportunityItem } from "@/app/opportunities/_components/opportunities-screen/types";

interface UseRemoteOpportunitiesParams {
  serverFilters: Pick<OpportunityFiltersState, "repository" | "region" | "country" | "sortOrder">;
  messages: { loadError: string; rateLimited: string; loadMoreError: string };
  onBeforeReload: () => void;
}

export function useRemoteOpportunities({
  serverFilters,
  messages,
  onBeforeReload,
}: UseRemoteOpportunitiesParams) {
  const [opportunities, setOpportunities] = React.useState<OpportunityItem[]>([]);
  const [nextCursor, setNextCursor] = React.useState<string | null>(null);
  const [hasMoreRemote, setHasMoreRemote] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const fetchAbortRef = React.useRef<AbortController | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();
    fetchAbortRef.current?.abort();
    fetchAbortRef.current = controller;
    queueMicrotask(() => {
      if (controller.signal.aborted) return;
      setIsLoading(true);
      setIsFetchingMore(false);
      setHasMoreRemote(true);
      setNextCursor(null);
      setOpportunities([]);
      onBeforeReload();
    });

    fetchOpportunitiesPage(serverFilters, {
      cursor: null,
      limit: INITIAL_BATCH_SIZE,
      signal: controller.signal,
    })
      .then((payload) => {
        if (controller.signal.aborted) return;
        setOpportunities(payload.items);
        setNextCursor(payload.rateLimited ? null : payload.nextCursor);
        setHasMoreRemote(payload.rateLimited ? false : payload.hasMore);
        if (payload.rateLimited) toast.error(messages.rateLimited);
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error(error);
        setHasMoreRemote(false);
        toast.error(messages.loadError);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [messages.loadError, messages.rateLimited, onBeforeReload, serverFilters]);

  const loadMoreFromApi = React.useCallback(async () => {
    if (!nextCursor || !hasMoreRemote) return false;
    try {
      const payload = await fetchOpportunitiesPage(serverFilters, {
        cursor: nextCursor,
        limit: LOAD_MORE_BATCH_SIZE,
      });
      setOpportunities((previous) => dedupeOpportunities([...previous, ...payload.items]));
      setNextCursor(payload.rateLimited ? null : payload.nextCursor);
      setHasMoreRemote(payload.rateLimited ? false : payload.hasMore);
      if (payload.rateLimited) toast.error(messages.rateLimited);
      return !payload.rateLimited && payload.items.length > 0;
    } catch (error) {
      console.error(error);
      setHasMoreRemote(false);
      toast.error(messages.loadMoreError);
      return false;
    }
  }, [hasMoreRemote, messages.loadMoreError, messages.rateLimited, nextCursor, serverFilters]);

  return {
    opportunities,
    nextCursor,
    hasMoreRemote,
    isLoading,
    isFetchingMore,
    setIsFetchingMore,
    loadMoreFromApi,
  };
}
