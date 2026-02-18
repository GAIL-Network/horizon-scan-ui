import { useEffect, useState } from "react";
import { OrganisationWithUsers } from "../models";
import { fetchOrganisationWithUsers } from "../api";
import { notifyError } from "@/lib/notifications";

export function useOrganisationWithUsers(id: string) {
  const [state, setState] = useState<OrganisationWithUsers | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const run = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const organisation = await fetchOrganisationWithUsers(id);
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
