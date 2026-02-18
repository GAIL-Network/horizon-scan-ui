"use client";

import { LoadingComponent } from "@/components/LoadingComponent";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center text-sm opacity-60">
      <LoadingComponent isLoading={true} />
    </div>
  );
}
