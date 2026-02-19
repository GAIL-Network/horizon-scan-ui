"use client";

import { Container } from "@/components/Container";
import { ErrorState } from "@/components/ErrorState";
import { Header } from "@/components/Header";
import { List } from "@/components/List";
import { ListItem } from "@/components/ListItem";
import { LoadingComponent } from "@/components/LoadingComponent";
import { PageHeader } from "@/components/PageHeader";
import { Panel } from "@/components/Panel";
import { OrganisationalMember } from "@/features/auth/models";
import { OrganisationRoleSelector } from "@/features/memberships/components/OrganisationRoleSelector";
import { useOrganisation } from "@/features/organisation/hooks/useOrganisation";
import { useOrganisationMembers } from "@/features/organisation/hooks/useOrganisationMembers";
import { OrganisationRole } from "@/features/organisation/models";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const params = useParams<{ id: string }>();
  const { id } = params;

  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [isInviting, setIsInviting] = useState(false);

  const {
    state: organisation,
    isLoading: isLoadingOrganisation,
    error: organisationError,
  } = useOrganisation(id);

  const {
    state: members,
    actions: memberActions,
    isLoading: isLoadingMembers,
    error: membersError,
  } = useOrganisationMembers(id);

  const handleChangeOrganisationRole = async (
    member: OrganisationalMember,
    role: OrganisationRole,
  ) => {
    if (!organisation) return;

    setUpdatingUserId(member.user.id);
    try {
      await memberActions.changeRole(member, role, organisation);
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleInvite = async () => {
    if (!organisation || !inviteEmail.trim()) return;

    setIsInviting(true);
    try {
      await memberActions.invite(organisation.id, inviteEmail.trim());
      setInviteEmail("");
      toast.success("Invitation sent");
    } catch {
      toast.error("Failed to send invite");
    } finally {
      setIsInviting(false);
    }
  };

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

                  <OrganisationRoleSelector
                    value={member.role}
                    disabled={updatingUserId === member.user.id}
                    onChange={(role) =>
                      handleChangeOrganisationRole(member, role)
                    }
                  />
                </div>
              </ListItem>
            ))}
          </List>
        )}
      </Panel>

      {/* ───────── Invite Members ───────── */}
      <Panel className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Invite member</h2>
            <p className="text-muted-foreground text-sm">
              Send an invitation to join this organisation
            </p>
          </div>

          <div className="flex w-full gap-3 sm:w-auto">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-slate-400 focus:outline-none"
            />

            <button
              onClick={handleInvite}
              disabled={isInviting || !inviteEmail.trim()}
              className="rounded-md bg-slate-800 px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              {isInviting ? "Inviting..." : "Invite"}
            </button>
          </div>
        </div>
      </Panel>
    </Container>
  );
}
