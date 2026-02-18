import { apiFetch } from "@/api/fetcher";
import type { Organisation, OrganisationApi } from "./models";
import { apiToOrganisation } from "./adapters.api";

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
