import React from "react";
import "./App.css";
import Content from "./app/routing/Routes";
import ApplicationBar from "./app/components/navbar/AppBar";
import { ApiInterceptorContextProvider } from "./app/context/ApiInterceptorContext";
import { NotificationMessageHandler } from "./app/components/NotificationMessageHandler";

export default function App() {
  return (
    <div>
      <main>
        <ApiInterceptorContextProvider>
          <ApplicationBar />
          <Content />
          <NotificationMessageHandler />
        </ApiInterceptorContextProvider>
      </main>
    </div>
  );
}
