import React from "react";
import "./App.css";
import Content from "./app/components/Routes";
import ApplicationBar from "./app/components/AppBar";

export default function App() {
  return (
    <div>
      <main>
        <ApplicationBar />
        <Content />
      </main>
    </div>
  );
}
