import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { QRProvider } from "./context/QRContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QRProvider>
        <App />
      </QRProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
