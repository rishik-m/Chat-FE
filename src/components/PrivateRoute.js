import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("user"); // Check if user.id exists in localStorage
  console.log(localStorage.getItem("user"));
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
