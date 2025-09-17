import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HomeEngineProvider } from "./context/HomeEngineContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HomeEngineProvider>
      <App />
    </HomeEngineProvider>
  </StrictMode>
);
