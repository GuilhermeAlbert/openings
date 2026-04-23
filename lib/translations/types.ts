export interface DocumentMessages {
  title: string;
  description: string;
}

export interface TranslationMessages {
  meta: {
    title: string;
    description: string;
  };
  header: {
    brandName: string;
    brandTagline: string;
    languagePlaceholder: string;
    languageAriaLabel: string;
    languageChanged: string;
  };
  home: {
    kicker: string;
    title: string;
    description: string;
  };
  footer: {
    brandTagline: string;
    description: string;
    supportText: string;
    supportEmailButtonLabel: string;
    supportEmailCopied: string;
    supportEmailCopyError: string;
    copyrightTemplate: string;
    signature: string;
    groups: {
      project: string;
      openSource: string;
      legal: string;
    };
    links: {
      overview: string;
      apiReference: string;
      status: string;
      github: string;
      contributing: string;
      reportIssue: string;
      privacyPolicy: string;
      termsOfService: string;
    };
    social: {
      githubAriaLabel: string;
    };
  };
  documents: {
    sourceLabel: string;
    overview: DocumentMessages;
    apiReference: DocumentMessages;
    contributing: DocumentMessages;
    privacy: DocumentMessages;
    terms: DocumentMessages;
  };
}
