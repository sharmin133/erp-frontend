import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types";

interface AuthState {
  user: User | null;
  isCheckingAuth: boolean;
}

const initialState: AuthState = {
  user: null,
  isCheckingAuth: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isCheckingAuth = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isCheckingAuth = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;