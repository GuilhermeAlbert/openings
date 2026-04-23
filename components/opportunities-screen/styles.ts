import { cva } from "class-variance-authority";

export const opportunitiesScreenStyles = cva(
  "mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 pb-16 pt-10 sm:px-6 lg:px-8",
);

export const opportunitiesHeaderStyles = cva("space-y-2.5");

export const opportunitiesKickerStyles = cva(
  "text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground",
);

export const opportunitiesTitleStyles = cva(
  "text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl",
);

export const opportunitiesDescriptionStyles = cva(
  "max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base",
);

export const panelStyles = cva(
  "rounded-2xl border border-border/60 bg-card/80 p-4 shadow-[0_2px_16px_-6px_rgb(0_0_0/0.10)] backdrop-blur sm:p-5",
);

export const controlBarStyles = cva(
  "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/50 bg-muted/20 px-4 py-2.5",
);

export const filterGridStyles = cva(
  "grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3",
);

export const filterFieldStyles = cva("space-y-1.5");

export const filterLabelStyles = cva(
  "block text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/70",
);

export const textInputStyles = cva(
  "h-9 w-full rounded-md border border-input/75 bg-background/60 px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
);

export const compactSelectTriggerStyles = cva(
  "h-9 border-input/75 bg-background/60 text-sm",
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
    defaultVariants: {
      active: false,
    },
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
    defaultVariants: {
      active: false,
    },
  },
);

export const resultsGridStyles = cva("grid gap-2.5", {
  variants: {
    viewMode: {
      list: "grid-cols-1",
      grid: "grid-cols-1 md:grid-cols-2 2xl:grid-cols-3",
    },
  },
  defaultVariants: {
    viewMode: "list",
  },
});

export const opportunityCardStyles = cva(
  "group relative h-full rounded-xl border border-border/60 bg-card/70 p-4 text-left transition-all duration-150 hover:border-border/90 hover:bg-card/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
  {
    variants: {
      viewMode: {
        list: "",
        grid: "",
      },
      selected: {
        true: "border-primary/30 bg-primary/5 hover:border-primary/40",
        false: "",
      },
    },
    defaultVariants: {
      viewMode: "list",
      selected: false,
    },
  },
);

export const metadataRowStyles = cva(
  "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground",
);

export const cardPersonButtonStyles = cva(
  "-mx-1.5 -my-1 flex items-center gap-2.5 rounded-md px-1.5 py-1 transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
);

export const splitViewStyles = cva("grid gap-4", {
  variants: {
    open: {
      true: "lg:grid-cols-[minmax(0,1fr)_minmax(360px,420px)]",
      false: "grid-cols-1",
    },
  },
  defaultVariants: {
    open: false,
  },
});
