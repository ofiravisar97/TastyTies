import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import useAuthStore from "../store/auth";

export default axios.create({
  baseURL: "http://10.0.0.11:8000",
});

export const privateAxios = axios.create({
  baseURL: "http://10.0.0.11:8000",
});

// Request interceptor to add access token to headers
privateAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().accessToken;
    console.log(accessToken);
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);
