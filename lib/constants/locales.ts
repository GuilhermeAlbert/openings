export const AVAILABLE_LOCALES = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "pt", label: "Portuguese", nativeLabel: "Português" },
  { code: "es", label: "Spanish", nativeLabel: "Español" },
  { code: "it", label: "Italian", nativeLabel: "Italiano" },
  { code: "fr", label: "French", nativeLabel: "Français" },
  { code: "de", label: "German", nativeLabel: "Deutsch" },
] as const;

export type LocaleCode = (typeof AVAILABLE_LOCALES)[number]["code"];

export type LocaleOption = (typeof AVAILABLE_LOCALES)[number];

export const DEFAULT_LOCALE: LocaleCode = "en";

export function isLocaleCode(value: string): value is LocaleCode {
  return AVAILABLE_LOCALES.some((locale) => locale.code === value);
}
