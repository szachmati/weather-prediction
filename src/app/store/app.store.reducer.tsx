import { createSlice } from "@reduxjs/toolkit";
import { Severity } from "../components/alert/Info";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    severity: Severity.INFO,
    message: "",
  },
  reducers: {
    handleApiMessage: (state, action) => {
      return {
        ...state,
        severity: action.payload.severity,
        message: action.payload.message,
      };
    },
  },
});

export const notificationReducer = notificationSlice.reducer;
