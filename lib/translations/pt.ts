import type { TranslationMessages } from "./types";

export const ptTranslations: TranslationMessages = {
  meta: {
    title: "openings.dev",
    description:
      "Inteligência global de vagas em tecnologia alimentada por comunidades",
  },
  header: {
    brandName: "openings.dev",
    brandTagline: "Inteligência de vagas movida por comunidades",
    languagePlaceholder: "Idioma",
    languageAriaLabel: "Selecionar idioma",
    languageChanged: "Idioma alterado para {language}.",
  },
  home: {
    kicker: "Inteligência open source de vagas",
    title: "Vagas de tecnologia no GitHub das comunidades, em um só lugar",
    description:
      "O openings.dev acompanha issues de vagas em comunidades confiáveis, normaliza cada anúncio e permite filtrar por stack, senioridade, localização e política remota sem precisar pular entre repositórios.",
  },
  footer: {
    brandTagline: "Inteligência de vagas movida por comunidades",
    description:
      "Indexamos vagas de tecnologia publicadas como issues no GitHub por comunidades do Brasil, Portugal, Angola, LATAM e outros ecossistemas.",
    supportText:
      "Construído em público para candidatos, recrutadores e mantenedores.",
    supportEmailButtonLabel: "Copiar e-mail de suporte",
    supportEmailCopied: "E-mail de suporte copiado.",
    supportEmailCopyError: "Não foi possível copiar o e-mail de suporte.",
    copyrightTemplate: "© {year} {brand}. Todos os direitos reservados.",
    signature: "powered by",
    groups: {
      project: "Projeto",
      openSource: "Open Source",
      legal: "Legal",
    },
    links: {
      overview: "Visão geral",
      apiReference: "Referência da API",
      status: "Status",
      github: "GitHub",
      contributing: "Contribuição",
      reportIssue: "Reportar problema",
      privacyPolicy: "Política de Privacidade",
      termsOfService: "Termos de Serviço",
    },
    social: {
      githubAriaLabel: "Abrir openings.dev no GitHub",
    },
  },
  documents: {
    sourceLabel: "Arquivo de origem: {file}",
    overview: {
      title: "Visão geral",
      description:
        "Como o openings.dev coleta, normaliza e entrega dados globais de vagas em tecnologia.",
    },
    apiReference: {
      title: "Referência da API",
      description:
        "Endpoints principais, filtros e contratos de resposta da API pública de vagas.",
    },
    contributing: {
      title: "Contribuição",
      description:
        "Como sugerir repositórios, reportar problemas e contribuir com segurança.",
    },
    privacy: {
      title: "Política de Privacidade",
      description: "Como coletamos, usamos e protegemos dados na plataforma.",
    },
    terms: {
      title: "Termos de Serviço",
      description:
        "Regras e responsabilidades para uso do openings.dev e da API pública.",
    },
  },
};
