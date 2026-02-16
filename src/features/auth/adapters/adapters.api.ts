import { apiToOrganisation } from "@/features/organisation/adapters.api";
import {
  UserApi,
  UserLoginResponseDTO,
  UserRegistrationResponseDTO,
} from "../dtos";
import { AuthSession, RegisteredUser, User } from "../models";

export function apiToUser(api: UserApi): User {
  const { createdAt, ...rest } = api;
  return {
    ...rest,
    createdAt: new Date(createdAt),
    organisation:
      api.organisation == null ? null : apiToOrganisation(api.organisation),
  };
}

export function apiToLogin(api: UserLoginResponseDTO): AuthSession {
  const { access_token, token_type, ...rest } = api;
  return { ...rest, accessToken: access_token, tokenType: token_type };
}

export function apiToNewUser(api: UserRegistrationResponseDTO): RegisteredUser {
  const { ...rest } = api;
  return { ...rest };
}
