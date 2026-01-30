"use client";

import { Thread } from "@/components/thread";
import { StreamProvider } from "@/providers/Stream";
import { ThreadProvider } from "@/providers/Thread";
import { ArtifactProvider } from "@/components/thread/artifact";
import { Toaster } from "@/components/ui/sonner";
import React, { use, useEffect } from "react";

// Temporary hack to fix threads
import { redirect, useRouter } from "next/navigation";
//

export default function DemoPage({
  searchParams,
}: {
  searchParams: Promise<{ apiUrl?: string }>;
}): React.ReactNode {
  const { apiUrl } = use(searchParams);

  // If no apiUrl param, redirect automatically
  if (!apiUrl) {
    redirect("/chat?apiUrl=http://13.61.35.87:8123&assistantId=agent");
  }

  return (
    <React.Suspense fallback={<div>Loading (layout)...</div>}>
      <Toaster />
      <ThreadProvider>
        <StreamProvider>
          <ArtifactProvider>
            <Thread />
          </ArtifactProvider>
        </StreamProvider>
      </ThreadProvider>
    </React.Suspense>
  );
}
