import type { Metadata } from "next";
import { OpportunitiesPage } from "@/app/opportunities/_components/opportunities-page";
import { createPageMetadata } from "@/lib/metadata/site-metadata";
import { LocaleCode } from "@/lib/constants/locales";
import { localizedPublicAlternates } from "@/lib/metadata/localized-alternates";

const opportunitiesMetadata = createPageMetadata({
  title: "Search tech jobs shared by GitHub communities",
  description:
    "Search tech jobs by role, stack, seniority, location, or work model, then verify each opening at its original public source.",
  path: "/opportunities",
});

export const metadata: Metadata = {
  ...opportunitiesMetadata,
  alternates: localizedPublicAlternates(LocaleCode.English, "/opportunities"),
};

export default function Opportunities(): React.ReactNode {
  return <OpportunitiesPage />;
}
