import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../Component/LoadingSpinner/LoadingSpinner";
import useCurrentUser from "../Hooks/useController";

const RoleBasedRoute = ({ allowedRoles = [] }) => {
  const { currentUser, isLoading } = useCurrentUser();
  // console.log("Role: ", allowedRoles);
  // console.log("Current users role: ", currentUser?.role)
  // console.log("Permission: ", allowedRoles.includes(currentUser?.role))

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // If no user or role not allowed, redirect to login or unauthorized page
  if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/join-us" replace />;
  }

  // User has required role → render nested routes/components
  return <Outlet />;
};

export default RoleBasedRoute;
