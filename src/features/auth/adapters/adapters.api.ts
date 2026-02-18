import { apiToOrganisation } from "@/features/organisation/adapters.api";
import {
  UserApi,
  UserLoginResponseDTO,
  UserRegistrationResponseDTO,
} from "../dtos";
import {
  AuthSession,
  RegisteredUser,
  User,
  UserBase,
  UserBaseApi,
} from "../models";
import { apiToDate } from "@/lib/datetime";

export function apiToUserBase(api: UserBaseApi): UserBase {
  return {
    id: api.id,
    email: api.email,
    createdAt: apiToDate(api.createdAt),
  };
}

export function apiToUser(api: UserApi): User {
  const { createdAt, ...rest } = api;
  return {
    ...rest,
    createdAt: apiToDate(createdAt),
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
