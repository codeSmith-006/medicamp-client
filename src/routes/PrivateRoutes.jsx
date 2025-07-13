import React, { use } from "react";
// import Loading from "../components/Loading/Loading";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import LoadingSpinner from "../Component/LoadingSpinner/LoadingSpinner";
import useCurrentUser from "../Hooks/useController";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const { isLoading } = useCurrentUser();
  const location = useLocation();
  console.log(location)
  // console.log("Current user: ", currentUser)
  if (loading || isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }
  if (!user) {
    return <Navigate state={{from: location}} replace to="/join-us"></Navigate>;
  }
  return children;
};

export default PrivateRoutes;
