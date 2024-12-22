import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { TOKEN } from "./token";

export const baseURL = "https://gas-station.aralhub.uz/api/v1/";
export const baseURLPostman = "https://api.metan.iztileuoff.uz/api/v1/mobile/";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const axiosInstance = axios.create({ baseURL: baseURL });
export const axiosInstancePostman = axios.create( {baseURL: baseURLPostman})

axiosInstance.interceptors.request.use((config) => {
  const token = TOKEN.getAccessToken();
  config.headers["Authorization"] = token ? `Bearer ${token}` : "";
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    if (originalRequest.url?.includes("user/auth/details/")) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401) {
      originalRequest._retry = true;
      try {
        const refreshAxios = axios.create({ baseURL });
        const newToken = await refreshAxios.post<{
          message: string;
          data: { access: string };
        }>("user/auth/token/", {
          refresh: TOKEN.getRefreshToken(),
        });
        TOKEN.setAccessToken(newToken.data.data.access);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${newToken.data.data.access}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        TOKEN.removeAccessToken();
        return Promise.reject(refreshError);
      }
    }
  }
);
