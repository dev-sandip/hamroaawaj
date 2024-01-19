import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/assets/styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { GlobalContextProvider } from "./contexts/global-context.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
        <App />
        <Toaster />
      </GlobalContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
