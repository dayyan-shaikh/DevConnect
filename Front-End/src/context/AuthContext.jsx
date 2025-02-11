import React, { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create Context
const AuthContext = createContext();

// AuthProvider component to provide context to the app
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status from localStorage when the app loads
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("devuser");
    if (token && user) {
      setIsLoggedIn(true);
    }
  }, []);

  // Login function
  const login = async (user, token) => {
    localStorage.setItem("devuser", JSON.stringify(user));
    localStorage.setItem("token", token);
    setIsLoggedIn(true);

    try {
      const response = await fetch("http://localhost:5000/profile/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const profileData = await response.json();
      localStorage.setItem("profileId", profileData._id); // Store profile ID
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // Logout function
  const logout = () => {
    toast.success("Logged Out Successfully", { autoClose: 2000 });
    localStorage.removeItem("devuser");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
