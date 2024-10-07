import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./redux/store";
import App from "./App";
import "./css/AppSignUp.css";
import "./css/All_AppSignIn.css";
import "./css/MainPage.css";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
