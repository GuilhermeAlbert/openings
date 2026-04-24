import { cva } from "class-variance-authority";

export const brandLogoRootStyles = cva(
  "inline-flex items-center rounded-lg px-1 py-1 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted",
);

export const brandLogoMarkStyles = cva(
  "relative h-10 w-[190px] min-w-[190px] overflow-hidden",
);
