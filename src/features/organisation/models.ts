import { components } from "@/api/openapi";

export type OrganisationApi = components["schemas"]["OrganisationSchema"];

export type Organisation = {
  id: string;
  name: string;
  createdAt: Date;
};
