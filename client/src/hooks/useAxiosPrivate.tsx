import { useLayoutEffect } from "react";
import useAuth from "./useAuth";
import { axiosPrivate } from "../utils/axios";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useLayoutEffect(() => {
    const authIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.token}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(authIntercept);
    };
  }, [auth, refresh]);

  useLayoutEffect(() => {
    const refreshIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 403 && !originalRequest?.sent) {
          originalRequest.sent = true;
          const newToken = await refresh();
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosPrivate(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(refreshIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
