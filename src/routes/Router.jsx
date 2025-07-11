import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from "../layout/MainLayout";
// import AuthPage from "../pages/AuthPage/AuthPage";
// import AuthLayout from "../layout/AuthLayout";
import LoginPage from "../pages/AuthPage/LoginPage";
import RegisterPage from "../pages/AuthPage/RegisterPage";
// import Dashboard from "../pages/Dashboard/Dashboard";
// import DashboardLayout from "../pages/Dashboard/Dashboard";
import Analytics from "../pages/Dashboard/Analytics";
import Participants from "../pages/Dashboard/Participants";
import Camps from "../pages/Dashboard/Camps";
import Payments from "../pages/Dashboard/Payments";
import Layout from "../pages/Dashboard/Dashboard";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import Participant from "../pages/Dashboard/Participants";
import Organizer from "../pages/Dashboard/Organizer";
import RoleBasedRoute from "./roleBasedRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "available-camps",
        Component: AvailableCamps,
      },
    ],
  },

  // login
  {
    path: "join-us",
    Component: LoginPage,
  },

  // sign up
  {
    path: "register",
    Component: RegisterPage,
  },

  // dashboard
  {
    path: "dashboard",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Analytics,
      },

      // analytics for users role
      {
        element: <RoleBasedRoute allowedRoles={["user"]} />,
        children: [
          {
            path: "participants/analytics",
            Component: Analytics,
          },
        ],
      },

      // profile for participants
      {
        element: <RoleBasedRoute allowedRoles={["user"]} />,
        children: [
          {
            path: "participants/profile",
            Component: Participant,
          },
        ],
      },

      // profile for organizer
      {
        element: <RoleBasedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "organizer/profile",
            Component: Organizer,
          },
        ],
      },

      {
        path: "camps",
        Component: Camps,
      },
      {
        path: "payments",
        Component: Payments,
      },
    ],
  },
]);

export default Router;
