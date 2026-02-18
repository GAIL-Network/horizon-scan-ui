import { useEffect, useState } from "react";
import { Organisation } from "../models";

export function useOrganisation(id: string) {
  const [state, setState] = useState<Organisation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshState = async () => {
    // await api call here
  };

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    refreshState().finally(() => setIsLoading(false));
  }, [id]);

  const actions = {};

  return { state, actions, isLoading };
}
