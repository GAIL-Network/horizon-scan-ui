import { components } from "@/api/openapi";

type schemas = components["schemas"];

export type UserRegistrationRequestDTO = schemas["UserRegistrationRequest"];
export type UserRegistrationResponseDTO = schemas["UserRegistrationResponse"];
export type UserLoginRequestDTO = schemas["UserLoginRequest"];
export type UserLoginResponseDTO = schemas["UserLoginResponse"];
export type UserMeResponseDTO = schemas["UserMeResponse"];
