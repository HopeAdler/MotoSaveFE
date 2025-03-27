import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../config/ProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Feedbacks from "../pages/admin/feedbacks/Feedbacks";
import AllStaffs from "../pages/admin/staffs/AllStaffs";
import Stations from "../pages/admin/stations/AllStations";
import StationDetails from "../pages/admin/stations/StationDetails";
import Login from "../pages/auth/Login";
import ErrorPage from "../pages/error/ErrorPage";
import AboutUs from "../pages/guest/AboutUs";
import Homepage from "../pages/guest/Homepage";
import News from "../pages/guest/News";
import Services from "../pages/guest/Services";
import AdminPageLayout from "../pages/layouts/AdminLayout";
import GuestLayout from "../pages/layouts/GuestLayout";
// import StationMap from "../pages/admin/stations/StationMap";

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
      { path: "news", element: <News /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "services", element: <Services /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRoles={["Admin"]}>
        <AdminPageLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AdminDashboard /> },
      {
        path: "staffs",
        element: <AllStaffs />,
      },
      {
        path: "stations",
        children: [
          {
            index: true, element: <Stations />
          },
          // {
          //   path: "map",
          //   element: <StationMap />,
          // },
          {
            path: "stationDetails",
            element: <StationDetails />,
          },
        ]
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "feedbacks",
        element: <Feedbacks />,
      },
    ],
  },
]);
