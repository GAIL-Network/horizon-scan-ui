// src/components/AppShell.tsx
"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { UserProvider } from "@/context/UserProvider";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AuthModalProvider } from "@/features/context/AuthModalContext";
import { AuthModal } from "@/features/auth/components/AuthModal";
import { ChangeEventsProvider } from "@/context/ChangeEventsProvider";
import { AuthGate } from "./AuthGate";
import { NavSide } from "./NavSide";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <AuthModalProvider>
        <ChangeEventsProvider>
          <NuqsAdapter>
            <AuthGate>
              <NavSide>{children}</NavSide>
            </AuthGate>
          </NuqsAdapter>
        </ChangeEventsProvider>

        <AuthModal />
        <Toaster
          richColors
          position="top-right"
        />
      </AuthModalProvider>
    </UserProvider>
  );
}
