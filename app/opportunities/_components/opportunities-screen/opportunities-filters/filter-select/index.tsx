import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { compactSelectTriggerStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import type { FilterOption } from "@/app/opportunities/_components/opportunities-screen/types";

interface FilterSelectProps {
  value: string;
  placeholder: string;
  allLabel?: string;
  options: FilterOption[];
  onValueChange: (value: string) => void;
}

export function FilterSelect({
  value,
  placeholder,
  allLabel,
  options,
  onValueChange,
}: FilterSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={compactSelectTriggerStyles()}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {allLabel ? <SelectItem value="all">{allLabel}</SelectItem> : null}
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label} ({option.count})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
