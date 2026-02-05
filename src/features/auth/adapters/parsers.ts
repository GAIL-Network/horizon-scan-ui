import { z } from "zod";

import type {
  UserRegistrationRequestDTO,
  UserRegistrationResponseDTO,
  UserLoginResponseDTO,
  UserMeResponseDTO,
} from "@/features/auth/dtos";
import type {
  RegistrationInput,
  RegisteredUser,
  AuthSession,
  CurrentUser,
} from "@/features/auth/models";

export function parseCreateUser(
  user: UserRegistrationRequestDTO,
): RegistrationInput {
  return {
    ...user,
    email: z.email().parse(user.email),
  };
}

export function parseNewRegisteredUserDTO(
  user: UserRegistrationResponseDTO,
): RegisteredUser {
  return {
    ...user,
    email: z.email().parse(user.email),
  };
}

export function parseLoginResponseDTO(
  loginResponseDTO: UserLoginResponseDTO,
): AuthSession {
  return {
    accessToken: z.string().parse(loginResponseDTO.access_token),
    tokenType: z.string().parse(loginResponseDTO.token_type),
  };
}

export function parseUserDTO(userDTO: UserMeResponseDTO): CurrentUser {
  return {
    id: z.uuidv4().parse(userDTO.id),
    email: z.email().parse(userDTO.email),
    isActive: z.boolean().parse(userDTO.is_active),
    isVerified: z.boolean().parse(userDTO.is_verified),
    createdAt: z.coerce.date().parse(userDTO.created_at),
  };
}
