import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  toastMessage: string | null;
}

const initialState: UiState = {
  toastMessage: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showToast(state, action: PayloadAction<string>) {
      state.toastMessage = action.payload;
    },
    clearToast(state) {
      state.toastMessage = null;
    },
  },
});

export const { showToast, clearToast } = uiSlice.actions;
