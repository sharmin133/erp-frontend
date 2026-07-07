import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { store } from "./app/store";
import { useMeQuery } from "./features/auth/useAuth";
import "./index.css";
import router from "./routes/AppRoutes";

const queryClient = new QueryClient();

function AppBootstrap() {
  useMeQuery();
  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppBootstrap />

        <ToastContainer
          position="top-right"
          autoClose={2500}
          theme="light"
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
        />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);