import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const user = localStorage.getItem("devuser");
    setIsLoggedIn(!!user); // Set to true if user exists
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("devuser"); // Clear user data from localStorage
    setIsLoggedIn(false); // Update login state
    toast.success('Logged out successfully');
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <nav className="bg-gray-700 text-white p-6 flex justify-around items-center">
        <Link to={'/'}>
        <div className="flex items-center space-x-2 cursor-pointer">
          {/* Logo */}
          <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-gray-900 font-bold">DC</span>
          </div>
          <h1 className="text-3xl font-bold">DevConnect</h1>
        </div>
        </Link>
        {/* Navigation Links */}
        <div className="hidden md:flex text-lg space-x-8">
          <Link to={"/developers"} className="hover:text-gray-400">
            Developers
          </Link>
          <Link to={"/"} className="hover:text-gray-400">
            Projects
          </Link>
          <Link to={"/about"} className="hover:text-gray-400">
            About
          </Link>
          <Link to="/profile" className="hover:text-gray-400">
            My Profile
          </Link>
        </div>

        {/* Conditional Rendering for Login/Logout */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-900"
          >
            Logout
          </button>
        ) : (
          <Link to={"/login"}>
            <button className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-900">
              Login/Sign Up
            </button>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
