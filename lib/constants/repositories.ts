import repositorySource from "./repositories.json";

export type RepositoryScope = "global" | "national" | "regional" | "city";
export type RepositorySource = "legacy-apibr" | "github-search";

export interface RepositoryConfig {
  repository: string;
  owner: string;
  name: string;
  url: string;
  country: string;
  countryCode: string;
  region: string;
  locale: string;
  scope: RepositoryScope;
  source: RepositorySource;
  queryHints: string[];
}

export interface RepositoryCatalog {
  generatedAt: string;
  searchKeywords: string[];
  repositories: RepositoryConfig[];
}

export const REPOSITORY_CATALOG = repositorySource as RepositoryCatalog;
export const REPOSITORIES = REPOSITORY_CATALOG.repositories;
export const REPOSITORY_SEARCH_KEYWORDS = REPOSITORY_CATALOG.searchKeywords;
export const REPOSITORY_CATALOG_GENERATED_AT = REPOSITORY_CATALOG.generatedAt;

export default REPOSITORIES;
