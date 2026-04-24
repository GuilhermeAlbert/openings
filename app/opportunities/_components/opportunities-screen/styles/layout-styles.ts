import { cva } from "class-variance-authority";

export const opportunitiesScreenStyles = cva(
  "mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 pb-16 pt-10 sm:px-6 lg:px-8",
);

export const opportunitiesBodyStyles = cva(
  "grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-5",
);

export const opportunitiesSidebarStyles = cva(
  "grid grid-cols-1 gap-3 lg:sticky lg:top-20 lg:self-start",
);

export const opportunitiesMainStyles = cva("flex min-w-0 flex-col gap-4");

export const opportunitiesSnapshotStatusStyles = cva(
  "rounded-2xl border border-border/60 bg-card/80 px-4 py-3 shadow-[0_2px_14px_-8px_rgb(0_0_0/0.25)] backdrop-blur sm:px-5 sm:py-4",
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
