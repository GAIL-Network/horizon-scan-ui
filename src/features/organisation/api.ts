import { apiFetch } from "@/api/fetcher";
import type { OrganisationApi } from "./models";

export async function createOrganisation(
  name: string,
): Promise<OrganisationApi> {
  return apiFetch("compliance", "/organisations", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}
