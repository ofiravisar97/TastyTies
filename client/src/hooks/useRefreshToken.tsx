import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const refresh = async () => {
    try {
      const response = await axiosInstance.get("/refresh", {
        withCredentials: true,
      });

      const { displayName, avatarUrl, accessToken, userId } = response.data;

      setAuth({
        token: accessToken,
        displayName,
        userId,
        avatar: avatarUrl,
      });
      return accessToken;
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  return refresh;
};

export default useRefreshToken;
