import { PropsWithChildren, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";

const Protected = ({ children }: PropsWithChildren) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const refresh = useRefreshToken();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      }
    };

    !auth?.token ? verifyRefreshToken() : null;
    if (!auth) {
      navigate("/");
    }
  }, []);

  return <>{children}</>;
};

export default Protected;
