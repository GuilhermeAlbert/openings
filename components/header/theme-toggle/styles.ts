import { cva } from "class-variance-authority";

export const themeToggleWrapperStyles = cva("flex items-center");

export const themeToggleButtonStyles = cva(
  "size-9 rounded-lg border-border/70 bg-card text-foreground/80 shadow-[0_1px_2px_rgb(0_0_0/0.06)] hover:bg-muted/70 hover:text-foreground",
);
