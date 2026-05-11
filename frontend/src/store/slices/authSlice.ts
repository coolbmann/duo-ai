import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "failed";
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = "idle";
    },
    clearCredentials(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
    },
    setStatus(state, action: PayloadAction<AuthState["status"]>) {
      state.status = action.payload;
    },
  },
});

export const { setCredentials, clearCredentials, setStatus } = authSlice.actions;
