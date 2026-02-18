import { useEffect, useState } from "react";
import { fetchMembers } from "../api";
import { notifyError } from "@/lib/notifications";
import { OrganisationalMember } from "@/features/auth/models";

export function useOrganisationMembers(organisationId: string) {
  const [state, setState] = useState<OrganisationalMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!organisationId) return;

    const run = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const members = await fetchMembers(organisationId);
        setState(members);
      } catch (err) {
        setError("Failed to load organisation members.");
        notifyError("Failed to load organisation members.");
        console.error(err);
        setState([]);
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, [organisationId]);

  const actions = {};
  return { state, actions, isLoading, error };
}
