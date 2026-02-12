// src/components/ModalParts.tsx
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function ModalHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-b px-4 py-3 font-semibold", className)}>
      {children}
    </div>
  );
}

export function ModalBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex-1 overflow-y-auto p-4", className)}>
      {children}
    </div>
  );
}

export function ModalFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex justify-end gap-2 border-t px-4 py-3", className)}>
      {children}
    </div>
  );
}
