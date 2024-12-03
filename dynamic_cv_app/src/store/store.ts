//need to update the logic as I go:
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
