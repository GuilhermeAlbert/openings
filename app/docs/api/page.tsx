import { DocumentPage } from "@/app/_components/document-page";
import { readProjectDocumentBundle } from "@/lib/content/markdown";

export default async function ApiDocsPage() {
  const document = await readProjectDocumentBundle("api-reference");

  return (
    <DocumentPage
      documentKey="apiReference"
      markdownByLocale={document.markdownByLocale}
      sourceFileByLocale={document.sourceFileByLocale}
    />
  );
}
