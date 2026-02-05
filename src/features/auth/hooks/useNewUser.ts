import { useState } from "react";
import type { RegistrationInput, RegisteredUser } from "../models";
import { createNewUser } from "../api";

export function useNewUser() {
  const [state, setState] = useState<RegisteredUser | null>(null);
  const actions = {
    createNewUser: async (
      newUser: RegistrationInput,
    ): Promise<RegisteredUser> => {
      const newRegisteredUser = await createNewUser(newUser);
      setState(newRegisteredUser);
      return newRegisteredUser;
    },
  };

  return { state, actions };
}
