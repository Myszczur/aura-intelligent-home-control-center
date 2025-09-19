import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HomeEngineProvider } from "./context/HomeEngineContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HomeEngineProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HomeEngineProvider>
  </StrictMode>
);
