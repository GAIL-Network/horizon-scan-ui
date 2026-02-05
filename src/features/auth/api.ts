import { apiFetch } from "@/api/fetcher";
import type {
  UserLoginResponseDTO,
  UserRegistrationResponseDTO,
  UserMeResponseDTO,
} from "./dtos";
import type {
  RegistrationInput,
  RegisteredUser,
  LoginCredentials,
  AuthSession,
  CurrentUser,
} from "./models";
import {
  parseLoginResponseDTO,
  parseNewRegisteredUserDTO,
  parseUserDTO,
} from "./adapters/parsers";
import {
  serializeCreateUser,
  serializeLoginCredentials,
} from "./adapters/serializers";

export async function createNewUser(
  newUser: RegistrationInput,
): Promise<RegisteredUser> {
  const newRegisteredUserDTO = await apiFetch<UserRegistrationResponseDTO>(
    "/auth/register",
    {
      method: "POST",
      body: JSON.stringify(serializeCreateUser(newUser)),
    },
  );

  const newRegisteredUser = parseNewRegisteredUserDTO(newRegisteredUserDTO);
  return newRegisteredUser;
}

export async function loginUser(
  loginCredentials: LoginCredentials,
): Promise<AuthSession> {
  const loginResponseDTO = await apiFetch<UserLoginResponseDTO>("/auth/login", {
    method: "POST",
    body: JSON.stringify(serializeLoginCredentials(loginCredentials)),
  });
  const loginResponse = parseLoginResponseDTO(loginResponseDTO);
  return loginResponse;
}

export async function getMe(): Promise<CurrentUser> {
  const meDTO = await apiFetch<UserMeResponseDTO>("/auth/me", {
    method: "GET",
  });
  return parseUserDTO(meDTO);
}
