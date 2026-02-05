import { UserLoginRequestDTO, UserRegistrationRequestDTO } from "../dtos";
import { LoginCredentials, RegistrationInput } from "../models";

export function serializeCreateUser(
  newUser: RegistrationInput,
): UserRegistrationRequestDTO {
  const newUserDTO = { ...newUser }; // trivial serializing
  return newUserDTO;
}

export function serializeLoginCredentials(
  loginCredentials: LoginCredentials,
): UserLoginRequestDTO {
  const loginCredentialsDTO = { ...loginCredentials }; // trivial
  return loginCredentialsDTO;
}
