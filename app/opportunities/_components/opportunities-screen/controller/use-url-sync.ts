import * as React from "react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { buildSearchParamsFromFilters } from "./url-filters";
import type { OpportunityFiltersState } from "@/app/opportunities/_components/opportunities-screen/types";

interface UseUrlSyncParams {
  pathname: string;
  currentSearch: string;
  router: AppRouterInstance;
  filtersForUrl: OpportunityFiltersState;
}

export function useUrlSync({
  pathname,
  currentSearch,
  router,
  filtersForUrl,
}: UseUrlSyncParams) {
  const serializedFilters = React.useMemo(
    () => buildSearchParamsFromFilters(filtersForUrl).toString(),
    [filtersForUrl],
  );

  React.useEffect(() => {
    if (serializedFilters === currentSearch) return;
    const href = serializedFilters ? `${pathname}?${serializedFilters}` : pathname;
    router.replace(href, { scroll: false });
  }, [currentSearch, pathname, router, serializedFilters]);
}
