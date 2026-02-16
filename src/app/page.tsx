"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/features/auth/hooks/useUser";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (loading) return;

    // not logged in
    if (!user) {
      router.replace("/auth/login");
      return;
    }

    // logged in but no organisation
    if (!user.organisation) {
      router.replace("/organisation/new");
      return;
    }

    // fully onboarded
    router.replace("/command-center");
  }, [user, loading, router]);

  return (
    <div className="flex h-screen items-center justify-center text-sm opacity-60">
      Loading…
    </div>
  );
}
