import { useEffect, useState } from "react";
import { fetchMembers } from "../api";
import { notifyError } from "@/lib/notifications";
import { OrganisationalMember } from "@/features/auth/models";

export function useOrganisationMembers(id: string) {
  const [state, setState] = useState<OrganisationalMember[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const run = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const organisation = await fetchMembers(id);
        setState(organisation);
      } catch (err) {
        setError("Failed to load organisation");
        notifyError("Failed to load organisation");
        console.error(err);
        setState(null);
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, [id]);

  const actions = {};
  return { state, actions, isLoading, error };
}
