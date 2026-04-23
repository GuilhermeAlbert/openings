import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DrawerActionProps {
  openOriginalLabel: string;
  url: string;
}

export function DrawerAction({ openOriginalLabel, url }: DrawerActionProps) {
  return (
    <div className="border-t border-border/70 px-4 py-3">
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
