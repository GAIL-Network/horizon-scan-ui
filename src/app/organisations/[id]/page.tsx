"use client";

import { Container } from "@/components/Container";
import { ErrorState } from "@/components/ErrorState";
import { Header } from "@/components/Header";
import { LoadingComponent } from "@/components/LoadingComponent";
import { Panel } from "@/components/Panel";
import { useOrganisationWithUsers } from "@/features/organisation/hooks/useOrganisationWithUsers";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ id: string }>();
  const { id } = params;

  const {
    state: organisation,
    actions,
    isLoading,
    error,
  } = useOrganisationWithUsers(id);

  if (isLoading) return <LoadingComponent isLoading />;

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
