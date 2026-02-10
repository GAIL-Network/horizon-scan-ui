import { cn } from "@/lib/utils";

export function TagPill({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700",
        className,
      )}
    >
      {value}
    </span>
  );
}
