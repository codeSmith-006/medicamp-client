import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
]);

export default Router;