"use client";

import * as React from "react";
import { useI18n } from "@/components/providers/i18n-provider";
import { formatSalary } from "@/app/opportunities/_components/opportunities-screen/shared/format-salary";
import { cn } from "@/lib/utils/tailwind";
import { opportunityCardStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import type { OpportunityCardProps } from "@/app/opportunities/_components/opportunities-screen/types";
import { OpportunityCardFooter } from "./opportunity-card-footer";
import { OpportunityCardHeader } from "./opportunity-card-header";
import { OpportunityCardMeta } from "./opportunity-card-meta";
import { OpportunityCardTags } from "./opportunity-card-tags";

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
    () => new Intl.DateTimeFormat(locale, { dateStyle: "medium" }),
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
        <OpportunityCardHeader title={item.title} excerpt={item.excerpt} />
        <OpportunityCardTags tags={item.tags} />
        <OpportunityCardMeta
          item={item}
          salaryLabel={salaryLabel}
          dateLabel={dateFormatter.format(new Date(item.createdAt))}
        />
        <OpportunityCardFooter
          item={item}
          communityAvatarAltTemplate={cardMessages.communityAvatarAlt}
          authorAvatarAltTemplate={cardMessages.authorAvatarAlt}
          onCommunitySelect={onCommunitySelect}
          onAuthorSelect={onAuthorSelect}
        />
      </div>
    </article>
  );
}
