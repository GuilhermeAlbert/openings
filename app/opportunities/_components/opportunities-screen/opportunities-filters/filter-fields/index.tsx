import type { OpportunitySortOrder } from "@/app/opportunities/_components/opportunities-screen/types";
import { FilterDisplayGroup } from "../filter-display-group";
import { FilterScopeGroup } from "../filter-scope-group";
import { FilterSearch } from "../filter-search";
import { FilterTaxonomyGroup } from "../filter-taxonomy-group";
import type { FilterFieldsProps } from "./types";

export function FilterFields({
  state,
  options,
  labels,
  tagPickerVersion,
  authorPickerVersion,
  onFieldChange,
  onToggleTag,
  onToggleAuthor,
  onTagSelected,
  onAuthorSelected,
}: FilterFieldsProps) {
  return (
    <div className="space-y-3">
      <FilterSearch
        label={labels.searchLabel}
        placeholder={labels.searchPlaceholder}
        value={state.searchText}
        onChange={(value) => onFieldChange("searchText", value)}
      />
      <FilterScopeGroup
        state={state}
        options={options}
        labels={{
          section: labels.scopeSectionLabel,
          repository: labels.repositoryLabel,
          repositoryPlaceholder: labels.repositoryPlaceholder,
          allRepositories: labels.allRepositories,
          region: labels.regionLabel,
          regionPlaceholder: labels.regionPlaceholder,
          allRegions: labels.allRegions,
          country: labels.countryLabel,
          countryPlaceholder: labels.countryPlaceholder,
          allCountries: labels.allCountries,
        }}
        onFieldChange={onFieldChange}
      />
      <FilterTaxonomyGroup
        state={state}
        options={options}
        labels={{
          section: labels.taxonomySectionLabel,
          tags: labels.tagsLabel,
          tagsPlaceholder: labels.tagsPlaceholder,
          noTagsSelected: labels.noTagsSelected,
          authors: labels.authorLabel,
          authorPlaceholder: labels.authorPlaceholder,
          noAuthorsSelected: labels.noAuthorsSelected,
        }}
        tagPickerVersion={tagPickerVersion}
        authorPickerVersion={authorPickerVersion}
        onTagSelected={onTagSelected}
        onToggleTag={onToggleTag}
        onAuthorSelected={onAuthorSelected}
        onToggleAuthor={onToggleAuthor}
      />
      <FilterDisplayGroup
        state={state}
        options={options}
        labels={{
          section: labels.displaySectionLabel,
          itemsPerPage: labels.itemsPerPageLabel,
          itemsPerPagePlaceholder: labels.itemsPerPagePlaceholder,
          itemsPerPageOption: labels.itemsPerPageOption,
          sort: labels.sortLabel,
          sortPlaceholder: labels.sortPlaceholder,
          sortRecent: labels.sortRecent,
          sortOldest: labels.sortOldest,
        }}
        onItemsPerPageChange={(value) => onFieldChange("itemsPerPage", value)}
        onSortOrderChange={(value) =>
          onFieldChange("sortOrder", value as OpportunitySortOrder)
        }
      />
    </div>
  );
}
