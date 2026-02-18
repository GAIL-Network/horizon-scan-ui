"use client";

import { Container } from "@/components/Container";
import { ErrorState } from "@/components/ErrorState";
import { Header } from "@/components/Header";
import { List } from "@/components/List";
import { ListItem } from "@/components/ListItem";
import { LoadingComponent } from "@/components/LoadingComponent";
import { PageHeader } from "@/components/PageHeader";
import { Panel } from "@/components/Panel";
import { useOrganisation } from "@/features/organisation/hooks/useOrganisation";
import { useOrganisationMembers } from "@/features/organisation/hooks/useOrganisationMembers";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ id: string }>();
  const { id } = params;

  const {
    state: organisation,
    isLoading: isLoadingOrganisation,
    error: organisationError,
  } = useOrganisation(id);

  const {
    state: members,
    isLoading: isLoadingMembers,
    error: membersError,
  } = useOrganisationMembers(id);

  // ───────────────── Loading ─────────────────
  if (isLoadingOrganisation || isLoadingMembers) {
    return <LoadingComponent isLoading />;
  }

  // ───────────────── Errors ─────────────────
  if (organisationError) return <ErrorState message={organisationError} />;
  if (membersError) return <ErrorState message={membersError} />;

  if (!organisation) {
    return <ErrorState message="Organisation not found" />;
  }

  // members should default to [] in hook
  const safeMembers = members ?? [];

  return (
    <Container>
      <PageHeader>
        <Header>{organisation.name}</Header>
        <span className="text-muted-foreground text-sm">
          Created {organisation.createdAt.toDateString()}
        </span>
      </PageHeader>

      {/* ───────── Members ───────── */}
      <Panel>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Members</h2>
          <span className="text-muted-foreground text-sm">
            {safeMembers.length} member{safeMembers.length !== 1 ? "s" : ""}
          </span>
        </div>

        {safeMembers.length === 0 ? (
          <div className="text-muted-foreground py-6 text-center text-sm">
            No members in this organisation yet
          </div>
        ) : (
          <List>
            {safeMembers.map((member) => (
              <ListItem key={member.user.id}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{member.user.email}</span>

                  <select
                    className="rounded border px-2 py-1 text-sm"
                    defaultValue={member.role}
                  >
                    <option value="OWNER">OWNER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="STAFF">STAFF</option>
                    <option value="VIEWER">VIEWER</option>
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
