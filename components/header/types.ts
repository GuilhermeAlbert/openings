import type { LocaleCode, LocaleOption } from "@/lib/constants/locales";

export type { LocaleCode, LocaleOption };

export interface HeaderProps {
  className?: string;
  logoHref?: string;
  locale?: LocaleCode;
  locales?: readonly LocaleOption[];
  position?: "sticky" | "static";
  onLocaleChange?: (locale: LocaleCode) => void;
}

export interface BrandLogoProps {
  className?: string;
  href?: string;
  brandName?: string;
  brandTagline?: string;
  lightLogoSrc?: string;
  darkLogoSrc?: string;
}

export interface ThemeToggleProps {
  className?: string;
}

export interface LanguageSwitcherProps {
  className?: string;
  locale: LocaleCode;
  locales: readonly LocaleOption[];
  placeholder?: string;
  ariaLabel?: string;
  changedTemplate?: string;
  announceChange?: boolean;
  onLocaleChange: (locale: LocaleCode) => void;
}
