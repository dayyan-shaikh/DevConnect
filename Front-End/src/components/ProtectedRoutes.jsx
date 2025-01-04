import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  // Retrieve user from localStorage
  const user = JSON.parse(localStorage.getItem("devuser"));

  // Check if the user is authenticated
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
