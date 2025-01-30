import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoutes = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initially null for loading state

  useEffect(() => {
    const user = localStorage.getItem("devuser");
    const token = localStorage.getItem("token");

    if (user && token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    if (!token) {
      toast.error("Please Login to Access MyProfile", { autoClose: 2000 });
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Optionally show loading state
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return <>{children}</>; // Render children (protected routes) if authenticated
};

export default ProtectedRoutes;
