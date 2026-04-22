import {
  AVAILABLE_LOCALES,
  DEFAULT_LOCALE,
  type LocaleCode,
} from "@/lib/constants/locales";
import { deTranslations } from "./de";
import { enTranslations } from "./en";
import { esTranslations } from "./es";
import { frTranslations } from "./fr";
import { itTranslations } from "./it";
import { ptTranslations } from "./pt";
import type { TranslationMessages } from "./types";

const TRANSLATIONS_BY_LOCALE: Record<LocaleCode, TranslationMessages> = {
  en: enTranslations,
  pt: ptTranslations,
  es: esTranslations,
  it: itTranslations,
  fr: frTranslations,
  de: deTranslations,
};

export function getTranslations(locale: LocaleCode): TranslationMessages {
  return TRANSLATIONS_BY_LOCALE[locale] ?? TRANSLATIONS_BY_LOCALE[DEFAULT_LOCALE];
}

export const TRANSLATION_LOCALES = AVAILABLE_LOCALES;
