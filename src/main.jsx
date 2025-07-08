import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router.jsx";
import Toast from "./Component/Toast.jsx/Toast.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    {" "}
    {/* ✅ Wrap everything inside AuthProvider */}
    <Toast />
    <RouterProvider router={Router} />
  </AuthProvider>
);
