// src/components/AppShell.tsx
"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { UserProvider } from "@/context/UserProvider";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <Navbar />

      <Toaster
        richColors
        position="top-right"
      />

      <NuqsAdapter>{children}</NuqsAdapter>
    </UserProvider>
  );
}
