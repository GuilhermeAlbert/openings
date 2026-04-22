"use client";

import * as React from "react";
import {
  AVAILABLE_LOCALES,
  DEFAULT_LOCALE,
  type LocaleCode,
  type LocaleOption,
} from "@/lib/constants/locales";
import { getTranslations } from "@/lib/translations";
import type { TranslationMessages } from "@/lib/translations/types";

interface I18nContextValue {
  locale: LocaleCode;
  locales: readonly LocaleOption[];
  messages: TranslationMessages;
  setLocale: (locale: LocaleCode) => void;
}

const I18nContext = React.createContext<I18nContextValue | null>(null);

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocaleState] = React.useState<LocaleCode>(DEFAULT_LOCALE);

  const setLocale = React.useCallback((nextLocale: LocaleCode) => {
    setLocaleState(nextLocale);

    if (typeof document !== "undefined") {
      document.documentElement.lang = nextLocale;
    }
  }, []);

  const messages = React.useMemo(() => getTranslations(locale), [locale]);

  const value = React.useMemo<I18nContextValue>(
    () => ({
      locale,
      locales: AVAILABLE_LOCALES,
      messages,
      setLocale,
    }),
    [locale, messages, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = React.useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }

  return context;
}
