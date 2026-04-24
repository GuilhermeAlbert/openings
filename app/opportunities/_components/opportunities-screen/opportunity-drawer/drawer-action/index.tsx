import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind";

interface DrawerActionProps {
  openOriginalLabel: string;
  url: string;
  className?: string;
}

export function DrawerAction({
  openOriginalLabel,
  url,
  className,
}: DrawerActionProps) {
  return (
    <div className={cn("pt-1", className)}>
      <Button
        type="button"
        className="w-full"
        onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
      >
        <ExternalLink className="size-4" />
        {openOriginalLabel}
      </Button>
    </div>
  );
}
