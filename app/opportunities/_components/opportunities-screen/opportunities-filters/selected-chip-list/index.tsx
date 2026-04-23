import { X } from "lucide-react";
import { chipStyles } from "@/app/opportunities/_components/opportunities-screen/styles";

interface SelectedChipListProps {
  items: Array<{ key: string; label: string }>;
  emptyLabel: string;
  onRemove: (value: string) => void;
}

export function SelectedChipList({
  items,
  emptyLabel,
  onRemove,
}: SelectedChipListProps) {
  return (
    <div className="flex min-h-5 flex-wrap gap-1.5 pt-0.5">
      {items.length === 0 ? (
        <span className="text-xs text-muted-foreground/55">{emptyLabel}</span>
      ) : (
        items.map((item) => (
          <button
            key={item.key}
            type="button"
            className={chipStyles({ active: true })}
            onClick={() => onRemove(item.key)}
          >
            {item.label}
            <X className="size-3" />
          </button>
        ))
      )}
    </div>
  );
}
