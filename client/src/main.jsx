import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SecretKeyProvider } from "./contexts/KeyContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <SecretKeyProvider>
    <App />
  </SecretKeyProvider>
);
