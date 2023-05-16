import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { Env } from "../constants";
import { getAuthTokenFromLS } from ".";
import { Alert } from "./Alert";
// import { Alarm } from "";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 100000,
  headers: {
    "X-AUTH-TOKEN": getAuthTokenFromLS() || "",
    authorization: import.meta.env.VITE_AUTHORIZATION_KEY,
  },
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const user = getAuthTokenFromLS();
    if (user) {
      config.headers["X-AUTH-TOKEN"] = `${user}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (config: any) => {
    return config;
  },
  (error) => {
    if (
      error.response.message === "invalid signature" ||
      error.response.status === 401 ||
      error.response.status === 440
    ) {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("phone");
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("permissions");
      sessionStorage.removeItem("userName");
      window.location.href = "/";
      // }, 1000);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
