"use client";

import { Container } from "@/components/Container";
import { ErrorState } from "@/components/ErrorState";
import { Header } from "@/components/Header";
import { List } from "@/components/List";
import { ListItem } from "@/components/ListItem";
import { LoadingComponent } from "@/components/LoadingComponent";
import { PageHeader } from "@/components/PageHeader";
import { Panel } from "@/components/Panel";
import { Section } from "@/components/Section";
import { useOrganisationUsers } from "@/features/auth/hooks/useBaseUsers";
import { useOrganisation } from "@/features/organisation/hooks/useOrganisation";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const params = useParams<{ id: string }>();
  const { id } = params;

  const {
    state: organisation,
    isLoading: isLoadingOrganisation,
    error,
  } = useOrganisation(id);

  const {
    state: users,
    actions: usersActions,
    isLoading: isLoadingUsers,
  } = useOrganisationUsers();

  useEffect(() => {
    if (!organisation) return;
    usersActions.fetchUsers({ organisation });
  }, [organisation?.id, usersActions]);

  if (isLoadingOrganisation) return <LoadingComponent isLoading />;
  if (error) return <ErrorState message={error} />;
  if (!organisation) return <ErrorState message="Organisation not found" />;

  return (
    <Container>
      <PageHeader>
        <Header>{organisation.name}</Header>
        <span className="text-muted-foreground text-sm">
          Created {organisation.createdAt.toDateString()}
        </span>
      </PageHeader>

      {/* ───────── Users ───────── */}
      <Panel>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Users</h2>
          <span className="text-muted-foreground text-sm">
            {users.length} member{users.length !== 1 ? "s" : ""}
          </span>
        </div>

        {isLoadingUsers ? (
          <LoadingComponent isLoading />
        ) : users.length === 0 ? (
          <div className="text-muted-foreground py-6 text-center text-sm">
            No users in this organisation yet
          </div>
        ) : (
          <List>
            {users.map((user) => (
              <ListItem key={user.id}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{user.email}</span>

                  <select
                    className="rounded border px-2 py-1 text-sm"
                    defaultValue="ADMIN"
                  >
                    <option>OWNER</option>
                    <option>ADMIN</option>
                    <option>STAFF</option>
                    <option>VIEWER</option>
                  </select>
                </div>
              </ListItem>
            ))}
          </List>
        )}
      </Panel>
    </Container>
  );
}
