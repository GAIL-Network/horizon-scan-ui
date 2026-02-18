import { cn } from "@/lib/utils";

type Props = React.ComponentPropsWithoutRef<"div">;

export function Container({ className, ...rest }: Props) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-5xl",
        "px-4 sm:px-6 lg:px-8",
        "py-6 md:py-8",
        "flex flex-col gap-6",
        className,
      )}
      {...rest}
    />
  );
}
