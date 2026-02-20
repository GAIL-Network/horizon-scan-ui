import { getClient } from "@/api/client";
import { OrganisationalMember } from "../auth/models";
import { Organisation, OrganisationRole } from "../organisation/models";
import { toChangeRoleApi } from "./adapters.api";
import { apiToOrganisationMember } from "../organisation/adapters.api";

export async function changeRole(
  member: OrganisationalMember,
  role: OrganisationRole,
  organisation: Organisation,
): Promise<OrganisationalMember> {
  console.log(organisation);
  const { data: updatedMemberApi, error } = await getClient("compliance").PATCH(
    "/organisations/{organisation_id}/members/{member_id}/role",
    {
      params: {
        path: {
          organisation_id: organisation.id,
          member_id: member.user.id,
        },
      },
      body: { role },
    },
  );

  if (error) {
    throw new Error(
      typeof error === "string" ? error : "Failed to change member role",
    );
  }

  if (!updatedMemberApi) {
    throw new Error("No data returned from changeRole");
  }

  const updatedMember = apiToOrganisationMember(updatedMemberApi);
  return updatedMember;
}

export const api = {
  changeRole,
};
