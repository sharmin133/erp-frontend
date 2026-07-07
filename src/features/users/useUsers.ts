import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, updateUserRole } from "./userApi";

export const USERS_QUERY_KEY = "users" as const;

export const useUsers = () =>
  useQuery({ queryKey: [USERS_QUERY_KEY], queryFn: fetchUsers });

export const useUpdateUserRole = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) => updateUserRole(id, role),
    onSuccess: () => qc.invalidateQueries({ queryKey: [USERS_QUERY_KEY] }),
  });
};