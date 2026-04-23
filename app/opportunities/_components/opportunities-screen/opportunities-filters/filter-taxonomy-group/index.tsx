import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { compactSelectTriggerStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import { FilterSection } from "../filter-section";
import { SelectedChipList } from "../selected-chip-list";
import type { OpportunityFilterOptions, OpportunityFiltersState } from "@/app/opportunities/_components/opportunities-screen/types";

interface FilterTaxonomyGroupProps {
  state: OpportunityFiltersState;
  options: OpportunityFilterOptions;
  tagPickerVersion: number;
  authorPickerVersion: number;
  labels: {
    section: string;
    tags: string;
    tagsPlaceholder: string;
    noTagsSelected: string;
    authors: string;
    authorPlaceholder: string;
    noAuthorsSelected: string;
  };
  onTagSelected: (tag: string) => void;
  onToggleTag: (tag: string) => void;
  onAuthorSelected: (author: string) => void;
  onToggleAuthor: (author: string) => void;
}

export function FilterTaxonomyGroup({
  state,
  options,
  tagPickerVersion,
  authorPickerVersion,
  labels,
  onTagSelected,
  onToggleTag,
  onAuthorSelected,
  onToggleAuthor,
}: FilterTaxonomyGroupProps) {
  const selectedAuthors = state.authors.map((author) => ({
    key: author,
    label: options.authors.find((option) => option.value === author)?.label ?? author,
  }));

  return (
    <FilterSection label={labels.section}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground/85">{labels.tags}</p>
          <Select key={tagPickerVersion} onValueChange={onTagSelected}>
            <SelectTrigger className={compactSelectTriggerStyles()}>
              <SelectValue placeholder={labels.tagsPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {options.tags.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label} ({option.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <SelectedChipList
            items={state.tags.map((tag) => ({ key: tag, label: tag }))}
            emptyLabel={labels.noTagsSelected}
            onRemove={onToggleTag}
          />
        </div>

        <div className="space-y-1">
          <p className="text-xs text-muted-foreground/85">{labels.authors}</p>
          <Select key={authorPickerVersion} onValueChange={onAuthorSelected}>
            <SelectTrigger className={compactSelectTriggerStyles()}>
              <SelectValue placeholder={labels.authorPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {options.authors.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label} ({option.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <SelectedChipList
            items={selectedAuthors}
            emptyLabel={labels.noAuthorsSelected}
            onRemove={onToggleAuthor}
          />
        </div>
      </div>
    </FilterSection>
  );
}
