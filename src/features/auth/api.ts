import { apiFetch } from "@/api/fetcher";
import type {
  UserLoginResponseDTO,
  UserRegistrationResponseDTO,
  UserApi,
} from "./dtos";
import type {
  RegistrationInput,
  RegisteredUser,
  LoginCredentials,
  AuthSession,
  User,
} from "./models";
import {
  serializeCreateUser,
  serializeLoginCredentials,
} from "./adapters/serializers";
import { apiToLogin, apiToNewUser, apiToUser } from "./adapters/adapters.api";

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
