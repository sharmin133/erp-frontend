import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { store } from "./app/store";

import "./index.css";
import router from "./routes/AppRoutes";
import { useMeQuery } from "./features/auth/useAuth";

const queryClient = new QueryClient();

/** Runs the /auth/me bootstrap check once, then renders the router */
function AppBootstrap() {
  useMeQuery();
  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppBootstrap />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);