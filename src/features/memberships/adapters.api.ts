import type {
  Organisation,
  OrganisationMember,
  OrganisationRole,
} from "@/features/organisation/models";
import { ChangeRoleApi } from "./models";

export function toChangeRoleApi({
  member,
  role,
  organisation,
}: {
  member: OrganisationMember;
  role: OrganisationRole;
  organisation: Organisation;
}): ChangeRoleApi {
  return {
    user_id: member.user.id,
    organisation_id: organisation.id,
    role,
  };
}
