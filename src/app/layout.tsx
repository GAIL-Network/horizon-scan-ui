import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Navbar } from "@/components/Navbar";
import { UserProvider } from "@/context/UserProvider";
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
