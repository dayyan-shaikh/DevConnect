import React, { createContext, useState, useContext } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create Context
const AuthContext = createContext();

// AuthProvider component to provide context to the app
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status from localStorage when the app loads
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('devuser');
    if (token && user) {
      setIsLoggedIn(true);
    }
  }, []);

  // Login function
  const login = (user, token) => {
    localStorage.setItem('devuser', JSON.stringify(user));
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  // Logout function
  const logout = () => {
    toast.success('Logged Out Successfully',{autoClose: 2000})
    localStorage.removeItem('devuser');
    localStorage.removeItem('token');
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
