import { DocumentPage } from "@/app/_components/document-page";
import { readProjectDocumentBundle } from "@/lib/content/markdown";

export default async function TermsOfServicePage() {
  const document = await readProjectDocumentBundle("terms");

  return (
    <DocumentPage
      documentKey="terms"
      markdownByLocale={document.markdownByLocale}
      sourceFileByLocale={document.sourceFileByLocale}
    />
  );
}
