import { DocumentPage } from "@/app/_components/document-page";
import { readProjectDocumentBundle } from "@/lib/content/markdown";

export default async function PrivacyPolicyPage() {
  const document = await readProjectDocumentBundle("privacy");

  return (
    <DocumentPage
      documentKey="privacy"
      markdownByLocale={document.markdownByLocale}
      sourceFileByLocale={document.sourceFileByLocale}
    />
  );
}
