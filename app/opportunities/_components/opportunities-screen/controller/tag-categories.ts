import type { FilterOption, OpportunityTagCategoryOptions } from "@/app/opportunities/_components/opportunities-screen/types";

const WORK_MODEL_KEYWORDS = [
  "remote",
  "remoto",
  "hibrido",
  "hybrid",
  "onsite",
  "on-site",
  "on site",
  "presencial",
  "alocado",
  "work remotely",
  "local",
];

const STACK_KEYWORDS = [
  "react", "php", "node", "typescript", "javascript", "java", "python", "golang",
  "go", "ruby", "mysql", "postgres", "sql", "aws", "docker", "kotlin", "frontend",
  "backend", "fullstack", "devops", "angular", "vue", "next", "laravel", "django",
];

const SENIORITY_KEYWORDS = [
  "junior",
  "pleno",
  "senior",
  "especialista",
  "principal",
  "staff",
  "lead",
  "mid",
  "intern",
  "internship",
  "trainee",
  "estagio",
];

function normalizeTag(tag: string) {
  return tag
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function hasAnyKeyword(tag: string, keywords: string[]) {
  return keywords.some((keyword) => tag.includes(keyword));
}

export function groupTagOptionsByCategory(
  tagOptions: FilterOption[],
): OpportunityTagCategoryOptions {
  const grouped: OpportunityTagCategoryOptions = {
    workModel: [],
    stack: [],
    seniority: [],
    other: [],
  };

  for (const option of tagOptions) {
    const normalized = normalizeTag(option.value);

    if (hasAnyKeyword(normalized, WORK_MODEL_KEYWORDS)) {
      grouped.workModel.push(option);
      continue;
    }
    if (hasAnyKeyword(normalized, SENIORITY_KEYWORDS)) {
      grouped.seniority.push(option);
      continue;
    }
    if (hasAnyKeyword(normalized, STACK_KEYWORDS)) {
      grouped.stack.push(option);
      continue;
    }

    grouped.other.push(option);
  }

  return grouped;
}
