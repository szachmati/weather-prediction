import React from "react";
import "./App.css";
import Content from "./app/components/Routes";
import ApplicationBar from "./app/components/AppBar";
import { ApiInterceptorContextProvider } from "./app/context/ApiInterceptorContext";

export default function App() {
  return (
    <div>
      <main>
        <ApplicationBar />
        <Content />
        <ApiInterceptorContextProvider />
      </main>
    </div>
  );
}
