import { createContext, PropsWithChildren, useState } from "react";
import { AuthContextType } from "../types/auth";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState<AuthContextType>();
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
