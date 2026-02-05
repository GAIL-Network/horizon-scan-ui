// src/components/Modal.tsx
"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect } from "react";

export type ModalProps = {
  isShow: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
};

export function Modal({
  isShow: open,
  onClose,
  children,
  className,
}: ModalProps) {
  // Close on ESC
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className={cn(
          "relative z-10 w-full max-w-lg rounded-lg bg-white shadow-xl",
          "animate-in fade-in zoom-in-95",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
