import React, { use } from "react";
import Loading from "../components/Loading/Loading";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  console.log(location)
  // console.log("Current user: ", currentUser)
  if (loading) {
    return <Loading></Loading>
  }
  if (!user) {
    return <Navigate state={{from: location}} replace to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoutes;
