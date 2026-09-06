import { AVAILABLE_LOCALES } from "@/lib/constants/locales";
import { EXTERNAL_ROUTES } from "@/lib/navigation/routes";
import {
  SITE_DEFAULT_DESCRIPTION,
  SITE_NAME,
  resolvePublicSiteUrl,
} from "./site-metadata";

export function buildSiteIdentityJsonLd(): Record<string, unknown> {
  const websiteId = resolvePublicSiteUrl("/#website");
  const organizationId = resolvePublicSiteUrl("/#organization");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: SITE_NAME,
        url: resolvePublicSiteUrl("/"),
        description: SITE_DEFAULT_DESCRIPTION,
        inLanguage: AVAILABLE_LOCALES.map(({ code }) => code),
        publisher: { "@id": organizationId },
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: SITE_NAME,
        url: resolvePublicSiteUrl("/"),
        description: SITE_DEFAULT_DESCRIPTION,
        logo: resolvePublicSiteUrl("/brand-mark-light.svg"),
        sameAs: [
          EXTERNAL_ROUTES.githubRepository,
          EXTERNAL_ROUTES.linkedin,
          EXTERNAL_ROUTES.bluesky,
          EXTERNAL_ROUTES.mastodon,
          EXTERNAL_ROUTES.threads,
          EXTERNAL_ROUTES.instagram,
        ],
      },
    ],
  };
}

export function serializeSiteIdentityJsonLd(value: Record<string, unknown>): string {
  return JSON.stringify(value).replace(/</gu, "\\u003c");
}
