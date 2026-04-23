import type { FilterOption } from "@/app/opportunities/_components/opportunities-screen/types";

export function countBy<T>(items: T[], getValue: (item: T) => string) {
  return items.reduce<Record<string, number>>((accumulator, item) => {
    const value = getValue(item);
    accumulator[value] = (accumulator[value] ?? 0) + 1;
    return accumulator;
  }, {});
}

export function withKnownValues(counts: Record<string, number>, values: Iterable<string>) {
  const merged = { ...counts };
  for (const value of values) {
    merged[value] = merged[value] ?? 0;
  }
  return merged;
}

export function sortOptions(
  counts: Record<string, number>,
  labels?: Record<string, string>,
) {
  return Object.entries(counts)
    .sort((left, right) => left[0].localeCompare(right[0]))
    .map(([value, count]) => ({
      value,
      label: labels?.[value] ?? value,
      count,
    })) satisfies FilterOption[];
}
