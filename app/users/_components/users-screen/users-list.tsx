"use client";

import { formatTemplate } from "@/app/opportunities/_components/opportunities-screen/shared/format-template";
import type { UserSummary } from "@/lib/opportunities/users";
import { UserCard } from "./user-card";

interface UsersListProps {
  locale: string;
  listMessages: {
    summary: string;
    emptyTitle: string;
    emptyDescription: string;
    handleLabel: string;
    countryLabel: string;
    regionLabel: string;
    opportunitiesCount: string;
    openUser: string;
  };
  items: UserSummary[];
}

export function UsersList({ locale, listMessages, items }: UsersListProps) {
  return (
    <section className="rounded-2xl border border-border/60 bg-card/40 p-4">
      <p className="text-sm text-muted-foreground">
        {formatTemplate(listMessages.summary, { count: items.length.toLocaleString(locale) })}
      </p>
      {items.length > 0 ? (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => <UserCard key={item.handle} item={item} locale={locale} listMessages={listMessages} />)}
        </ul>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-border/70 p-6 text-center">
          <p className="text-sm font-semibold text-foreground">{listMessages.emptyTitle}</p>
          <p className="mt-1 text-sm text-muted-foreground">{listMessages.emptyDescription}</p>
        </div>
      )}
    </section>
  );
}
