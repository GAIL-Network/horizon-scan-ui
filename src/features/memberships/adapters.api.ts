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
}): ChangeRoleApi {}
