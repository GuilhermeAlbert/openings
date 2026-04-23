import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DrawerHeaderProps {
  title: string;
  detailsLabel: string;
  closeLabel: string;
  onClose: () => void;
}

export function DrawerHeader({
  title,
  detailsLabel,
  closeLabel,
  onClose,
}: DrawerHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border/70 px-4 py-3">
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {detailsLabel}
        </p>
        <h2 className="text-base font-semibold tracking-[-0.02em] text-foreground">{title}</h2>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 shrink-0"
        onClick={onClose}
        aria-label={closeLabel}
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}
