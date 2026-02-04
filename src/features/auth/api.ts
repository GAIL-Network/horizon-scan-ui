import { apiFetch } from "@/api/fetcher";
import { NewRegisteredUserDTO } from "./dtos";
import { UserCreate, NewRegisteredUser } from "./models";
import { parseNewRegisteredUserDTO } from "./adapters/parsers";
import { serializeCreateUser } from "./adapters/serializers";

export async function createNewUser(
  newUser: UserCreate,
): Promise<NewRegisteredUser> {
  const newRegisteredUserDTO = await apiFetch<NewRegisteredUserDTO>(
    "/auth/register",
    {
      method: "POST",
      body: JSON.stringify(serializeCreateUser(newUser)),
    },
  );

  const newRegisteredUser = parseNewRegisteredUserDTO(newRegisteredUserDTO);
  return newRegisteredUser;
}
