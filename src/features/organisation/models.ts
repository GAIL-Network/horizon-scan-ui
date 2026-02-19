import { components } from "@/api/openapi";
import { UserBase } from "../auth/models";

export type OrganisationApi = components["schemas"]["OrganisationResponse"];

export type Organisation = {
  id: string;
  name: string;
  createdAt: Date;
};

export type OrganisationRole = components["schemas"]["OrganisationRole"];

export const ORGANISATION_ROLES: OrganisationRole[] = [
  "OWNER",
  "ADMIN",
  "STAFF",
  "VIEWER",
];

export type OrganisationMemberApi =
  components["schemas"]["OrganisationMemberSchema"];

export type OrganisationMember = {
  user: UserBase;
  role: OrganisationRole;
};
