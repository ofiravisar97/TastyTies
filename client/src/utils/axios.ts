import axios from "axios";

const BASEURL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: BASEURL,
});
axiosInstance.defaults.baseURL = BASEURL;

const axiosPrivate = axios.create({
  baseURL: BASEURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export { axiosPrivate };

export default axiosInstance;
