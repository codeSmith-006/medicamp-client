import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from "../layout/MainLayout";
// import AuthPage from "../pages/AuthPage/AuthPage";
// import AuthLayout from "../layout/AuthLayout";
import LoginPage from "../pages/AuthPage/LoginPage";
import RegisterPage from "../pages/AuthPage/RegisterPage";
// import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../pages/Dashboard/Dashboard";
import Analytics from "../pages/Dashboard/Analytics";
import Participants from "../pages/Dashboard/Participants";
import Camps from "../pages/Dashboard/Camps";
import Payments from "../pages/Dashboard/Payments";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
        {
            index: true,
            Component: Home
        }

    ]
  },

  // login 
  {
    path: 'join-us',
    Component: LoginPage,
  },

  // sign up
  {
    path: 'register',
    Component: RegisterPage
  },

  // dashboard
  {
    path: 'dashboard',
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: Analytics
      },
      {
        path: 'analytics',
        Component: Analytics
      },
      {
        path: 'participants',
        Component: Participants
      },
      {
        path: 'camps',
        Component: Camps
      },
      {
        path: 'payments',
        Component: Payments
      }
    ]
  }

]);

export default Router;