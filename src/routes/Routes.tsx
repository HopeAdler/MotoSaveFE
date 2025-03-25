import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "../layout/GuestLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
    ],
  },
]);
