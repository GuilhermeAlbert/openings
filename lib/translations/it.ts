import type { TranslationMessages } from "./types";

export const itTranslations: TranslationMessages = {
  meta: {
    title: "openings.dev",
    description:
      "Intelligence globale per offerte tech alimentata dalle community",
  },
  header: {
    brandName: "openings.dev",
    brandTagline: "Intelligence lavoro guidata dalle community",
    languagePlaceholder: "Lingua",
    languageAriaLabel: "Seleziona lingua",
    languageChanged: "Lingua impostata su {language}.",
  },
  home: {
    kicker: "Intelligence open source per offerte",
    title:
      "Offerte tech dai repository GitHub delle community, in un'unica ricerca",
    description:
      "openings.dev monitora issue di lavoro pubblicate da community affidabili, normalizza ogni annuncio e permette filtri per stack, seniority, localizzazione e policy remote senza passare da un repository all'altro.",
  },
  footer: {
    brandTagline: "Intelligence lavoro guidata dalle community",
    description:
      "Indicizziamo offerte tech pubblicate come issue GitHub da community in Brasile, Portogallo, Angola, LATAM e altri ecosistemi.",
    supportText: "Costruito in pubblico per candidati, recruiter e maintainer.",
    supportEmailButtonLabel: "Copia e-mail supporto",
    supportEmailCopied: "E-mail di supporto copiata.",
    supportEmailCopyError: "Impossibile copiare l'e-mail di supporto.",
    copyrightTemplate: "© {year} {brand}. Tutti i diritti riservati.",
    signature: "powered by",
    groups: {
      project: "Progetto",
      openSource: "Open Source",
      legal: "Legale",
    },
    links: {
      overview: "Panoramica",
      apiReference: "Riferimento API",
      status: "Stato",
      github: "GitHub",
      contributing: "Contribuire",
      reportIssue: "Segnala problema",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Termini di Servizio",
    },
    social: {
      githubAriaLabel: "Apri openings.dev su GitHub",
    },
  },
  documents: {
    sourceLabel: "File sorgente: {file}",
    overview: {
      title: "Panoramica",
      description:
        "Come openings.dev raccoglie, normalizza e distribuisce dati globali sulle offerte tech.",
    },
    apiReference: {
      title: "Riferimento API",
      description:
        "Endpoint principali, filtri e contratti di risposta dell'API pubblica.",
    },
    contributing: {
      title: "Contribuire",
      description:
        "Come proporre repository, segnalare problemi e contribuire in modo sicuro.",
    },
    privacy: {
      title: "Privacy Policy",
      description:
        "Come raccogliamo, utilizziamo e proteggiamo i dati sulla piattaforma.",
    },
    terms: {
      title: "Termini di Servizio",
      description:
        "Regole e responsabilità per l'uso di openings.dev e della sua API pubblica.",
    },
  },
};
