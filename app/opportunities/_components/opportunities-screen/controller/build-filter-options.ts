import { countBy, sortOptions } from "./filter-option-helpers";
import { groupTagOptionsByCategory } from "./tag-categories";
import { condenseTagOptions } from "./tag-normalization";
import type {
  OpportunityFilterFacets,
  OpportunityFilterOptions,
  OpportunityItem,
} from "@/app/opportunities/_components/opportunities-screen/types";

function nonZeroOptions<T extends { count: number }>(options: T[]) {
  return options.filter((option) => option.count > 0);
}

export function buildFilterOptions(
  openOpportunities: OpportunityItem[],
  facets: OpportunityFilterFacets | null,
  locale: string,
) {
  const repositoryCounts = facets?.repositories ??
    countBy(openOpportunities, (item) => item.repository);
  const regionCounts = facets?.regions ??
    countBy(openOpportunities, (item) => item.region);
  const countryCounts = facets?.countries ??
    countBy(openOpportunities, (item) => item.country);
  const rawTagCounts = facets?.tags ??
    countBy(openOpportunities.flatMap((item) => item.tags), (tag) => tag);
  const authorCounts = facets?.authors ??
    countBy(openOpportunities, (item) => item.author.handle);

  const authorLabels = facets?.authorLabels ??
    openOpportunities.reduce<Record<string, string>>((accumulator, item) => {
      accumulator[item.author.handle] = item.author.name;
      return accumulator;
    }, {});
  const tagOptions = nonZeroOptions(condenseTagOptions(rawTagCounts, locale));

  return {
    repositories: nonZeroOptions(sortOptions(repositoryCounts)),
    regions: nonZeroOptions(sortOptions(regionCounts)),
    countries: nonZeroOptions(sortOptions(countryCounts)),
    tags: tagOptions,
    tagCategories: groupTagOptionsByCategory(tagOptions),
    authors: nonZeroOptions(sortOptions(authorCounts, authorLabels)),
    itemsPerPage: [10, 20, 30, 50],
  } satisfies OpportunityFilterOptions;
}
