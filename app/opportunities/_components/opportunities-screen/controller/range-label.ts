import { formatTemplate } from "@/lib/utils/format-template";

interface RangeLabelParams {
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  locale: string;
  zeroResultsLabel: string;
  rangeTemplate: string;
}

export function buildRangeLabel({
  totalCount,
  currentPage,
  itemsPerPage,
  locale,
  zeroResultsLabel,
  rangeTemplate,
}: RangeLabelParams) {
  if (totalCount === 0) {
    return zeroResultsLabel;
  }

  const end = Math.min(currentPage * itemsPerPage, totalCount);
  return formatTemplate(rangeTemplate, {
    start: (1).toLocaleString(locale),
    end: end.toLocaleString(locale),
    total: totalCount.toLocaleString(locale),
  });
}
