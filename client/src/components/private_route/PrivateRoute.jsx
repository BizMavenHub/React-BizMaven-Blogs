import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Navigate to="/blogs" /> : <Navigate to="/login" />;
};

export default PrivateRoute;
