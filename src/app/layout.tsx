import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";

import { cn } from "@/lib/utils";
import { AppShell } from "@/components/AppShell";

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
  const isUseMaxWidth = true;

  return (
    <html lang="en">
      <body
        className={cn(
          "mx-auto bg-gray-50",
          inter.className,
          !isUseMaxWidth && "max-w-7xl",
        )}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
