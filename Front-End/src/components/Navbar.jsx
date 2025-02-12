import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [profileId, setProfileId] = useState(null);
  useEffect(() => {
    const storedProfileId = localStorage.getItem("profileId");
    if (storedProfileId) {
      setProfileId(storedProfileId);
    }
  }, [isLoggedIn]);
  return (
    <div>
      <nav className="bg-gray-700 text-white p-6 flex justify-around items-center">
        <Link to={"/"}>
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
          {/* Show My Profile only if user is logged in */}
          {isLoggedIn && (
            <Link to={`/profile/${profileId}`} className="hover:text-gray-400">
              My Profile
            </Link>
          )}
        </div>

        {/* Conditional Rendering for Login/Logout */}
        {isLoggedIn ? (
          <button
            onClick={logout}
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
