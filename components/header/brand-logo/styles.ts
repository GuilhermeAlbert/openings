import { cva } from "class-variance-authority";

export const brandLogoRootStyles = cva(
  "inline-flex items-center gap-3 rounded-lg px-1 py-1 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

export const brandLogoMarkStyles = cva(
  "relative size-9 overflow-hidden rounded-[10px] border border-border/70 bg-card shadow-[0_1px_2px_rgb(0_0_0/0.06)]",
);

export const brandLogoTextStyles = cva("hidden flex-col leading-none sm:flex");

export const brandLogoTitleStyles = cva(
  "text-sm font-semibold tracking-[-0.02em] text-foreground",
);

export const brandLogoSubtitleStyles = cva("text-xs text-muted-foreground");
