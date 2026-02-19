import type {
  OrganisationMember,
  OrganisationRole,
} from "@/features/organisation/models";
import { ChangeRoleApi } from "./models";

export function toChangeRoleApi({
  member,
  role,
}: {
  member: OrganisationMember;
  role: OrganisationRole;
}): ChangeRoleApi {}
