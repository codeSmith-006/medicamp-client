import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from "../layout/MainLayout";
// import AuthPage from "../pages/AuthPage/AuthPage";
// import AuthLayout from "../layout/AuthLayout";
import LoginPage from "../pages/AuthPage/LoginPage";
import RegisterPage from "../pages/AuthPage/RegisterPage";

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
  }

]);

export default Router;