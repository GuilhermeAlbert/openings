import type { TranslationMessages } from "./types";

export const esTranslations: TranslationMessages = {
  meta: {
    title: "openings.dev",
    description:
      "Inteligencia global de empleos tech impulsada por comunidades",
  },
  header: {
    brandName: "openings.dev",
    brandTagline: "Inteligencia laboral impulsada por comunidades",
    languagePlaceholder: "Idioma",
    languageAriaLabel: "Seleccionar idioma",
    languageChanged: "Idioma actualizado a {language}.",
  },
  home: {
    kicker: "Inteligencia open source de empleos",
    title:
      "Empleos tech de repositorios comunitarios de GitHub, en un solo lugar",
    description:
      "openings.dev sigue issues de empleo publicados por comunidades confiables, normaliza cada vacante y permite filtrar por stack, seniority, ubicación y política remota sin saltar entre repositorios.",
  },
  footer: {
    brandTagline: "Inteligencia laboral impulsada por comunidades",
    description:
      "Indexamos empleos tech publicados como issues de GitHub en comunidades de Brasil, Portugal, Angola, LATAM y otros ecosistemas.",
    supportText:
      "Construido en público para candidatos, reclutadores y mantenedores.",
    supportEmailButtonLabel: "Copiar correo de soporte",
    supportEmailCopied: "Correo de soporte copiado.",
    supportEmailCopyError: "No se pudo copiar el correo de soporte.",
    copyrightTemplate: "© {year} {brand}. Todos los derechos reservados.",
    signature: "powered by",
    groups: {
      project: "Proyecto",
      openSource: "Open Source",
      legal: "Legal",
    },
    links: {
      overview: "Resumen",
      apiReference: "Referencia de API",
      status: "Estado",
      github: "GitHub",
      contributing: "Contribuir",
      reportIssue: "Reportar problema",
      privacyPolicy: "Política de Privacidad",
      termsOfService: "Términos de Servicio",
    },
    social: {
      githubAriaLabel: "Abrir openings.dev en GitHub",
    },
  },
  documents: {
    sourceLabel: "Archivo fuente: {file}",
    overview: {
      title: "Resumen",
      description:
        "Cómo openings.dev recopila, normaliza y entrega datos globales de empleo tech.",
    },
    apiReference: {
      title: "Referencia de API",
      description:
        "Endpoints principales, filtros y contratos de respuesta de la API pública de empleos.",
    },
    contributing: {
      title: "Contribuir",
      description:
        "Cómo proponer repositorios, reportar problemas y contribuir de forma segura.",
    },
    privacy: {
      title: "Política de Privacidad",
      description:
        "Cómo recopilamos, usamos y protegemos datos en la plataforma.",
    },
    terms: {
      title: "Términos de Servicio",
      description:
        "Reglas y responsabilidades para usar openings.dev y su API pública.",
    },
  },
};
