import { cn } from "@/lib/utils";

type Props = React.ComponentPropsWithoutRef<"div">;

export function PageHeader({ className, ...rest }: Props) {
  return (
    <div
      className={cn("mb-8 flex flex-col gap-1 border-b pb-6", className)}
      {...rest}
    />
  );
}
