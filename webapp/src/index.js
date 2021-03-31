import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { SessionProvider } from "@inrupt/solid-ui-react";
import store from "./redux/store";
import { Provider } from "react-redux";


ReactDOM.render(
  <React.StrictMode>
    <SessionProvider sessionId="logged-user">
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    </SessionProvider>

  </React.StrictMode >,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
