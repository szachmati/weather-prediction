import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistedStore, store} from "./app/store/app.store";
import {PersistGate} from "redux-persist/integration/react";

ReactDOM.render(
  <Provider store={store}>
      <PersistGate persistor={persistedStore} >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
  </Provider>,
  document.getElementById("root")
);
