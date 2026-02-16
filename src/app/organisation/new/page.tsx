"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/features/auth/hooks/useUser";

export default function NewOrganisationPage() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    // already has org → leave onboarding
    if (user.organisation) {
      router.replace("/");
    }
  }, [user, loading, router]);

  return (
    <div className="mx-auto mt-20 max-w-md">
      <h1 className="mb-4 text-xl font-semibold">Create organisation</h1>

      {/* form goes here next */}
    </div>
  );
}
