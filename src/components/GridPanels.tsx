import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type GridPanelsProps = {
  children: ReactNode;
  className?: string;
};

export function GridPanels({ children, className }: GridPanelsProps) {
  return (
    <div
      className={cn(
        "mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}
