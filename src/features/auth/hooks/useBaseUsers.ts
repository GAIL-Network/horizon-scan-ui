import { useCallback, useMemo, useState } from "react";

import { UserBase } from "@/features/auth/models";
import { Organisation } from "@/features/organisation/models";
import { notifyError } from "@/lib/notifications";
import { fetchUsers as fetchUsersApi } from "@/features/auth/api";

export function useOrganisationUsers() {
  const [state, setState] = useState<UserBase[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(
    async ({ organisation }: { organisation: Organisation }) => {
      setIsLoading(true);
      try {
        const users = await fetchUsersApi({ organisation });
        setState(users);
      } catch (err) {
        const msg = "Failed to fetch users.";
        setError(msg);
        notifyError(msg);
        console.log(err);
        setState([]);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const actions = useMemo(
    () => ({
      fetchUsers,
    }),
    [fetchUsers],
  );

  return { state, actions, isLoading, error };
}
