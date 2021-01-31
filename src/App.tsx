import React from "react";
import "./App.css";
import Content from "./app/routing/Routes";
import ApplicationBar from "./app/components/navbar/AppBar";
import { ApiInterceptorContextProvider } from "./app/context/ApiInterceptorContext";
import { NotificationMessageHandler } from "./app/components/alert/NotificationMessageHandler";
import { UserContextProvider } from "./app/context/UserContext";

export default function App() {
  return (
    <div>
      <main>
        <ApiInterceptorContextProvider>
          <UserContextProvider>
            <ApplicationBar />
            <Content />
            <NotificationMessageHandler />
          </UserContextProvider>
        </ApiInterceptorContextProvider>
      </main>
    </div>
  );
}
