import {
  AVAILABLE_LOCALES,
  LocaleCode,
} from "@/lib/constants/locales";
import { resolveCanonicalUrl } from "./site-metadata";

const OPEN_GRAPH_LOCALES: Record<LocaleCode, string> = {
  [LocaleCode.English]: "en_US",
  [LocaleCode.Portuguese]: "pt_BR",
  [LocaleCode.Spanish]: "es_ES",
  [LocaleCode.Italian]: "it_IT",
  [LocaleCode.French]: "fr_FR",
  [LocaleCode.German]: "de_DE",
};

export function localizedAlternates(locale: LocaleCode, path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const languages = Object.fromEntries(AVAILABLE_LOCALES.map(({ code }) => [
    code,
    resolveCanonicalUrl(`/${code}${normalizedPath}`),
  ]));
  return {
    canonical: languages[locale],
    languages: { ...languages, "x-default": languages.en },
  };
}

export function localizedOpenGraphLocales(locale: LocaleCode) {
  return {
    locale: OPEN_GRAPH_LOCALES[locale],
    alternateLocales: AVAILABLE_LOCALES
      .filter(({ code }) => code !== locale)
      .map(({ code }) => OPEN_GRAPH_LOCALES[code]),
  };
}
