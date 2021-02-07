import { createSlice } from "@reduxjs/toolkit";
import { Severity } from "../components/alert/Info";
import { uuid } from "uuidv4";

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

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    initUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logout: (state) => {
      state = null;
      return { ...state };
    },
  },
});

export const accessTokenSlice = createSlice({
  name: "access_token",
  initialState: {},
  reducers: {
    addAccessToken: (state, action) => {
      return { ...state, access_token: action.payload.access_token };
    },
    removeAccessToken: (state) => {
      state = null;
      return { ...state };
    },
  },
});

export const blockedNotificationSlice = createSlice({
  name: "blockedNotification",
  initialState: {
    wasShown: false,
    uuid: null,
  },
  reducers: {
    blockNotification: (state) => {
      return {
        ...state,
        wasShown: true,
        uuid: uuid(),
      };
    },
  },
});

export const notificationReducer = notificationSlice.reducer;
export const userReducer = userSlice.reducer;
export const accessTokenReducer = accessTokenSlice.reducer;
export const blockedNotificationReducer = blockedNotificationSlice.reducer;
