import axios from "axios";
import { store } from "../app/store";
import { clearUser } from "../features/auth/authSlice";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(clearUser());
    }
    return Promise.reject(error);
  }
);