import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocaleRouteSync } from "@/app/_components/locale-route-sync";
import { OpportunitiesPage } from "@/app/opportunities/_components/opportunities-page";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { isLocaleCode, LocaleCode } from "@/lib/constants/locales";
import {
  localizedOpenGraphLocales,
  localizedPublicAlternates,
} from "@/lib/metadata/localized-alternates";
import { createPageMetadata } from "@/lib/metadata/site-metadata";
import { LOCALIZED_ENTRY_LOCALES } from "@/lib/navigation/localized-routes";
import { getTranslations } from "@/lib/translations/get-translations";

interface LocalizedOpportunitiesPageProps {
  params: Promise<{ locale: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALIZED_ENTRY_LOCALES.map((locale) => ({ locale }));
}

function resolvePage(locale: string) {
  if (!isLocaleCode(locale) || locale === LocaleCode.English) return null;
  return { locale, messages: getTranslations(locale) };
}

export async function generateMetadata({
  params,
}: LocalizedOpportunitiesPageProps): Promise<Metadata> {
  const page = resolvePage((await params).locale);
  if (!page) return {};
  const copy = page.messages.opportunities.header;
  const base = createPageMetadata({
    title: `${copy.title} | openings.dev`,
    description: copy.description,
    path: `/${page.locale}/opportunities`,
  });
  const openGraphLocales = localizedOpenGraphLocales(page.locale);
  return {
    ...base,
    alternates: localizedPublicAlternates(page.locale, "/opportunities"),
    openGraph: {
      ...base.openGraph,
      locale: openGraphLocales.locale,
      alternateLocale: openGraphLocales.alternateLocales,
    },
  };
}

export default async function LocalizedOpportunitiesPage({
  params,
}: LocalizedOpportunitiesPageProps): Promise<React.ReactNode> {
  const page = resolvePage((await params).locale);
  if (!page) notFound();

  return (
    <I18nProvider initialLocale={page.locale}>
      <LocaleRouteSync locale={page.locale} />
      <OpportunitiesPage />
    </I18nProvider>
  );
}
