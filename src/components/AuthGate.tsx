"use client";

import { useUser } from "@/features/auth/hooks/useUser";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useUser();

  useEffect(() => {
    if (loading) return;

    if (pathname.startsWith("/auth")) {
      if (!user) return; // allow auth pages when logged out
      router.replace("/"); // logged in → leave auth
      return;
    }

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    if (!user.organisation && pathname !== "/organisation/new") {
      router.replace("/organisation/new");
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return <div className="p-10">Loading…</div>;
  }

  // don't block auth pages
  if (!user && pathname.startsWith("/auth")) {
    return <>{children}</>;
  }

  // don't block organisation creation for authenticated user
  if (user && !user.organisation && pathname === "/organisation/new")
    return <>{children}</>;

  // block app until valid
  if (!user) {
    return <div className="p-10">Loading…</div>;
  }

  return <>{children}</>;
}
