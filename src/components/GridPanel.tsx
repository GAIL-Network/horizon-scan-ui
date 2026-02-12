import Link from "next/link";
import { ReactNode } from "react";
import { Panel } from "@/components/Panel";
import { cn } from "@/lib/utils";

type GridPanelRootProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

function GridPanelRoot({
  href,
  children,
  className,
  onClick,
}: GridPanelRootProps) {
  const panel = (
    <Panel
      className={cn(
        "h-60 border border-gray-300",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5",
        "hover:shadow-lg",
        "hover:ring-2 hover:ring-slate-400",
        href || onClick ? "cursor-pointer" : "",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex h-full flex-col">{children}</div>
    </Panel>
  );

  if (!href) {
    return panel;
  }

  return (
    <Link
      href={href}
      className="group"
    >
      {panel}
    </Link>
  );
}

/* ---------- Parts ---------- */

type PartProps = {
  children: ReactNode;
  className?: string;
};

function Header({ children, className }: PartProps) {
  return (
    <div className={cn("flex flex-col gap-2", "text-slate-900", className)}>
      {children}
    </div>
  );
}

function Title({ children, className }: PartProps) {
  return (
    <div className={cn("line-clamp-2 text-base font-medium", className)}>
      {children}
    </div>
  );
}

function Meta({ children, className }: PartProps) {
  return (
    <div className={cn("flex flex-wrap gap-1", className)}>{children}</div>
  );
}

function Body({ children, className }: PartProps) {
  return (
    <div
      className={cn(
        "mt-2 flex-1 overflow-hidden text-sm text-slate-700",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Footer({ children, className }: PartProps) {
  return (
    <div className={cn("pt-2 text-xs text-slate-500", className)}>
      {children}
    </div>
  );
}

/* ---------- Compound export ---------- */

export const GridPanel = Object.assign(GridPanelRoot, {
  Header,
  Body,
  Footer,
  Title,
  Meta,
});
