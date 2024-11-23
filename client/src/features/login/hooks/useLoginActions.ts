import { FieldValues } from "react-hook-form";
import axios from "@/api/axios";
const useLoginActions = () => {
  const handleLogin = async (data: FieldValues) => {
    const { email, password } = data;
    await axios.get("/login", {
      params: {
        email,
        password,
      },
    });
  };
  return handleLogin;
};

export default useLoginActions;
