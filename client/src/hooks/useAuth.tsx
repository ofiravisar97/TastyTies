import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { AuthContextType } from "../types/auth";

const useAuth = () => {
  return useContext(AuthContext) as AuthContextType;
};

export default useAuth;
