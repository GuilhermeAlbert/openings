"use client";

import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils/tailwind";
import type { LanguageSwitcherProps } from "../types";
import {
  languageSwitcherContentStyles,
  languageSwitcherTriggerStyles,
  languageSwitcherWrapperStyles,
} from "./styles";

export function LanguageSwitcher({
  className,
  locale,
  locales,
  placeholder = "Language",
  ariaLabel = "Select language",
  changedTemplate = "Language set to {language}.",
  announceChange = true,
  onLocaleChange,
}: LanguageSwitcherProps) {
  const handleValueChange = (value: string) => {
    const nextLocale = locales.find((entry) => entry.code === value);
    if (!nextLocale) {
      return;
    }

    onLocaleChange(nextLocale.code);

    if (announceChange) {
      toast.success(nextLocale.nativeLabel, {
        description: changedTemplate.replace(
          "{language}",
          nextLocale.nativeLabel,
        ),
        duration: 1600,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className={cn(languageSwitcherWrapperStyles(), className)}
    >
      <Select value={locale} onValueChange={handleValueChange}>
        <SelectTrigger
          aria-label={ariaLabel}
          className={languageSwitcherTriggerStyles()}
        >
          <span className="inline-flex min-w-0 items-center gap-2">
            <Languages size={16} className="text-muted-foreground" />
            <SelectValue placeholder={placeholder} />
          </span>
        </SelectTrigger>
        <SelectContent className={languageSwitcherContentStyles()} align="end">
          {locales.map((entry) => (
            <SelectItem key={entry.code} value={entry.code}>
              <span className="inline-flex items-center gap-2">
                <span className="font-medium tracking-[0.02em] uppercase text-xs text-muted-foreground">
                  {entry.code}
                </span>
                <span>{entry.nativeLabel}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
}
