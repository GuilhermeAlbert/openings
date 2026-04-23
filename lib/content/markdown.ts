import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  AVAILABLE_LOCALES,
  type LocaleCode,
} from "@/lib/constants/locales";

export type ProjectDocumentKey =
  | "overview"
  | "api-reference"
  | "contributing"
  | "privacy"
  | "terms";

interface ProjectDocumentPathConfig {
  defaultFileName: string;
  localizedDirectory?: string;
}

const PROJECT_DOCUMENT_PATH: Record<ProjectDocumentKey, ProjectDocumentPathConfig> = {
  overview: {
    defaultFileName: "OVERVIEW.md",
    localizedDirectory: "docs/overview",
  },
  "api-reference": {
    defaultFileName: "API_REFERENCE.md",
    localizedDirectory: "docs/api-reference",
  },
  contributing: {
    defaultFileName: "CONTRIBUTING.md",
    localizedDirectory: "docs/contributing",
  },
  privacy: {
    defaultFileName: "PRIVACY.md",
    localizedDirectory: "docs/privacy",
  },
  terms: {
    defaultFileName: "TERMS.md",
    localizedDirectory: "docs/terms",
  },
};

export interface ProjectDocumentContent {
  fileName: string;
  markdown: string;
}

export interface ProjectDocumentBundle {
  markdownByLocale: Record<LocaleCode, string>;
  sourceFileByLocale: Record<LocaleCode, string>;
}

function toLocalizedFileName(fileName: string, locale: LocaleCode) {
  if (locale === "en") {
    return fileName;
  }

  const extension = path.extname(fileName);
  const baseName = fileName.slice(0, -extension.length);
  return `${baseName}.${locale}${extension}`;
}

function toPosixPath(value: string) {
  return value.replaceAll(path.sep, "/");
}

function resolveDocumentPath(
  key: ProjectDocumentKey,
  locale: LocaleCode,
): { absolutePath: string; displayPath: string } {
  const config = PROJECT_DOCUMENT_PATH[key];
  const defaultFileName = config.defaultFileName;

  if (locale === "en") {
    return {
      absolutePath: path.join(process.cwd(), defaultFileName),
      displayPath: defaultFileName,
    };
  }

  const localizedFileName = toLocalizedFileName(defaultFileName, locale);
  const localizedDirectory = config.localizedDirectory;

  if (!localizedDirectory) {
    return {
      absolutePath: path.join(process.cwd(), localizedFileName),
      displayPath: localizedFileName,
    };
  }

  const relativePath = path.join(localizedDirectory, localizedFileName);
  return {
    absolutePath: path.join(process.cwd(), relativePath),
    displayPath: toPosixPath(relativePath),
  };
}

export async function readProjectDocument(
  key: ProjectDocumentKey,
): Promise<ProjectDocumentContent> {
  const fileName = PROJECT_DOCUMENT_PATH[key].defaultFileName;
  const filePath = path.join(process.cwd(), fileName);

  try {
    const markdown = await readFile(filePath, "utf-8");
    return { fileName, markdown };
  } catch {
    return {
      fileName,
      markdown: `# Missing file\n\nCould not read \`${fileName}\` from the project root.`,
    };
  }
}

export async function readProjectDocumentBundle(
  key: ProjectDocumentKey,
): Promise<ProjectDocumentBundle> {
  const fileName = PROJECT_DOCUMENT_PATH[key].defaultFileName;
  const baseFilePath = path.join(process.cwd(), fileName);
  let baseMarkdown = "";

  try {
    baseMarkdown = await readFile(baseFilePath, "utf-8");
  } catch {
    baseMarkdown = `# Missing file\n\nCould not read \`${fileName}\` from the project root.`;
  }

  const entries = await Promise.all(
    AVAILABLE_LOCALES.map(async ({ code }) => {
      const localizedTarget = resolveDocumentPath(key, code);

      try {
        const localizedMarkdown = await readFile(localizedTarget.absolutePath, "utf-8");
        return [
          code,
          {
            markdown: localizedMarkdown,
            fileName: localizedTarget.displayPath,
          },
        ] as const;
      } catch {
        return [
          code,
          {
            markdown: baseMarkdown,
            fileName,
          },
        ] as const;
      }
    }),
  );

  const markdownByLocale = Object.fromEntries(
    entries.map(([locale, payload]) => [locale, payload.markdown]),
  ) as Record<LocaleCode, string>;

  const sourceFileByLocale = Object.fromEntries(
    entries.map(([locale, payload]) => [locale, payload.fileName]),
  ) as Record<LocaleCode, string>;

  return { markdownByLocale, sourceFileByLocale };
}
