import type { ReactNode } from "react";
import { cn } from "@/lib/utils/tailwind";

interface FilterSectionProps {
  label: string;
  className?: string;
  children: ReactNode;
}

export function FilterSection({ label, className, children }: FilterSectionProps) {
  return (
    <section className={cn("space-y-2.5 rounded-lg bg-muted/20 p-3", className)}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/70">
        {label}
      </p>
      {children}
    </section>
  );
}
