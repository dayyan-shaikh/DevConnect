import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Login from "./Login";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoutes = () => {
  // Get the user and token from localStorage
  const user = localStorage.getItem("devuser");
  const token = localStorage.getItem("token");

  let isAuthenticated = false;

  try {
    // Validate user and token
    isAuthenticated = user && token && JSON.parse(user);
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  if (!isAuthenticated) {
    // Show a toast notification if the user is not authenticated
    toast.error("You must log in to access this page!", {
      toastId: "protected-route-error",
      autoClose: 2000,
    });

    // Redirect to the login page
    return <Navigate to="/login" />;
  }

  // Render the child components if the user is authenticated
  return <Outlet />;
};

export default ProtectedRoutes;
