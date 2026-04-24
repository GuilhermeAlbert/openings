"use client";

import type { CommunityFilterOption } from "./types";
import { formatTemplate } from "@/app/opportunities/_components/opportunities-screen/shared/format-template";

interface FiltersPanelProps {
  locale: string;
  filtersMessages: {
    title: string;
    country: string;
    region: string;
    allCountries: string;
    allRegions: string;
    optionWithCount: string;
    clear: string;
  };
  country: string;
  region: string;
  countries: CommunityFilterOption[];
  regions: CommunityFilterOption[];
  onCountryChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onClear: () => void;
}

function optionLabel(template: string, locale: string, value: string, count: number) {
  return formatTemplate(template, {
    label: value,
    count: count.toLocaleString(locale),
  });
}

export function FiltersPanel({
  locale,
  filtersMessages,
  country,
  region,
  countries,
  regions,
  onCountryChange,
  onRegionChange,
  onClear,
}: FiltersPanelProps) {
  return (
    <aside className="rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur sm:p-5">
      <h2 className="text-sm font-semibold text-foreground">{filtersMessages.title}</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            {filtersMessages.country}
          </label>
          <select
            className="h-10 w-full rounded-lg border border-input/75 bg-background/70 px-3 text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            value={country}
            onChange={(event) => onCountryChange(event.target.value)}
          >
            <option value="all">{filtersMessages.allCountries}</option>
            {countries.map((entry) => (
              <option key={entry.value} value={entry.value}>
                {optionLabel(filtersMessages.optionWithCount, locale, entry.value, entry.count)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            {filtersMessages.region}
          </label>
          <select
            className="h-10 w-full rounded-lg border border-input/75 bg-background/70 px-3 text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            value={region}
            onChange={(event) => onRegionChange(event.target.value)}
          >
            <option value="all">{filtersMessages.allRegions}</option>
            {regions.map((entry) => (
              <option key={entry.value} value={entry.value}>
                {optionLabel(filtersMessages.optionWithCount, locale, entry.value, entry.count)}
              </option>
            ))}
          </select>
        </div>

        <div className="md:pb-px">
          <button
            type="button"
            className="h-10 w-full rounded-lg border border-border/70 bg-muted/40 px-4 text-sm font-medium transition hover:bg-muted/60 md:min-w-[150px]"
            onClick={onClear}
          >
            {filtersMessages.clear}
          </button>
        </div>
      </div>
    </aside>
  );
}
