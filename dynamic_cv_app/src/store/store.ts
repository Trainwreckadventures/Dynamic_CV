import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { api } from "../services/api"; // RTK Query
import { devToolsEnhancer } from "@redux-devtools/extension";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer, // RTK Query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // Add RTK Query middleware
  devTools: process.env.NODE_ENV !== "production" ? devToolsEnhancer() : false, // DevTools
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
