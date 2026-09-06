import type { Metadata } from "next";
import { Suspense } from "react";
import { ComparisonScreen } from "./_components/comparison-screen";
import { createPageMetadata } from "@/lib/metadata/site-metadata";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Compare jobs",
    description: "Compare up to three technology jobs side by side.",
    path: "/compare",
  }),
  robots: { index: false, follow: true },
};

export default function ComparePage(): React.ReactNode {
  return <Suspense><ComparisonScreen /></Suspense>;
}
