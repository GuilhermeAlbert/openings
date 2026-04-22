import { cva } from "class-variance-authority";

export const languageSwitcherWrapperStyles = cva("w-[152px] sm:w-[176px]");

export const languageSwitcherTriggerStyles = cva(
  "h-9 rounded-lg border-border/70 bg-card text-sm shadow-[0_1px_2px_rgb(0_0_0/0.06)] hover:bg-muted/55",
);

export const languageSwitcherContentStyles = cva(
  "rounded-lg border-border/70 bg-card",
);
