import { DocumentPage } from "@/app/_components/document-page";
import { readProjectDocumentBundle } from "@/lib/content/markdown";

export default async function ContributingPage() {
  const document = await readProjectDocumentBundle("contributing");

  return (
    <DocumentPage
      documentKey="contributing"
      markdownByLocale={document.markdownByLocale}
      sourceFileByLocale={document.sourceFileByLocale}
    />
  );
}
