import { createSlice } from "@reduxjs/toolkit";
import { Severity } from "../components/alert/Info";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    severity: Severity.INFO,
    message: "",
    show: false,
  },
  reducers: {
    showNotification: (state, action) => {
      return {
        ...state,
        severity: action.payload.severity,
        message: action.payload.message,
        show: true,
      };
    },
    hideNotification: (state) => {
      return { ...state, message: "", show: false };
    },
  },
});

export const notificationReducer = notificationSlice.reducer;
