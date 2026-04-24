"use client";

import * as React from "react";
import { useI18n } from "@/components/providers/i18n-provider";
import { FiltersPanel } from "./filters-panel";
import { UsersList } from "./users-list";
import {
  buildCountryOptions,
  buildRegionOptions,
  filterUsers,
} from "./filtering";
import type { UsersScreenProps } from "./types";

const PREFERRED_COUNTRY = "Brazil";
const PREFERRED_REGION = "South America";

function resolveInitialFilters(users: UsersScreenProps["users"]) {
  const hasPreferredCountry = users.some((item) => item.country === PREFERRED_COUNTRY);
  if (!hasPreferredCountry) return { country: "all", region: "all" };

  const hasPreferredRegion = users.some(
    (item) => item.country === PREFERRED_COUNTRY && item.region === PREFERRED_REGION,
  );
  return {
    country: PREFERRED_COUNTRY,
    region: hasPreferredRegion ? PREFERRED_REGION : "all",
  };
}

function defaultRegionForCountry(users: UsersScreenProps["users"], country: string) {
  if (country !== PREFERRED_COUNTRY) return "all";
  return users.some((item) => item.country === PREFERRED_COUNTRY && item.region === PREFERRED_REGION)
    ? PREFERRED_REGION
    : "all";
}

export function UsersScreen({ users }: UsersScreenProps) {
  const { locale, messages } = useI18n();
  const copy = messages.users;
  const initialFilters = React.useMemo(() => resolveInitialFilters(users), [users]);
  const [country, setCountry] = React.useState(() => initialFilters.country);
  const [region, setRegion] = React.useState(() => initialFilters.region);
  const countries = React.useMemo(() => buildCountryOptions(users), [users]);
  const regions = React.useMemo(
    () => buildRegionOptions(users, country),
    [users, country],
  );
  const filtered = React.useMemo(
    () => filterUsers(users, country, region),
    [users, country, region],
  );

  const handleCountryChange = React.useCallback((value: string) => {
    setCountry(value);
    setRegion(defaultRegionForCountry(users, value));
  }, [users]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
          {copy.header.kicker}
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {copy.header.title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          {copy.header.description}
        </p>
      </header>

      <div className="mt-10 flex-col gap-4">
        <div className="mb-10">
          <FiltersPanel
            locale={locale}
            filtersMessages={copy.filters}
            country={country}
            region={region}
            countries={countries}
            regions={regions}
            onCountryChange={handleCountryChange}
            onRegionChange={setRegion}
            onClear={() => {
              setCountry(initialFilters.country);
              setRegion(initialFilters.region);
            }}
          />
        </div>

        <UsersList locale={locale} listMessages={copy.list} items={filtered} />
      </div>
    </section>
  );
}
