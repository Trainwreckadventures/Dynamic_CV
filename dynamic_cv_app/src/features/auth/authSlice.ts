import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// defining the AuthState structure for user authentication info here:
interface AuthState {
  // boolean (true or false):
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
    //reducers for log in:
    login: (
      state,
      action: PayloadAction<{ userId: string; role: "admin" | "user" }>
    ) => {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.role = action.payload.role;
    },
    // reducers for log out:
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
