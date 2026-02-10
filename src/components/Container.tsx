import { cn } from "@/lib/utils";

type Props = React.ComponentPropsWithoutRef<"div">;

export function Container({ className, ...rest }: Props) {
  return (
    <div
      className={cn("flex flex-col gap-1 p-2 md:mx-10", className)}
      {...rest}
    />
  );
}
