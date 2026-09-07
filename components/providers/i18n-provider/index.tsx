"use client";

import * as React from "react";
import {
  AVAILABLE_LOCALES,
  DEFAULT_LOCALE,
  type LocaleCode,
} from "@/lib/constants/locales";
import { getTranslations } from "@/lib/translations/get-translations";
import { I18nContext } from "./context";
import { LOCALE_CHANGE_EVENT } from "./constants";
import {
  getStoredLocale,
  setStoredLocale,
  subscribeLocaleStore,
} from "./helpers";
import type { I18nContextValue } from "./types";

interface I18nProviderProps extends React.PropsWithChildren {
  initialLocale?: LocaleCode;
}

export function I18nProvider({
  children,
  initialLocale,
}: I18nProviderProps): React.ReactNode {
  const getLocaleSnapshot = React.useCallback(
    () => initialLocale ?? getStoredLocale(),
    [initialLocale],
  );
  const getServerLocaleSnapshot = React.useCallback(
    () => initialLocale ?? DEFAULT_LOCALE,
    [initialLocale],
  );
  const locale = React.useSyncExternalStore(
    subscribeLocaleStore,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );

  const setLocale = React.useCallback((nextLocale: LocaleCode) => {
    setStoredLocale(nextLocale);
    window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
  }, []);

  React.useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const messages = React.useMemo(() => getTranslations(locale), [locale]);
  const value = React.useMemo<I18nContextValue>(
    () => ({ locale, locales: AVAILABLE_LOCALES, messages, setLocale }),
    [locale, messages, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
