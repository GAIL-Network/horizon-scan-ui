import { apiFetch } from "@/api/fetcher";
import type {
  UserLoginResponseDTO,
  UserRegistrationResponseDTO,
  UserApi,
} from "./dtos";
import {
  type RegistrationInput,
  type RegisteredUser,
  type LoginCredentials,
  type AuthSession,
  type User,
  type UserBase,
  UserBaseApi,
} from "./models";
import {
  serializeCreateUser,
  serializeLoginCredentials,
} from "./adapters/serializers";
import {
  apiToLogin,
  apiToNewUser,
  apiToUser,
  apiToUserBase,
} from "./adapters/adapters.api";
import { Organisation } from "../organisation/models";

export async function createNewUser(
  newUser: RegistrationInput,
): Promise<RegisteredUser> {
  const newRegisteredUserDTO = await apiFetch<UserRegistrationResponseDTO>(
    "compliance",
    "/auth/register",
    {
      method: "POST",
      body: JSON.stringify(serializeCreateUser(newUser)),
    },
  );

  const newRegisteredUser = apiToNewUser(newRegisteredUserDTO);
  return newRegisteredUser;
}

export async function loginUser(
  loginCredentials: LoginCredentials,
): Promise<AuthSession> {
  const loginResponseDTO = await apiFetch<UserLoginResponseDTO>(
    "compliance",
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify(serializeLoginCredentials(loginCredentials)),
    },
  );
  const loginResponse = apiToLogin(loginResponseDTO);
  return loginResponse;
}

export async function getMe(): Promise<User> {
  const meDTO = await apiFetch<UserApi>("compliance", "/auth/me", {
    method: "GET",
  });
  return apiToUser(meDTO);
}

export async function fetchUsers({
  organisation,
}: {
  organisation: Organisation;
}): Promise<UserBase[]> {
  const usersApi = await apiFetch<UserBaseApi[]>("compliance", "/users", {
    method: "GET",
    query: { organisation_id: organisation.id },
  });
  const users = usersApi.map(apiToUserBase);
  return users;
}
