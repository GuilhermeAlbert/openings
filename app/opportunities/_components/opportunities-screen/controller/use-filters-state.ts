import * as React from "react";
import { toast } from "sonner";
import { DEFAULT_FILTERS } from "./defaults";
import { detectCountryFromNavigator } from "./country";
import { parseFiltersFromSearchParams } from "./url-filters";
import type {
  OnFilterFieldChange,
  OpportunityFiltersState,
} from "@/app/opportunities/_components/opportunities-screen/types";

interface UseFiltersStateParams {
  searchParamsValue: string;
  hasSearchCountry: boolean;
  forcedRepository: string | null;
  forcedAuthor: string | null;
  hasForcedScope: boolean;
  resetSuccessMessage: string;
}

export function useFiltersState(params: UseFiltersStateParams) {
  const [filters, setFilters] = React.useState<OpportunityFiltersState>(() => {
    const parsed = parseFiltersFromSearchParams(new URLSearchParams(params.searchParamsValue));
    if (params.forcedRepository) parsed.repository = params.forcedRepository;
    if (params.forcedAuthor) parsed.authors = [params.forcedAuthor];
    const shouldDetectCountry =
      !params.hasForcedScope &&
      !params.hasSearchCountry &&
      parsed.country === DEFAULT_FILTERS.country;
    if (shouldDetectCountry) {
      const detectedCountry = detectCountryFromNavigator();
      if (detectedCountry) parsed.country = detectedCountry;
    }
    return parsed;
  });

  const handleFieldChange = React.useCallback<OnFilterFieldChange>(
    (field, value) => {
      setFilters((previous) => {
        if (field === "repository" && params.forcedRepository) return previous;
        if (field === "authors" && params.forcedAuthor) return previous;
        const next = { ...previous, [field]: value } as OpportunityFiltersState;
        if (field !== "page" && field !== "viewMode") next.page = 1;
        return next;
      });
    },
    [params.forcedAuthor, params.forcedRepository],
  );

  const handleToggleTag = React.useCallback((tag: string) => {
    setFilters((previous) => ({
      ...previous,
      tags: previous.tags.includes(tag)
        ? previous.tags.filter((entry) => entry !== tag)
        : [...previous.tags, tag],
      page: 1,
    }));
  }, []);

  const handleToggleAuthor = React.useCallback((authorHandle: string) => {
    if (params.forcedAuthor) return;
    setFilters((previous) => ({
      ...previous,
      authors: previous.authors.includes(authorHandle)
        ? previous.authors.filter((entry) => entry !== authorHandle)
        : [...previous.authors, authorHandle],
      page: 1,
    }));
  }, [params.forcedAuthor]);

  const handleClearFilters = React.useCallback(() => {
    setFilters((previous) => ({
      ...DEFAULT_FILTERS,
      repository: params.forcedRepository ?? DEFAULT_FILTERS.repository,
      authors: params.forcedAuthor ? [params.forcedAuthor] : [],
      viewMode: previous.viewMode,
    }));
    toast.success(params.resetSuccessMessage);
  }, [params.forcedAuthor, params.forcedRepository, params.resetSuccessMessage]);

  return {
    filters,
    setFilters,
    handleFieldChange,
    handleToggleTag,
    handleToggleAuthor,
    handleClearFilters,
  };
}
