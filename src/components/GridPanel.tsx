import Link from "next/link";
import { ReactNode } from "react";
import { Panel } from "@/components/Panel";
import { cn } from "@/lib/utils";

type GridPanelRootProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

function GridPanelRoot({ href, children, className }: GridPanelRootProps) {
  return (
    <Link
      href={href}
      className="group"
    >
      <Panel
        className={cn(
          "h-60 cursor-pointer border border-gray-300",
          "transition-all duration-200 ease-out",
          "hover:-translate-y-0.5",
          "hover:shadow-lg",
          "hover:ring-2 hover:ring-slate-400",
          className,
        )}
      >
        <div className="flex h-full flex-col">{children}</div>
      </Panel>
    </Link>
  );
}

/* ---------- Parts ---------- */

type PartProps = {
  children: ReactNode;
  className?: string;
};

function Header({ children, className }: PartProps) {
  return <div className={cn("flex flex-col gap-2", className)}>{children}</div>;
}

function Body({ children, className }: PartProps) {
  return (
    <div className={cn("mt-2 flex-1 overflow-hidden", className)}>
      {children}
    </div>
  );
}

function Footer({ children, className }: PartProps) {
  return (
    <div className={cn("pt-2 text-sm text-slate-500", className)}>
      {children}
    </div>
  );
}

/* ---------- Compound export ---------- */

export const GridPanel = Object.assign(GridPanelRoot, {
  Header,
  Body,
  Footer,
});
