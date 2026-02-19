import { OrganisationalMember } from "../auth/models";
import { OrganisationRole } from "../organisation/models";

export async function changeRole(
  member: OrganisationalMember,
  role: OrganisationRole,
): Promise<OrganisationalMember> {
  return member;
}

export const api = {
  changeRole,
};
