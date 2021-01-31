import { notificationSlice, userSlice } from "./app.store.reducer";

export const { showNotification, hideNotification } = notificationSlice.actions;
export const { initUser, logout } = userSlice.actions;
