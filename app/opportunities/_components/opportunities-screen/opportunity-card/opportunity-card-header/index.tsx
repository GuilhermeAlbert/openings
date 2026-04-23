interface OpportunityCardHeaderProps {
  title: string;
  excerpt: string;
}

export function OpportunityCardHeader({
  title,
  excerpt,
}: OpportunityCardHeaderProps) {
  return (
    <div className="space-y-1.5">
      <p className="text-base font-semibold tracking-[-0.01em] text-foreground">
        {title}
      </p>
      <p className="line-clamp-2 max-w-[62ch] text-sm leading-6 text-muted-foreground">
        {excerpt}
      </p>
    </div>
  );
}
