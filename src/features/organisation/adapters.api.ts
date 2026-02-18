import { apiToDate } from "@/lib/datetime";
import {
  Organisation,
  OrganisationApi,
  OrganisationMember,
  OrganisationMemberApi,
} from "./models";
import { apiToUser, apiToUserBase } from "../auth/adapters/adapters.api";

export function apiToOrganisation(api: OrganisationApi): Organisation {
  return {
    id: api.id,
    name: api.name,
    createdAt: apiToDate(api.createdAt),
  };
}

export function apiToOrganisationMember(
  api: OrganisationMemberApi,
): OrganisationMember {
  return {
    user: apiToUserBase(api.user),
    role: api.role,
  };
}
