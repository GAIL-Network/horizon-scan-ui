"use client";

import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { LoadingComponent } from "@/components/LoadingComponent";
import { Panel } from "@/components/Panel";
import { useOrganisation } from "@/features/organisation/hooks/useOrganisation";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const params = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = params;

  const { state: organisation, actions } = useOrganisation(id);

  if (!organisation) return <LoadingComponent isLoading={isLoading} />;

  return (
    <Container>
      <Panel>
        <Header>Organisation</Header>
      </Panel>
    </Container>
  );
}
