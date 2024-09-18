import { Dispatch, SetStateAction } from "react";

export type AuthType = {
  token: string;
  userId: string;
  avatar: string;
  displayName: string;
};

export type AuthContextType = {
  auth: AuthType;
  setAuth: Dispatch<SetStateAction<AuthType | null>>;
};
