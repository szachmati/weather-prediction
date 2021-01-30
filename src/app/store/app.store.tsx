import { configureStore } from "@reduxjs/toolkit";
import { notificationReducer, userReducer } from "./app.store.reducer";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
  },
});
