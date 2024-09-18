import { toast } from "react-toastify";
import { RegisterSchemaType } from "../types/RegisterSchema";
import axiosInstance from "../utils/axios";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const navigate = useNavigate();

  const register = async (data: RegisterSchemaType) => {
    try {
      const { email, password, confirm, name } = data;

      if (!z.string().email().safeParse(email).success) {
        toast.error("Invalid email");
        return;
      }

      if (name === "") {
        toast.error("Name required");
        return;
      }

      if (password !== confirm) {
        toast.error("Passwords dosent match");
        return;
      }

      await axiosInstance.post("/register", {
        displayName: name,
        email,
        password,
      });

      toast.success("User registered.");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return register;
};

export default useRegister;
