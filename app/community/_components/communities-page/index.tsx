"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CommunitiesScreen } from "@/app/community/_components/communities-screen";
import type { CommunitySummary } from "@/lib/opportunities/communities";

interface CommunitiesPageProps {
  communities: CommunitySummary[];
}

export function CommunitiesPage({ communities }: CommunitiesPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <CommunitiesScreen communities={communities} />
      </main>
      <Footer />
    </div>
  );
}
