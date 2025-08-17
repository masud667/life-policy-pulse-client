import axios from 'axios';
axios.defaults.withCredentials = true;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import mainRoute from "./Routes/MainRoute.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={mainRoute}></RouterProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
