import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SectionTitleProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  className?: string;
}

export function SectionTitle({
  icon: Icon,
  title,
  description,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="size-4.5 text-primary shrink-0" />}
        <h2 className="text-base font-semibold text-foreground tracking-tight">
          {title}
        </h2>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground pl-[calc(1.125rem+0.5rem)]">
          {description}
        </p>
      )}
    </div>
  );
}
