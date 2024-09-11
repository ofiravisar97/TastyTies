import { PropsWithChildren, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }: PropsWithChildren) => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth]);

  return <div>{children}</div>;
};

export default Protected;
