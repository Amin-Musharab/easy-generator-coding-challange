import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "./constants";

const baseURL = BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token: string) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  localStorage.setItem("token", token);
};

export const clearAuthToken = () => {
  delete axiosInstance.defaults.headers.common["Authorization"];
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};

export default axiosInstance;
