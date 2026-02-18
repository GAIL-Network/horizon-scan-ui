import { apiFetch } from "@/api/fetcher";
import type {
  Organisation,
  OrganisationApi,
  OrganisationMember,
  OrganisationMemberApi,
} from "./models";
import { apiToOrganisation, apiToOrganisationMember } from "./adapters.api";

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

export async function fetchMembers(id: string): Promise<OrganisationMember[]> {
  const response = await apiFetch<OrganisationMemberApi[] | null>(
    "compliance",
    `/organisations/${id}/members`,
    { method: "GET" },
  );
  return response == null
    ? []
    : response.map((memberApi) => apiToOrganisationMember(memberApi));
}
