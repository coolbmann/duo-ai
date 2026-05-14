import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
import { authSlice } from "./slices/authSlice";
import { uiSlice } from "./slices/uiSlice";
import { agentSlice } from "./slices/agentSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    agents: agentSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
