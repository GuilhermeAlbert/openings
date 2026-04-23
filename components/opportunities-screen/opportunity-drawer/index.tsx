"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Building2,
  CalendarDays,
  ExternalLink,
  Landmark,
  MapPin,
  UserRound,
  Wallet,
  X,
} from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind";
import { chipStyles, panelStyles } from "@/components/opportunities-screen/styles";
import type {
  OpportunityDrawerProps,
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
  periodLabels: {
    month: string;
    year: string;
    hour: string;
  },
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
    return `${formatter.format(salary.min)} - ${formatter.format(salary.max)} / ${period}`;
  }

  if (salary.min) {
    return `${formatter.format(salary.min)}+ / ${period}`;
  }

  return `${formatter.format(salary.max ?? 0)} / ${period}`;
}

export function OpportunityDrawer({
  item,
  open,
  onClose,
  onCommunitySelect,
  onAuthorSelect,
}: OpportunityDrawerProps) {
  const { locale, messages } = useI18n();
  const cardMessages = messages.opportunities.card;
  const dateFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    [locale],
  );

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  if (!open || !item) {
    return null;
  }

  const salaryLabel = formatSalary(item.salary, locale, {
    month: cardMessages.salaryPeriodMonth,
    year: cardMessages.salaryPeriodYear,
    hour: cardMessages.salaryPeriodHour,
  });

  const drawerContent = (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3 border-b border-border/70 px-4 py-3">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {cardMessages.detailsLabel}
          </p>
          <h2 className="text-base font-semibold tracking-[-0.02em] text-foreground">
            {item.title}
          </h2>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8 shrink-0"
          onClick={onClose}
          aria-label={cardMessages.closeDetails}
        >
          <X className="size-4" />
        </Button>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4">
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span key={tag} className={chipStyles({ active: false })}>
              {tag}
            </span>
          ))}
        </div>

        <div className="prose-opportunity">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="mb-2 mt-4 text-base font-semibold text-foreground first:mt-0">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="mb-2 mt-4 text-sm font-semibold text-foreground first:mt-0">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-1.5 mt-3 text-sm font-medium text-foreground first:mt-0">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-3 text-sm leading-6 text-muted-foreground last:mb-0">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="mb-3 space-y-1 pl-4 last:mb-0">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-3 list-decimal space-y-1 pl-4 last:mb-0">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-sm leading-6 text-muted-foreground marker:text-muted-foreground/60">
                  {children}
                </li>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-2 hover:text-muted-foreground"
                >
                  {children}
                </a>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="italic text-muted-foreground">{children}</em>
              ),
              code: ({ children, className }) => {
                const isBlock = className?.includes("language-");
                if (isBlock) {
                  return (
                    <code className="block w-full overflow-x-auto rounded-md border border-border/60 bg-muted/40 px-3 py-2.5 font-mono text-xs text-foreground">
                      {children}
                    </code>
                  );
                }
                return (
                  <code className="rounded border border-border/50 bg-muted/50 px-1 py-0.5 font-mono text-xs text-foreground">
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre className="mb-3 last:mb-0">{children}</pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="mb-3 border-l-2 border-border/60 pl-3 last:mb-0">
                  {children}
                </blockquote>
              ),
              hr: () => <hr className="my-3 border-border/50" />,
            }}
          >
            {item.excerpt}
          </ReactMarkdown>
        </div>

        <div className="space-y-2 rounded-lg border border-border/70 bg-background/70 p-3 text-sm">
          <p className="flex items-center gap-2 text-foreground/95">
            <CalendarDays className="size-4 text-muted-foreground" />
            {formatTemplate(cardMessages.postedAt, {
              date: dateFormatter.format(new Date(item.createdAt)),
            })}
          </p>
          <p className="flex items-center gap-2 text-foreground/95">
            <CalendarDays className="size-4 text-muted-foreground" />
            {formatTemplate(cardMessages.updatedAt, {
              date: dateFormatter.format(new Date(item.updatedAt)),
            })}
          </p>
          <p className="flex items-center gap-2 text-foreground/95">
            <Landmark className="size-4 text-muted-foreground" />
            {item.community.repository}
          </p>
          <p className="flex items-center gap-2 text-foreground/95">
            <MapPin className="size-4 text-muted-foreground" />
            {item.country}
          </p>
          {item.companyName ? (
            <p className="flex items-center gap-2 text-foreground/95">
              <Building2 className="size-4 text-muted-foreground" />
              {item.companyName}
            </p>
          ) : null}
          {salaryLabel ? (
            <p className="flex items-center gap-2 text-foreground/95">
              <Wallet className="size-4 text-muted-foreground" />
              {salaryLabel}
            </p>
          ) : null}
        </div>

        <div className="space-y-2 rounded-lg border border-border/70 bg-background/70 p-3">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-md p-1 text-left transition-colors hover:bg-muted/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => onCommunitySelect(item.repository)}
          >
            <Image
              src={item.community.avatarUrl}
              alt={formatTemplate(cardMessages.communityAvatarAlt, {
                name: item.community.name,
              })}
              width={30}
              height={30}
              className="size-7 rounded-full border border-border/70 bg-muted object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-foreground">{item.community.name}</p>
              <p className="truncate text-xs text-muted-foreground">{item.community.repository}</p>
            </div>
          </button>

          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-md p-1 text-left transition-colors hover:bg-muted/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => onAuthorSelect(item.author.handle)}
          >
            <Image
              src={item.author.avatarUrl}
              alt={formatTemplate(cardMessages.authorAvatarAlt, {
                name: item.author.name,
              })}
              width={30}
              height={30}
              className="size-7 rounded-full border border-border/70 bg-muted object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-foreground">{item.author.name}</p>
              <p className="truncate text-xs text-muted-foreground">@{item.author.handle}</p>
            </div>
            <UserRound className="size-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="border-t border-border/70 px-4 py-3">
        <Button
          type="button"
          className="w-full"
          onClick={() => window.open(item.url, "_blank", "noopener,noreferrer")}
        >
          <ExternalLink className="size-4" />
          {cardMessages.openOriginal}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <aside
        className={cn(
          panelStyles(),
          "hidden overflow-hidden p-0 lg:sticky lg:top-20 lg:block lg:max-h-[calc(100dvh-6rem)]",
        )}
      >
        {drawerContent}
      </aside>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label={cardMessages.closeDetails}
              className="absolute inset-0 bg-black/45"
              onClick={onClose}
            />
            <motion.div
              className="absolute inset-x-0 bottom-0 max-h-[86dvh] overflow-hidden rounded-t-2xl border border-border/70 bg-card"
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
            >
              {drawerContent}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
