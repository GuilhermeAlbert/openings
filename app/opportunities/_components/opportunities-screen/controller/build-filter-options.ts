import { REPOSITORIES } from "@/lib/constants/repositories";
import { countBy, sortOptions, withKnownValues } from "./filter-option-helpers";
import type { OpportunityFilterOptions, OpportunityItem } from "@/app/opportunities/_components/opportunities-screen/types";

export function buildFilterOptions(openOpportunities: OpportunityItem[]) {
  const repositoryCounts = countBy(openOpportunities, (item) => item.repository);
  const regionCounts = countBy(openOpportunities, (item) => item.region);
  const countryCounts = countBy(openOpportunities, (item) => item.country);
  const tagCounts = countBy(openOpportunities.flatMap((item) => item.tags), (tag) => tag);
  const authorCounts = countBy(openOpportunities, (item) => item.author.handle);

  const authorLabels = openOpportunities.reduce<Record<string, string>>(
    (accumulator, item) => {
      accumulator[item.author.handle] = item.author.name;
      return accumulator;
    },
    {},
  );

  return {
    repositories: sortOptions(
      withKnownValues(repositoryCounts, REPOSITORIES.map((repository) => repository.repository)),
    ),
    regions: sortOptions(
      withKnownValues(regionCounts, REPOSITORIES.map((repository) => repository.region)),
    ),
    countries: sortOptions(
      withKnownValues(countryCounts, REPOSITORIES.map((repository) => repository.country)),
    ),
    tags: sortOptions(tagCounts),
    authors: sortOptions(authorCounts, authorLabels),
    itemsPerPage: [10, 20, 30, 50],
  } satisfies OpportunityFilterOptions;
}
