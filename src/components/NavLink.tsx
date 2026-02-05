import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type NavLinkProps = React.ComponentPropsWithoutRef<typeof Link> & {
  isSelected?: boolean;
};

export function NavLink({
  className,
  isSelected = false,
  ...props
}: NavLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "border border-slate-400 bg-slate-500 text-slate-100 hover:bg-slate-400",
        "rounded p-2",
        isSelected && "border border-slate-300 bg-slate-300 text-slate-900",
        className,
      )}
    />
  );
}
