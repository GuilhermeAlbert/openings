import type { TranslationMessages } from "./types";

export const enTranslations: TranslationMessages = {
  meta: {
    title: "openings.dev",
    description:
      "Global tech jobs intelligence powered by community repositories",
  },
  header: {
    brandName: "openings.dev",
    brandTagline: "Tech jobs from GitHub communities",
    languagePlaceholder: "Language",
    languageAriaLabel: "Select language",
    languageChanged: "Language set to {language}.",
  },
  home: {
    kicker: "Open-source jobs intelligence",
    title: "Tech jobs from community GitHub repos, in one searchable place",
    description:
      "openings.dev tracks job issues published by trusted communities, normalizes every post, and helps you filter by stack, seniority, location, and remote policy without jumping between repositories.",
  },
  footer: {
    brandTagline: "Tech jobs from GitHub communities",
    description:
      "We index tech jobs posted as GitHub issues across communities in Brazil, Portugal, Angola, LATAM, and beyond.",
    supportText: "Built in public for candidates, recruiters, and maintainers.",
    supportEmailButtonLabel: "Copy support email",
    supportEmailCopied: "Support email copied.",
    supportEmailCopyError: "Could not copy support email.",
    copyrightTemplate: "© {year} {brand}. All rights reserved.",
    signature: "powered by",
    groups: {
      project: "Project",
      openSource: "Open Source",
      legal: "Legal",
    },
    links: {
      overview: "Overview",
      apiReference: "API Reference",
      status: "Status",
      github: "GitHub",
      contributing: "Contributing",
      reportIssue: "Report issue",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
    },
    social: {
      githubAriaLabel: "Open openings.dev on GitHub",
    },
  },
  documents: {
    sourceLabel: "Source file: {file}",
    overview: {
      title: "Overview",
      description:
        "How openings.dev collects, normalizes, and serves global tech job data.",
    },
    apiReference: {
      title: "API Reference",
      description:
        "Core endpoints, filters, and response contracts for the public jobs API.",
    },
    contributing: {
      title: "Contributing",
      description:
        "How to propose repositories, report issues, and contribute safely.",
    },
    privacy: {
      title: "Privacy Policy",
      description: "How we collect, use, and protect data across the platform.",
    },
    terms: {
      title: "Terms of Service",
      description:
        "Rules and responsibilities for using openings.dev and its public API.",
    },
  },
};
