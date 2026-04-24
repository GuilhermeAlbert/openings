"use client";

import Link from "next/link";
import { MapPin, Rows3, User } from "lucide-react";
import { buildUserPath } from "@/lib/opportunities/routing";
import { formatTemplate } from "@/app/opportunities/_components/opportunities-screen/shared/format-template";
import type { UserSummary } from "@/lib/opportunities/users";

interface UserCardProps {
  item: UserSummary;
  locale: string;
  listMessages: {
    handleLabel: string;
    countryLabel: string;
    regionLabel: string;
    opportunitiesCount: string;
    openUser: string;
  };
}

export function UserCard({ item, locale, listMessages }: UserCardProps) {
  const avatarFallback = item.name.trim().charAt(0).toUpperCase() || "@";

  return (
    <li>
      <Link href={buildUserPath(item.handle)} className="group block rounded-2xl border border-border/60 bg-card/70 p-4 transition hover:border-primary/40 hover:bg-card">
        <div className="flex items-center gap-3">
          {item.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.avatarUrl} alt={item.name} className="size-10 rounded-full border border-border/70 bg-muted object-cover" />
          ) : (
            <span className="inline-flex size-10 items-center justify-center rounded-full border border-border/70 bg-muted text-sm font-semibold text-muted-foreground">{avatarFallback}</span>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{item.name}</p>
            <p className="truncate text-xs text-muted-foreground">@{item.handle}</p>
          </div>
        </div>
        <dl className="mt-4 grid gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2"><User className="size-3.5" /><dt>{listMessages.handleLabel}</dt><dd className="text-foreground/80">@{item.handle}</dd></div>
          <div className="flex items-center gap-2"><MapPin className="size-3.5" /><dt>{listMessages.countryLabel}</dt><dd className="text-foreground/80">{item.country}</dd></div>
          <div className="flex items-center gap-2"><Rows3 className="size-3.5" /><dt>{listMessages.regionLabel}</dt><dd className="text-foreground/80">{item.region}</dd></div>
        </dl>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm font-medium text-primary">{formatTemplate(listMessages.opportunitiesCount, { count: item.opportunitiesCount.toLocaleString(locale) })}</p>
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground transition group-hover:text-primary">{listMessages.openUser}</span>
        </div>
      </Link>
    </li>
  );
}
