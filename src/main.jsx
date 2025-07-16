import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router.jsx";
import Toast from "./Component/Toast.jsx/Toast.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "aos/dist/aos.css";
import AOS from "aos";
import { HelmetProvider } from "react-helmet-async";
AOS.init();

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {" "}
        {/* ✅ Wrap everything inside AuthProvider */}
        <Toast />
        <RouterProvider router={Router} />
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);
