import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { compactSelectTriggerStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import { formatTemplate } from "@/app/opportunities/_components/opportunities-screen/shared/format-template";
import { FilterSection } from "../filter-section";
import type { OpportunityFilterOptions, OpportunityFiltersState, OpportunitySortOrder } from "@/app/opportunities/_components/opportunities-screen/types";

interface FilterDisplayGroupProps {
  state: OpportunityFiltersState;
  options: OpportunityFilterOptions;
  labels: {
    section: string;
    itemsPerPage: string;
    itemsPerPagePlaceholder: string;
    itemsPerPageOption: string;
    sort: string;
    sortPlaceholder: string;
    sortRecent: string;
    sortOldest: string;
  };
  onItemsPerPageChange: (value: number) => void;
  onSortOrderChange: (value: OpportunitySortOrder) => void;
}

export function FilterDisplayGroup({
  state,
  options,
  labels,
  onItemsPerPageChange,
  onSortOrderChange,
}: FilterDisplayGroupProps) {
  return (
    <FilterSection label={labels.section}>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground/85">{labels.itemsPerPage}</p>
          <Select
            value={String(state.itemsPerPage)}
            onValueChange={(value) => onItemsPerPageChange(Number(value))}
          >
            <SelectTrigger className={compactSelectTriggerStyles()}>
              <SelectValue placeholder={labels.itemsPerPagePlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {options.itemsPerPage.map((value) => (
                <SelectItem key={value} value={String(value)}>
                  {formatTemplate(labels.itemsPerPageOption, { count: value })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-muted-foreground/85">{labels.sort}</p>
          <Select value={state.sortOrder} onValueChange={onSortOrderChange}>
            <SelectTrigger className={compactSelectTriggerStyles()}>
              <SelectValue placeholder={labels.sortPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">{labels.sortRecent}</SelectItem>
              <SelectItem value="oldest">{labels.sortOldest}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </FilterSection>
  );
}
