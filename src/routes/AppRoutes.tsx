import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "../components/layout/RootLayout";
import HomePage from "../features/home/HomePage";


 import LoginPage from "../features/auth/LoginPage";
 import SignupPage from "../features/auth/SignupPage";
import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardPage from "../features/dashboard/DashboardPage";
import ProductsPage from "../features/products/ProductsPage";
import { ProtectedRoute } from "../components/common/ProtectedRoute";
import CreateSalePage from "../features/sales/CreateSalePage";



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
       { path: "login", element: <LoginPage /> },
      { path: "register", element: <SignupPage /> },
    ],
  },

 {
  path: "/dashboard",
  element: <ProtectedRoute />,
  children: [
    {
      element: <DashboardLayout />,
      children: [
        { index: true, element: <DashboardPage /> },

        {
          path: "products",
          element: <ProductsPage />,
        },
         {
          path: "sales/create",
          element: <CreateSalePage />,
        },
      ],
    },
  ],
},
  { path: "*", element: <Navigate to="/" replace /> },
]);

export default router;