"use client";

import { Container } from "@/components/Container";
import { ErrorState } from "@/components/ErrorState";
import { Header } from "@/components/Header";
import { LoadingComponent } from "@/components/LoadingComponent";
import { Panel } from "@/components/Panel";
import { useOrganisationUsers } from "@/features/auth/hooks/useBaseUsers";
import { useOrganisation } from "@/features/organisation/hooks/useOrganisation";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const params = useParams<{ id: string }>();
  const { id } = params;

  const {
    state: organisation,
    actions: organisationActions,
    isLoading: isLoadingOrganisation,
    error,
  } = useOrganisation(id);

  const {
    state: users,
    actions: usersActions,
    isLoading: isLoadingUsers,
  } = useOrganisationUsers();

  useEffect(() => {
    if (organisation == null) return;

    usersActions.fetchUsers({ organisation });
  }, [organisation?.id, usersActions]);

  if (isLoadingOrganisation) return <LoadingComponent isLoading />;

  if (error) return <ErrorState message={error} />;

  if (!organisation) return <ErrorState message="Organisation not found" />;

  return (
    <Container>
      <Panel>
        <Header>Organisation</Header>
      </Panel>
    </Container>
  );
}
