import {
  AVAILABLE_LOCALES,
  LocaleCode,
  type LocaleCode as LocaleCodeType,
} from "@/lib/constants/locales";

export const LOCALIZED_ENTRY_LOCALES = AVAILABLE_LOCALES
  .map(({ code }) => code)
  .filter((code) => code !== LocaleCode.English);

const LOCALE_CODES = new Set<string>(AVAILABLE_LOCALES.map(({ code }) => code));

export function localizedEntryPath(
  path: "/" | "/opportunities",
  locale: LocaleCodeType,
): string {
  if (locale === LocaleCode.English) return path;
  return path === "/" ? `/${locale}/` : `/${locale}${path}`;
}

export function localizedLocaleFromPath(pathname: string): LocaleCodeType | null {
  const locale = pathname.split("/")[1];
  return locale && LOCALE_CODES.has(locale) ? locale as LocaleCodeType : null;
}

export function localizedEquivalentPath(
  pathname: string,
  locale: LocaleCodeType,
): string | null {
  const currentLocale = localizedLocaleFromPath(pathname);
  const unprefixedPath = currentLocale
    ? pathname.slice(currentLocale.length + 1) || "/"
    : pathname;

  if (unprefixedPath === "/" || unprefixedPath === "/opportunities") {
    return localizedEntryPath(unprefixedPath, locale);
  }

  if (currentLocale && unprefixedPath.startsWith("/discover/")) {
    return `/${locale}${unprefixedPath}`;
  }

  return null;
}
