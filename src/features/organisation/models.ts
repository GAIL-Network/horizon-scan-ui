import { components } from "@/api/openapi";
import { OrganisationRole, UserBase } from "../auth/models";

export type OrganisationApi = components["schemas"]["OrganisationResponse"];

export type Organisation = {
  id: string;
  name: string;
  createdAt: Date;
};

export type OrganisationMemberApi =
  components["schemas"]["OrganisationMemberSchema"];

export type OrganisationMember = {
  user: UserBase;
  role: OrganisationRole;
};
