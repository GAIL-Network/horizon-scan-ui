import { components } from "@/api/openapi";
import { UserBase } from "../auth/models";

export type OrganisationApi = components["schemas"]["OrganisationResponse"];

export type OrganisationWithUsersApi =
  components["schemas"]["OrganisationWithUsersResponse"];

export type Organisation = {
  id: string;
  name: string;
  createdAt: Date;
};

export type OrganisationWithUsers = {
  id: string;
  name: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  users: UserBase[];
};
