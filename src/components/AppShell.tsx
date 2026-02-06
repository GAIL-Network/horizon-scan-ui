// src/components/AppShell.tsx
"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { UserProvider } from "@/context/UserProvider";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AuthModalProvider } from "@/features/context/AuthModalContext";
import { AuthModal } from "@/features/auth/components/AuthModal";
import { SignalsProvider } from "@/context/SignalsProvider";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <AuthModalProvider>
        <Navbar />

        <Toaster
          richColors
          position="top-right"
        />

        <SignalsProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </SignalsProvider>
        <AuthModal />
      </AuthModalProvider>
    </UserProvider>
  );
}
