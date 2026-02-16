"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/features/auth/hooks/useUser";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    if (!user.organisation) {
      router.replace("/organisation/new");
      return;
    }

    router.replace("/command-center");
  }, [user, loading, router]);

  return (
    <div className="flex h-screen items-center justify-center text-sm opacity-60">
      Loading…
    </div>
  );
}
