"use client";

import { useUser } from "@/features/auth/hooks/useUser";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    // 🔓 allow auth pages always
    if (pathname.startsWith("/auth")) {
      if (user && user.organisation) {
        // logged in → leave auth pages
        router.replace("/command-center");
      }
      return;
    }

    // 🔒 logged out → go login
    if (!user) {
      router.replace("/auth/login");
      return;
    }

    // 🏢 logged in but no org
    if (!user.organisation && pathname !== "/organisation/new") {
      router.replace("/organisation/new");
      return;
    }

    if (user.organisation && pathname === "/organisation/new") {
      router.replace("/command-center");
    }

    // ✅ fully valid user
    // do nothing
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-sm opacity-60">
        Loading…
      </div>
    );
  }

  return <>{children}</>;
}
