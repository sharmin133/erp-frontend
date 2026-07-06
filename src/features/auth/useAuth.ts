import { useEffect } from "react";
import axios from "axios";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useAppDispatch } from "../../app/hooks";
import { clearUser, setUser } from "./authSlice";
import {
  loginRequest,
  logoutRequest,
  meRequest,
  registerRequest,
} from "./authApi";

export const ME_QUERY_KEY = ["auth", "me"] as const;

export const useMeQuery = () => {
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: meRequest,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (query.isSuccess) {
      dispatch(setUser(query.data));
    } else if (
      query.isError &&
      axios.isAxiosError(query.error) &&
      query.error.response?.status === 401
    ) {
      dispatch(clearUser());
    }
  }, [dispatch, query.data, query.error, query.isError, query.isSuccess]);

  return query;
};

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginRequest,

    onSuccess: (user) => {
      dispatch(setUser(user));
      queryClient.setQueryData(ME_QUERY_KEY, user);
    },
  });
};

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerRequest,

    onSuccess: (user) => {
      dispatch(setUser(user));
      queryClient.setQueryData(ME_QUERY_KEY, user);
    },
  });
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutRequest,

    onSuccess: () => {
      dispatch(clearUser());
      queryClient.removeQueries({ queryKey: ME_QUERY_KEY });
    },
  });
};