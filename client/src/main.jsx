import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <SpeedInsights />
    </PersistGate>
  </Provider>
);
