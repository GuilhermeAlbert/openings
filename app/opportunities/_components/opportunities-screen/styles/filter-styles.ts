import { cva } from "class-variance-authority";

export const controlBarStyles = cva(
  "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/50 bg-muted/20 px-4 py-2.5",
);

export const filterGridStyles = cva("grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3");

export const filterFieldStyles = cva("space-y-1.5");

export const filterLabelStyles = cva(
  "block text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/70",
);

export const textInputStyles = cva(
  "h-9 w-full rounded-md border border-input/75 bg-background/60 px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
);

export const compactSelectTriggerStyles = cva(
  "h-9 min-w-0 border-input/75 bg-background/60 text-sm [&>[data-slot='select-value']]:min-w-0 [&>[data-slot='select-value']]:truncate [&>[data-slot='select-value']]:whitespace-nowrap [&>[data-slot='select-value']]:text-left",
);

export const toggleGroupStyles = cva(
  "inline-flex items-center rounded-lg border border-border/60 bg-muted/20 p-0.5",
);

export const toggleItemStyles = cva(
  "inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
  {
    variants: {
      active: {
        true: "bg-background text-foreground shadow-xs",
        false: "text-muted-foreground hover:text-foreground",
      },
    },
    defaultVariants: { active: false },
  },
);

export const chipStyles = cva(
  "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
  {
    variants: {
      active: {
        true: "border-border/80 bg-muted/80 text-foreground",
        false: "border-border/50 bg-transparent text-muted-foreground hover:border-border/80 hover:text-foreground",
      },
    },
    defaultVariants: { active: false },
  },
);
