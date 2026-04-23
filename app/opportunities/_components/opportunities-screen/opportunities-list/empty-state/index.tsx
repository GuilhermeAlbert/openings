import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  hasActiveFilters: boolean;
  noMatchesTitle: string;
  noResultsTitle: string;
  noMatchesDescription: string;
  noResultsDescription: string;
  clearFiltersLabel: string;
  onClearFilters: () => void;
}

export function EmptyState({
  hasActiveFilters,
  noMatchesTitle,
  noResultsTitle,
  noMatchesDescription,
  noResultsDescription,
  clearFiltersLabel,
  onClearFilters,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/15 px-4 text-center">
      <div className="mb-3 inline-flex size-9 items-center justify-center rounded-full border border-border/60 bg-background/60 text-muted-foreground">
        <SearchX className="size-4" />
      </div>
      <h3 className="text-sm font-semibold text-foreground">
        {hasActiveFilters ? noMatchesTitle : noResultsTitle}
      </h3>
      <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
        {hasActiveFilters ? noMatchesDescription : noResultsDescription}
      </p>
      {hasActiveFilters ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={onClearFilters}
        >
          {clearFiltersLabel}
        </Button>
      ) : null}
    </div>
  );
}
