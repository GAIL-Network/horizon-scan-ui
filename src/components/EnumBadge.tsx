import { cn } from "@/lib/utils";

export interface EnumBadgeProps {
  value: string;
  className?: string;
  title?: string;
}

export function EnumBadge({ value, className, title }: EnumBadgeProps) {
  return (
    <span
      title={title}
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        className,
      )}
    >
      {value}
    </span>
  );
}
