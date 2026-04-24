"use client";

import Link from "next/link";
import { MapPin, Rows3, Building2 } from "lucide-react";
import { buildCommunityPath } from "@/lib/opportunities/routing";
import { formatTemplate } from "@/app/opportunities/_components/opportunities-screen/shared/format-template";
import type { CommunitySummary } from "@/lib/opportunities/communities";

interface CommunityCardProps {
  item: CommunitySummary;
  locale: string;
  listMessages: {
    repositoryLabel: string;
    countryLabel: string;
    regionLabel: string;
    opportunitiesCount: string;
    openCommunity: string;
  };
}

export function CommunityCard({ item, locale, listMessages }: CommunityCardProps) {
  const communityInitial = item.name.trim().charAt(0).toUpperCase() || "#";

  return (
    <li>
      <Link href={buildCommunityPath(item.repository)} className="group block rounded-2xl border border-border/60 bg-card/70 p-4 transition hover:border-primary/40 hover:bg-card">
        <div className="flex items-center gap-3">
          {item.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.avatarUrl} alt={item.name} className="size-10 rounded-full border border-border/70 bg-muted object-cover" />
          ) : (
            <span className="inline-flex size-10 items-center justify-center rounded-full border border-border/70 bg-muted text-sm font-semibold text-muted-foreground">
              {communityInitial}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{item.name}</p>
            <p className="truncate text-xs text-muted-foreground">{item.repository}</p>
          </div>
        </div>
        <dl className="mt-4 grid gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2"><Building2 className="size-3.5" /><dt>{listMessages.repositoryLabel}</dt><dd className="truncate text-foreground/80">{item.repository}</dd></div>
          <div className="flex items-center gap-2"><MapPin className="size-3.5" /><dt>{listMessages.countryLabel}</dt><dd className="text-foreground/80">{item.country}</dd></div>
          <div className="flex items-center gap-2"><Rows3 className="size-3.5" /><dt>{listMessages.regionLabel}</dt><dd className="text-foreground/80">{item.region}</dd></div>
        </dl>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm font-medium text-primary">{formatTemplate(listMessages.opportunitiesCount, { count: item.opportunitiesCount.toLocaleString(locale) })}</p>
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground transition group-hover:text-primary">{listMessages.openCommunity}</span>
        </div>
      </Link>
    </li>
  );
}
