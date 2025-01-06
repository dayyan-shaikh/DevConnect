import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = localStorage.getItem("devuser"); // Get the user data from localStorage

  let parsedUser;
  try {
    parsedUser = user ? JSON.parse(user) : null; // Safely parse user data
  } catch (error) {
    console.error("Error parsing user data:", error);
    parsedUser = null; // Fallback to null in case of error
  }

  return parsedUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
