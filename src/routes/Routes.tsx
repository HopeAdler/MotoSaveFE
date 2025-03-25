import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import ErrorPage from "../pages/error/ErrorPage";
import AboutUs from "../pages/guest/AboutUs";
import Homepage from "../pages/guest/Homepage";
import GuestLayout from "../pages/layouts/GuestLayout";
import AdminPageLayout from "../pages/layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      // { path: "programs", element: <Programs /> },
      { path: "about-us", element: <AboutUs /> },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminPageLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AdminDashboard /> },
      // {
      //   path: "dashboard",
      //   element: <AdminDashboard />,
      // },
    ],
  },
]);
