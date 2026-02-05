import type {
  UserLoginRequestDTO,
  UserRegistrationRequestDTO,
  UserRegistrationResponseDTO,
  UserLoginResponseDTO,
  UserMeResponseDTO,
} from "@/features/auth/dtos";

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
export type CurrentUser = Omit<
  UserMeResponseDTO,
  "is_active" | "is_verified" | "created_at"
> & {
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
};
