import { configureStore } from "@reduxjs/toolkit";
import { notificationReducer } from "./app.store.reducer";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});
