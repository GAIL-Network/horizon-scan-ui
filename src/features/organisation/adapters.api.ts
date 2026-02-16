import { Organisation, OrganisationApi } from "./models";

export function apiToOrganisation(api: OrganisationApi): Organisation {
  return {
    id: api.id,
    name: api.name,
  };
}
