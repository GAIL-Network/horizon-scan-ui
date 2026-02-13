import {
  UserApi,
  UserLoginResponseDTO,
  UserRegistrationResponseDTO,
} from "../dtos";
import { AuthSession, RegisteredUser, User } from "../models";

export function apiToUser(api: UserApi): User {
  const { is_active, is_verified, created_at, ...rest } = api;
  return {
    ...rest,
    isActive: is_active,
    isVerified: is_verified,
    createdAt: new Date(created_at),
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
