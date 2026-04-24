"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UsersScreen } from "@/app/users/_components/users-screen";
import type { UserSummary } from "@/lib/opportunities/users";

interface UsersPageProps {
  users: UserSummary[];
}

export function UsersPage({ users }: UsersPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <UsersScreen users={users} />
      </main>

      <Footer />
    </div>
  );
}
