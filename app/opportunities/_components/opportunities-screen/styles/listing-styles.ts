import { cva } from "class-variance-authority";

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
      viewMode: { list: "", grid: "" },
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
