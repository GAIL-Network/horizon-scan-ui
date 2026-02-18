import { apiFetch } from "@/api/fetcher";
import type {
  Organisation,
  OrganisationApi,
  OrganisationWithUsers,
  OrganisationWithUsersApi,
} from "./models";
import { apiToOrganisation, apiToOrganisationWithUsers } from "./adapters.api";

export async function createOrganisation(
  name: string,
): Promise<OrganisationApi> {
  return apiFetch("compliance", "/organisations", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}

export async function fetchOrganisation(
  id: string,
): Promise<Organisation | null> {
  const response = await apiFetch<OrganisationApi | null>(
    "compliance",
    `/organisations/${id}`,
    { method: "GET" },
  );
  return response == null ? null : apiToOrganisation(response);
}

export async function fetchOrganisationWithUsers(
  id: string,
): Promise<OrganisationWithUsers | null> {
  const response = await apiFetch<OrganisationWithUsersApi | null>(
    "compliance",
    `/organisations/${id}/users`,
    { method: "GET" },
  );
  return response == null ? null : apiToOrganisationWithUsers(response);
}
