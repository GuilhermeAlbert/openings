import type { TranslationMessages } from "./types";

export const frTranslations: TranslationMessages = {
  meta: {
    title: "openings.dev",
    description:
      "Intelligence globale des offres tech alimentée par les communautés",
  },
  header: {
    brandName: "openings.dev",
    brandTagline: "Intelligence emploi portée par les communautés",
    languagePlaceholder: "Langue",
    languageAriaLabel: "Sélectionner la langue",
    languageChanged: "Langue définie sur {language}.",
  },
  home: {
    kicker: "Intelligence open source des offres",
    title:
      "Des offres tech issues des communautés GitHub, réunies dans une seule recherche",
    description:
      "openings.dev suit les issues d'emploi publiées par des communautés fiables, normalise chaque offre et permet de filtrer par stack, séniorité, localisation et politique remote sans passer d'un dépôt à l'autre.",
  },
  footer: {
    brandTagline: "Intelligence emploi portée par les communautés",
    description:
      "Nous indexons les offres tech publiées en issues GitHub par des communautés du Brésil, du Portugal, d'Angola, d'Amérique latine et d'autres écosystèmes.",
    supportText:
      "Construit en public pour les candidats, recruteurs et mainteneurs.",
    supportEmailButtonLabel: "Copier l'e-mail support",
    supportEmailCopied: "E-mail support copié.",
    supportEmailCopyError: "Impossible de copier l'e-mail support.",
    copyrightTemplate: "© {year} {brand}. Tous droits réservés.",
    signature: "powered by",
    groups: {
      project: "Projet",
      openSource: "Open Source",
      legal: "Mentions légales",
    },
    links: {
      overview: "Vue d'ensemble",
      apiReference: "Référence API",
      status: "Statut",
      github: "GitHub",
      contributing: "Contribuer",
      reportIssue: "Signaler un problème",
      privacyPolicy: "Politique de confidentialité",
      termsOfService: "Conditions d'utilisation",
    },
    social: {
      githubAriaLabel: "Ouvrir openings.dev sur GitHub",
    },
  },
  documents: {
    sourceLabel: "Fichier source : {file}",
    overview: {
      title: "Vue d'ensemble",
      description:
        "Comment openings.dev collecte, normalise et sert des données globales d'offres tech.",
    },
    apiReference: {
      title: "Référence API",
      description:
        "Endpoints clés, filtres et formats de réponse de l'API publique.",
    },
    contributing: {
      title: "Contribuer",
      description:
        "Comment proposer des dépôts, signaler des problèmes et contribuer proprement.",
    },
    privacy: {
      title: "Politique de confidentialité",
      description:
        "Comment nous collectons, utilisons et protégeons les données de la plateforme.",
    },
    terms: {
      title: "Conditions d'utilisation",
      description:
        "Règles et responsabilités liées à l'usage de openings.dev et de son API publique.",
    },
  },
};
