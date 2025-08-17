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
import DashBoardWelcome from "../pages/Dashboard/DashboardWelcome";
import RoleBasedRoute from "./roleBasedRoute";
import AddCamps from "../pages/Dashboard/AddCamp";
import AddCamp from "../pages/Dashboard/AddCamp";
import ManageCamps from "../pages/Dashboard/ManageCamps";
import PrivateRoutes from "../routes/PrivateRoutes";
import CampDetails from "../pages/AvailableCamps/CampDetails";
import ManageRegisteredParticipants from "../pages/Dashboard/ManageRegisteredParticiapnts";
import PaymentSuccess from "../pages/Dashboard/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/paymentCancelled";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import About from "../pages/About/About";
import AdminAnalytics from "../pages/Dashboard/AdminAnalytics";

const Router = createBrowserRouter([
  {
    path: "*",
    Component: ErrorPage,
  },
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "available-camps",
        children: [
          {
            index: true,
            Component: AvailableCamps,
          },
          {
            path: "camps/:id",
            element: (
              <PrivateRoutes>
                <CampDetails></CampDetails>
              </PrivateRoutes>
            ),
          },
        ],
      },
      {
        path: "/payment-success",
        element: (
          <PrivateRoutes>
            <PaymentSuccess></PaymentSuccess>
          </PrivateRoutes>
        ),
      },
      {
        path: "payment-cancelled",
        element: (
          <PrivateRoutes>
            <PaymentCancelled></PaymentCancelled>
          </PrivateRoutes>
        ),
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
        Component: DashBoardWelcome,
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

      // profile for user role
      {
        element: <RoleBasedRoute allowedRoles={["user"]} />,
        children: [
          {
            path: "participants/profile",
            Component: Participant,
          },
        ],
      },

      // profile for admin role
      {
        element: <RoleBasedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "organizer/profile",
            Component: Organizer,
          },
        ],
      },

      // camps for for user role
      {
        element: <RoleBasedRoute allowedRoles={["user"]} />,
        children: [
          {
            path: "participants/camps",
            Component: Camps,
          },
        ],
      },

      // payments for for user role
      {
        element: <RoleBasedRoute allowedRoles={["user"]} />,
        children: [
          {
            path: "participants/payments",
            Component: Payments,
          },
        ],
      },

      // add camp for admin
      {
        element: <RoleBasedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "/dashboard/organizer/add-camp",
            Component: AddCamp,
          },
        ],
      },

      // analytics for admin
      {
        element: <RoleBasedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "/dashboard/organizer/analytics",
            Component: AdminAnalytics,
          },
        ],
      },

      // manage camp for admin
      {
        element: <RoleBasedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "/dashboard/organizer/manage-camps",
            Component: ManageCamps,
          },
        ],
      },

      // manage registered participants for admin
      {
        element: <RoleBasedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "/dashboard/organizer/registered-camps",
            Component: ManageRegisteredParticipants,
          },
        ],
      },
    ],
  },
]);

export default Router;
