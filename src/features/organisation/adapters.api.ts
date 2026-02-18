import { apiToDate } from "@/lib/datetime";
import { apiToUserBase } from "../auth/adapters/adapters.api";
import {
  Organisation,
  OrganisationApi,
  OrganisationWithUsers,
  OrganisationWithUsersApi,
} from "./models";

export function apiToOrganisation(api: OrganisationApi): Organisation {
  return {
    id: api.id,
    name: api.name,
    createdAt: apiToDate(api.createdAt),
  };
}

export function apiToOrganisationWithUsers(
  api: OrganisationWithUsersApi,
): OrganisationWithUsers {
  return {
    id: api.id,
    name: api.name,
    createdAt: apiToDate(api.createdAt),
    lastUpdatedAt: apiToDate(api.lastUpdatedAt),
    users: api.users.map(apiToUserBase),
  };
}
