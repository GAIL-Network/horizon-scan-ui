import { cn } from "@/lib/utils";

type PanelProps = React.ComponentPropsWithoutRef<"div">;

export function Panel({ className, ...rest }: PanelProps) {
  return (
    <div
      className={cn("rounded border border-gray-300 bg-white p-2", className)}
      {...rest}
    />
  );
}
