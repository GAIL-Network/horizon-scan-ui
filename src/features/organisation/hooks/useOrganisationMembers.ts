import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchMembers } from "../api";
import { notifyError } from "@/lib/notifications";
import { OrganisationalMember } from "@/features/auth/models";
import { Organisation, OrganisationRole } from "../models";
import { api } from "@/features/memberships/api";

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

  const changeRole = useCallback(
    async (
      member: OrganisationalMember,
      role: OrganisationRole,
      organisation: Organisation,
    ): Promise<OrganisationalMember> => {
      // optimistic update
      setState((prev) =>
        prev.map((m) => (m.user.id === member.user.id ? { ...m, role } : m)),
      );

      try {
        const updatedMember = await api.changeRole(member, role, organisation);
        return updatedMember;
      } catch (err) {
        notifyError("Failed to update role");

        // revert if API fails
        setState((prev) =>
          prev.map((m) => (m.user.id === member.user.id ? member : m)),
        );

        throw err;
      }
    },
    [],
  );

  const invite = useCallback(
    async (organisationId: string, inviteEmail: string) => {
      console.log("invite");
    },
    [],
  );

  const actions = useMemo(
    () => ({
      changeRole,
      invite,
    }),
    [],
  );
  return { state, actions, isLoading, error };
}
