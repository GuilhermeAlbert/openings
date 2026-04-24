import { FilterSelect } from "../filter-select";
import { FilterSection } from "../filter-section";
import type { OpportunityFilterOptions, OpportunityFiltersState } from "@/app/opportunities/_components/opportunities-screen/types";

interface FilterScopeGroupProps {
  state: OpportunityFiltersState;
  options: OpportunityFilterOptions;
  labels: {
    section: string;
    repository: string;
    repositoryPlaceholder: string;
    allRepositories: string;
  };
  onFieldChange: (field: "repository", value: string) => void;
}

export function FilterScopeGroup({
  state,
  options,
  labels,
  onFieldChange,
}: FilterScopeGroupProps) {
  return (
    <FilterSection label={labels.section}>
      <div className="grid grid-cols-1 gap-3">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground/85">{labels.repository}</p>
          <FilterSelect
            value={state.repository}
            placeholder={labels.repositoryPlaceholder}
            allLabel={labels.allRepositories}
            options={options.repositories}
            onValueChange={(value) => onFieldChange("repository", value)}
          />
        </div>
      </div>
    </FilterSection>
  );
}
