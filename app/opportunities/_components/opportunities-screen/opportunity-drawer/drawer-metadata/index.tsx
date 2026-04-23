import { Building2, CalendarDays, Landmark, MapPin, Wallet } from "lucide-react";

interface DrawerMetadataProps {
  postedAt: string;
  updatedAt: string;
  repository: string;
  country: string;
  companyName?: string;
  salaryLabel?: string;
}

export function DrawerMetadata({
  postedAt,
  updatedAt,
  repository,
  country,
  companyName,
  salaryLabel,
}: DrawerMetadataProps) {
  return (
    <div className="space-y-2 rounded-lg border border-border/70 bg-background/70 p-3 text-sm">
      <p className="flex items-center gap-2 text-foreground/95">
        <CalendarDays className="size-4 text-muted-foreground" />
        {postedAt}
      </p>
      <p className="flex items-center gap-2 text-foreground/95">
        <CalendarDays className="size-4 text-muted-foreground" />
        {updatedAt}
      </p>
      <p className="flex items-center gap-2 text-foreground/95">
        <Landmark className="size-4 text-muted-foreground" />
        {repository}
      </p>
      <p className="flex items-center gap-2 text-foreground/95">
        <MapPin className="size-4 text-muted-foreground" />
        {country}
      </p>
      {companyName ? (
        <p className="flex items-center gap-2 text-foreground/95">
          <Building2 className="size-4 text-muted-foreground" />
          {companyName}
        </p>
      ) : null}
      {salaryLabel ? (
        <p className="flex items-center gap-2 text-foreground/95">
          <Wallet className="size-4 text-muted-foreground" />
          {salaryLabel}
        </p>
      ) : null}
    </div>
  );
}
