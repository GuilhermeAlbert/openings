import { DocumentPage } from "@/components/document-page";
import { readProjectDocumentBundle } from "@/lib/content/markdown";

export default async function OverviewPage() {
  const document = await readProjectDocumentBundle("overview");

  return (
    <DocumentPage
      documentKey="overview"
      markdownByLocale={document.markdownByLocale}
      sourceFileByLocale={document.sourceFileByLocale}
    />
  );
}
