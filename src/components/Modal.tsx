// src/components/Modal.tsx
"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect } from "react";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "xxl" | "full";

export type ModalProps = {
  isShow: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  size?: ModalSize;
};

const MODAL_SIZES: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  xxl: "max-w-6xl",
  full: "w-screen h-screen max-w-none",
};

export function Modal({
  isShow: open,
  onClose,
  children,
  className,
  size = "md",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex",
        size === "full"
          ? "items-stretch justify-stretch"
          : "items-center justify-center",
      )}
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
          "relative z-10 w-full bg-white shadow-xl",
          "animate-in fade-in zoom-in-95",
          size === "full" ? "rounded-none" : "rounded-lg",
          MODAL_SIZES[size],
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
