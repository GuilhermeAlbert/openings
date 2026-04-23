import { cva } from "class-variance-authority";

export const headerNavStyles = cva(
  "hidden items-center gap-1.5 md:flex",
);

export const headerNavLinkStyles = cva(
  "rounded-md px-2.5 py-1.5 text-sm font-medium tracking-[-0.01em] text-muted-foreground transition-colors hover:bg-muted/55 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      active: {
        true: "bg-muted/70 text-foreground",
        false: "",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);
