import type {
  UserLoginRequestDTO,
  UserRegistrationRequestDTO,
  UserRegistrationResponseDTO,
  UserLoginResponseDTO,
  UserApi,
} from "@/features/auth/dtos";
import { Organisation } from "../organisation/models";

export type RegistrationInput = UserRegistrationRequestDTO;
export type RegisteredUser = UserRegistrationResponseDTO;
export type LoginCredentials = UserLoginRequestDTO;
export type AuthSession = Omit<
  UserLoginResponseDTO,
  "access_token" | "token_type"
> & {
  accessToken: string;
  tokenType: string;
};
export type User = Omit<UserApi, "is_active" | "is_verified" | "created_at"> & {
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  organisation: Organisation | null;
};
