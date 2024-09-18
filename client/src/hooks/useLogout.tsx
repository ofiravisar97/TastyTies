import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "./useAxiosPrivate";

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const axios = useAxiosPrivate();

  const logout = async () => {
    setAuth(null);
    try {
      await axios.get("/logout", {
        withCredentials: true,
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return logout;
};

export default useLogout;
