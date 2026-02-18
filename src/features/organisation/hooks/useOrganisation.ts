import { useEffect, useState } from "react";
import { Organisation } from "../models";
import { apiToOrganisation } from "../adapters.api";
import { fetchOrganisation } from "../api";

export function useOrganisation(id: string) {
  const [state, setState] = useState<Organisation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshState = async (): Promise<void> => {
    const organisation = await fetchOrganisation(id);
    setState(organisation);
  };

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    refreshState().finally(() => setIsLoading(false));
  }, [id]);

  const actions = {};

  return { state, actions, isLoading };
}
