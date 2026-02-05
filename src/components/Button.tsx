import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  className?: string;
}

export default function Button({ className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        "rounded border px-3 py-2",
        "border-slate-600 bg-slate-600 text-white",
        "hover:bg-slate-700 active:bg-slate-800",
        "transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    />
  );
}
