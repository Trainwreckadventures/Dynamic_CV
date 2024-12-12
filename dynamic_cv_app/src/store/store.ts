import { configureStore } from "@reduxjs/toolkit";
// Reducer for auth state here:
import authReducer from "../features/auth/authSlice";
import { api } from "../services/api";

export const store = configureStore({
  reducer: {
    // Auth slice handles auth-related state here:
    auth: authReducer,
    //RTK Query here:
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    //Middleware for RTK Query here:
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
