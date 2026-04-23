import { REPOSITORIES } from "@/lib/constants/repositories";

export function detectCountryFromNavigator() {
  if (typeof window === "undefined") {
    return null;
  }

  const countryByCode = REPOSITORIES.reduce<Record<string, string>>(
    (accumulator, repository) => {
      if (!accumulator[repository.countryCode]) {
        accumulator[repository.countryCode] = repository.country;
      }
      return accumulator;
    },
    {},
  );

  const locales = [...navigator.languages, navigator.language].filter(Boolean);
  for (const locale of locales) {
    try {
      const region = new Intl.Locale(locale).region;
      if (!region) continue;
      const country = countryByCode[region.toUpperCase()];
      if (country) return country;
    } catch {
      continue;
    }
  }

  return null;
}
