import { components } from "@/api/openapi";
import { OrganisationalMember } from "../auth/models";
import { OrganisationRole } from "../organisation/models";

export type ChangeRoleApi = components["schemas"]["ChangeRoleSchema"];

export type ChangeRole = {
  member: OrganisationalMember;
  role: OrganisationRole;
};
