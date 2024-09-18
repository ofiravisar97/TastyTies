import { PropsWithChildren, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";

const Protected = ({ children }: PropsWithChildren) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const refresh = useRefreshToken();

  useEffect(() => {
    const verifyRefreshToken = () => {
      refresh()
        .catch((token) => {
          if (!token) {
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          navigate("/login");
        });
    };

    !auth?.token ? verifyRefreshToken() : null;
  }, [auth]);

  return <>{children}</>;
};

export default Protected;
