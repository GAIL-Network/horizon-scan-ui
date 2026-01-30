import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Navbar } from "@/components/Navbar";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  preload: true,
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agent Chat",
  description: "Agent Chat UX by LangChain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("mx-auto max-w-7xl px-4", inter.className)}>
        <UserProvider>
          <Navbar />
          <Toaster
            richColors
            position="top-right"
          />
          <NuqsAdapter>{children}</NuqsAdapter>
        </UserProvider>
      </body>
    </html>
  );
}
