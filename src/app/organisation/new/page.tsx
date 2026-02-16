"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/features/auth/hooks/useUser";
import { createOrganisation } from "@/features/organisation/api";

export default function NewOrganisationPage() {
  const router = useRouter();
  const { user, loading, actions } = useUser();

  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔐 route protection
  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    if (user.organisation) {
      router.replace("/");
      return;
    }
  }, [user, loading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Organisation name required");
      return;
    }

    setSubmitting(true);

    try {
      // create org
      await createOrganisation(name);

      // refresh session so user.organisation exists
      await actions.fetchMe();

      // go through routing brain
      router.push("/");
    } catch (err: any) {
      setError(err?.message ?? "Failed to create organisation");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || !user || user.organisation) {
    return (
      <div className="flex h-screen items-center justify-center text-sm opacity-60">
        Loading…
      </div>
    );
  }

  return (
    <div className="mx-auto mt-24 w-full max-w-md">
      <h1 className="mb-2 text-2xl font-semibold">Create your organisation</h1>

      <p className="mb-6 text-sm text-slate-500">
        This will be your workspace for compliance management.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          autoFocus
          placeholder="Acme Ltd"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded border px-3 py-2"
        />

        {error && <div className="text-sm text-red-600">{error}</div>}

        <button
          disabled={submitting}
          className="rounded bg-black px-4 py-2 text-white"
        >
          {submitting ? "Creating…" : "Create organisation"}
        </button>
      </form>
    </div>
  );
}
