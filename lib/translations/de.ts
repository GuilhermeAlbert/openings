import type { TranslationMessages } from "./types";

export const deTranslations: TranslationMessages = {
  meta: {
    title: "openings.dev",
    description: "Globale Tech-Job-Intelligence aus Community-Repositories",
  },
  header: {
    brandName: "openings.dev",
    brandTagline: "Community-getriebene Job-Intelligence",
    languagePlaceholder: "Sprache",
    languageAriaLabel: "Sprache auswählen",
    languageChanged: "Sprache auf {language} geändert.",
  },
  home: {
    kicker: "Open-Source-Job-Intelligence",
    title: "Tech-Jobs aus GitHub-Communities an einem durchsuchbaren Ort",
    description:
      "openings.dev verfolgt Job-Issues aus verlässlichen Communities, normalisiert jeden Eintrag und ermöglicht Filter nach Stack, Seniorität, Standort und Remote-Regelung ohne Wechsel zwischen Repositories.",
  },
  footer: {
    brandTagline: "Community-getriebene Job-Intelligence",
    description:
      "Wir indexieren Tech-Jobs, die als GitHub-Issues in Communities aus Brasilien, Portugal, Angola, LATAM und weiteren Ökosystemen veröffentlicht werden.",
    supportText: "Öffentlich gebaut für Kandidaten, Recruiter und Maintainer.",
    supportEmailButtonLabel: "Support-E-Mail kopieren",
    supportEmailCopied: "Support-E-Mail kopiert.",
    supportEmailCopyError: "Support-E-Mail konnte nicht kopiert werden.",
    copyrightTemplate: "© {year} {brand}. Alle Rechte vorbehalten.",
    signature: "powered by",
    groups: {
      project: "Projekt",
      openSource: "Open Source",
      legal: "Rechtliches",
    },
    links: {
      overview: "Überblick",
      apiReference: "API-Referenz",
      status: "Status",
      github: "GitHub",
      contributing: "Mitwirken",
      reportIssue: "Problem melden",
      privacyPolicy: "Datenschutzerklärung",
      termsOfService: "Nutzungsbedingungen",
    },
    social: {
      githubAriaLabel: "openings.dev auf GitHub öffnen",
    },
  },
  documents: {
    sourceLabel: "Quelldatei: {file}",
    overview: {
      title: "Überblick",
      description:
        "Wie openings.dev globale Tech-Job-Daten erfasst, normalisiert und bereitstellt.",
    },
    apiReference: {
      title: "API-Referenz",
      description:
        "Zentrale Endpunkte, Filter und Antwortformate der öffentlichen Jobs-API.",
    },
    contributing: {
      title: "Mitwirken",
      description:
        "Wie man Repositories vorschlägt, Probleme meldet und sicher beiträgt.",
    },
    privacy: {
      title: "Datenschutzerklärung",
      description:
        "Wie wir Daten auf der Plattform erheben, verwenden und schützen.",
    },
    terms: {
      title: "Nutzungsbedingungen",
      description:
        "Regeln und Verantwortlichkeiten für openings.dev und die öffentliche API.",
    },
  },
};
