import { api } from "../../api/axiosInstance";
import type { ApiResponse, User } from "../../types";

export const fetchUsers = async () => {
  const res = await api.get<ApiResponse<User[]>>("/users");
  return res.data.data;
};

export const updateUserRole = async (id: string, role: string) => {
  const res = await api.patch<ApiResponse<User>>(`/users/${id}/role`, { role });
  return res.data.data;
};