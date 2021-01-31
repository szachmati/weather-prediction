import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { notificationReducer, userReducer } from "./app.store.reducer";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  blackList: ["notification"], // doesnt keep notificationReducer in Local Storage
  storage,
};

export const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    notification: notificationReducer,
    user: userReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
