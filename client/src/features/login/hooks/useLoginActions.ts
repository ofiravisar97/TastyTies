import { FieldValues } from "react-hook-form";

const useLoginActions = () => {
  const handleLogin = async (data: FieldValues) => {
    console.log(data)
  };
  return handleLogin;
};

export default useLoginActions;
