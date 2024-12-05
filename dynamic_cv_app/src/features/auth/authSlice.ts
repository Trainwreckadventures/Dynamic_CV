import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  role: "admin" | "user" | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ userId: string; role: "admin" | "user" }>
    ) => {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
