import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./store/store";
import { Provider } from "react-redux";
import { StateContextProvider } from "./Context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StateContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </StateContextProvider>  
);