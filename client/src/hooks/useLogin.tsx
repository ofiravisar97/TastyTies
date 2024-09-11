import { LoginSchema, LoginType } from "../types/LoginSchema";
import axiosInstance from "../utils/axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const login = async (data: LoginType) => {
    try {
      await LoginSchema.parse(data);

      const email = data.email.toString();
      const password = data.password.toString();

      const response = await axiosInstance.post(
        "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (!response.data) {
        throw new Error("Something bad happend");
      }

      const { accessToken, displayName, userId, avatarUrl } = response.data;

      setAuth({
        token: accessToken,
        displayName,
        userId,
        avatar: avatarUrl,
      });

      if (accessToken) {
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { login };
};

export default useLogin;
