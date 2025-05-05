import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../config/ProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Feedbacks from "../pages/admin/feedbacks/Feedbacks";
import Stations from "../pages/manager/stations/AllStations";
import StationDetails from "../pages/manager/stations/StationDetails";
import Login from "../pages/auth/Login";
import ErrorPage from "../pages/error/ErrorPage";
import AboutUs from "../pages/guest/AboutUs";
import Homepage from "../pages/guest/Homepage";
// import News from "../pages/guest/News";
import Services from "../pages/guest/Services";
import AdminPageLayout from "../pages/layouts/AdminLayout";
import GuestLayout from "../pages/layouts/GuestLayout";
import AllServices from "../pages/admin/services/AllServices";
import Payments from "../pages/admin/payments/Payments";
import ManagerPageLayout from "../pages/layouts/ManagerLayout";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import RequestLists from "../pages/manager/requests/RequestLists";
import RequestDetail from "../pages/manager/requests/RequestDetail";
import RepairServices from "../pages/manager/repair/RepairServices";
import StaffPerformance from "../pages/manager/staffs/StaffPerformance";
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
      // { path: "news", element: <News /> },
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
      // {
      //   path: "staffs",
      //   element: <AllStaffs />,
      // },
      // {
      //   path: "stations",
      //   children: [
      //     {
      //       index: true, element: <Stations />
      //     },
      //     // {
      //     //   path: "map",
      //     //   element: <StationMap />,
      //     // },
      //     {
      //       path: "stationDetails",
      //       element: <StationDetails />,
      //     },
      //   ]
      // },
      {
        path: "services",
        children: [
          {
            index: true,
            element: <AllServices />,
          },
        ],
      },
      {
        path: "feedbacks",
        element: <Feedbacks />,
      },
      {
        path: "payments",
        element: <Payments />,
      },
    ],
  },
  {
    path: "/manager",
    element: (
      <ProtectedRoute requiredRoles={["Manager"]}>
        <ManagerPageLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ManagerDashboard /> },
      {
        path: "staffs",
        element: <StaffPerformance />,
      },
      {
        path: "stations",
        children: [
          {
            index: true,
            element: <Stations />,
          },
          {
            path: "stationDetails",
            element: <StationDetails />,
          },
        ],
      },
      {
        path: "requests",
        element: <RequestLists />,
      },
      {
        path: "requests/detail/:id",
        element: <RequestDetail />,
      },
      {
        path: "repairServices",
        element: <RepairServices />,
      },
    ],
  },
]);
