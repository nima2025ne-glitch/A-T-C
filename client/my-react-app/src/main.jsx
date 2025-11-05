import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom"; // 👈 اینو اضافه کن

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>  {/* 👈 اینو هم اضافه کن */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);