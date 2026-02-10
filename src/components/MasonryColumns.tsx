import * as React from "react";
import { cn } from "@/lib/utils";

type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

type ColumnsConfig = Partial<Record<Breakpoint, number>>;

interface MasonryColumnsProps {
  children: React.ReactNode;
  /**
   * Responsive column counts.
   * Example: { base: 1, md: 2, lg: 3 }
   */
  columns?: ColumnsConfig;
  /**
   * Vertical & horizontal gap in px
   */
  gap?: number;
  className?: string;
}

const BREAKPOINTS: Record<Exclude<Breakpoint, "base">, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

function getColumnCount(columns: ColumnsConfig) {
  if (typeof window === "undefined") {
    return columns.base ?? 1;
  }

  const width = window.innerWidth;
  let count = columns.base ?? 1;

  (Object.keys(BREAKPOINTS) as Array<keyof typeof BREAKPOINTS>).forEach(
    (bp) => {
      if (width >= BREAKPOINTS[bp] && columns[bp]) {
        count = columns[bp]!;
      }
    },
  );

  return count;
}

export default function MasonryColumns({
  children,
  columns = { base: 1, md: 2, lg: 3 },
  gap = 16,
  className,
}: MasonryColumnsProps) {
  const [columnCount, setColumnCount] = React.useState(() =>
    getColumnCount(columns),
  );

  React.useEffect(() => {
    function onResize() {
      setColumnCount(getColumnCount(columns));
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [columns]);

  return (
    <div
      className={cn(className)}
      style={{
        columnCount,
        columnGap: gap,
      }}
    >
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          style={{
            breakInside: "avoid",
            marginBottom: gap,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
