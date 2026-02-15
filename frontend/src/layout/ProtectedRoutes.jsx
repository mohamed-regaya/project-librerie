import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

function ProtectedRoutes({ allowedRoles, children }) {
  const { user } = useSelector((state) => state.auth);
  //  const  user  = useSelector((state) => state.auth.user);
  if (!user) {
    return <Navigate to={"/"} />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={"/unauthorized"} />;
  }
  return children;
}

export default ProtectedRoutes;
