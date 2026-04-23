"use client";

import * as React from "react";
import Image from "next/image";
import {
  Building2,
  CalendarDays,
  Landmark,
  MapPin,
  Wallet,
} from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { cn } from "@/lib/utils/tailwind";
import {
  cardPersonButtonStyles,
  chipStyles,
  metadataRowStyles,
  opportunityCardStyles,
} from "@/components/opportunities-screen/styles";
import type {
  OpportunityCardProps,
  OpportunitySalary,
} from "@/components/opportunities-screen/types";

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

function formatSalary(
  salary: OpportunitySalary | undefined,
  locale: string,
  periodLabels: { month: string; year: string; hour: string },
) {
  if (!salary || (!salary.min && !salary.max)) {
    return "";
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: salary.currency,
    maximumFractionDigits: 0,
  });
  const period = periodLabels[salary.period];

  if (salary.min && salary.max) {
    return `${formatter.format(salary.min)} – ${formatter.format(salary.max)} / ${period}`;
  }

  if (salary.min) {
    return `${formatter.format(salary.min)}+ / ${period}`;
  }

  return `${formatter.format(salary.max ?? 0)} / ${period}`;
}

export function OpportunityCard({
  item,
  viewMode,
  isSelected,
  onSelectOpportunity,
  onCommunitySelect,
  onAuthorSelect,
}: OpportunityCardProps) {
  const { locale, messages } = useI18n();
  const cardMessages = messages.opportunities.card;
  const dateFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
      }),
    [locale],
  );

  const salaryLabel = formatSalary(item.salary, locale, {
    month: cardMessages.salaryPeriodMonth,
    year: cardMessages.salaryPeriodYear,
    hour: cardMessages.salaryPeriodHour,
  });

  return (
    <article
      className={cn(opportunityCardStyles({ viewMode, selected: isSelected }))}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={() => onSelectOpportunity(item)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelectOpportunity(item);
        }
      }}
    >
      <div className="flex h-full flex-col gap-3">
        {/* Title + excerpt */}
        <div className="space-y-1.5">
          <p className="text-base font-semibold tracking-[-0.01em] text-foreground">
            {item.title}
          </p>
          <p className="line-clamp-2 max-w-[62ch] text-sm leading-6 text-muted-foreground">
            {item.excerpt}
          </p>
        </div>

        {/* Tags */}
        {item.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {item.tags.map((tag) => (
              <span key={tag} className={chipStyles({ active: false })}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {/* Metadata */}
        <div className={metadataRowStyles()}>
          {salaryLabel ? (
            <span className="inline-flex items-center gap-1">
              <Wallet className="size-3.5" />
              {salaryLabel}
            </span>
          ) : null}
          {item.companyName ? (
            <span className="inline-flex items-center gap-1">
              <Building2 className="size-3.5" />
              {item.companyName}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1">
            <Landmark className="size-3.5" />
            {item.community.repository}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" />
            {item.country}
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="size-3.5" />
            {dateFormatter.format(new Date(item.createdAt))}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/50 pt-2.5">
          <button
            type="button"
            className={cardPersonButtonStyles()}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              onCommunitySelect(item.repository);
            }}
          >
            <Image
              src={item.community.avatarUrl}
              alt={formatTemplate(cardMessages.communityAvatarAlt, {
                name: item.community.name,
              })}
              width={24}
              height={24}
              className="size-6 rounded-full border border-border/60 bg-muted object-cover"
            />
            <div>
              <p className="text-xs font-medium leading-none text-foreground">
                {item.community.name}
              </p>
              <p className="mt-0.5 text-[11px] leading-none text-muted-foreground">
                {item.repository}
              </p>
            </div>
          </button>

          <button
            type="button"
            className={cardPersonButtonStyles()}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              onAuthorSelect(item.author.handle);
            }}
          >
            <div className="text-right">
              <p className="text-xs font-medium leading-none text-foreground">
                {item.author.name}
              </p>
              <p className="mt-0.5 text-[11px] leading-none text-muted-foreground">
                @{item.author.handle}
              </p>
            </div>
            <Image
              src={item.author.avatarUrl}
              alt={formatTemplate(cardMessages.authorAvatarAlt, {
                name: item.author.name,
              })}
              width={24}
              height={24}
              className="size-6 rounded-full border border-border/60 bg-muted object-cover"
            />
          </button>
        </div>
      </div>
    </article>
  );
}
