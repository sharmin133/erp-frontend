import { api } from "../../api/axiosInstance";
import type { ApiResponse, LoginPayload, RegisterPayload, User } from "../../types";


export const loginRequest = async (payload: LoginPayload) => {
  const res = await api.post<ApiResponse<{ user: User }>>(
    "/auth/login",
    payload
  );

  return res.data.data.user;
};

export const registerRequest = async (payload: RegisterPayload) => {
  const res = await api.post<ApiResponse<{ user: User }>>(
    "/auth/register",
    payload
  );

  return res.data.data.user;
};

export const logoutRequest = async () => {
  await api.post("/auth/logout");
};

export const meRequest = async () => {
  const res = await api.get<ApiResponse<User>>("/auth/me");

  return res.data.data;
};