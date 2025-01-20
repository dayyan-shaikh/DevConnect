import React from "react";
import { Link } from "react-router-dom";
import ProfileSkills from "./ProfileSkills";

const Profile = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-4">
        {/* Profile Container */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            {/* Profile Image */}
            <div className="relative">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="w-32 h-32 mx-auto rounded-full border-4 border-blue-200"
              />
              <Link to={"/addprofile"}>
                <button className="absolute top-[-10px] right-16 transform -translate-x-1/4 bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded-full hover:bg-blue-200">
                  ✏️ Edit
                </button>
              </Link>
            </div>
            {/* User Info */}
            {/* <h2 className="text-xl font-bold mt-4">Dayyan Shaikh</h2>
            <p className="text-gray-500">Web Developer</p> */}
            {/* Social Links */}
            <div className="flex justify-center mt-4 space-x-4 text-gray-500">
              <a href="#" className="hover:text-blue-500">
                <i className="fab fa-github fa-lg"></i>
              </a>
              <a href="#" className="hover:text-blue-500">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
              <a href="#" className="hover:text-blue-500">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="hover:text-blue-500">
                <i className="fas fa-globe fa-lg"></i>
              </a>
            </div>
            {/* Deactivate Account */}
            {/* <button className="bg-red-100 text-red-600 px-4 py-2 rounded mt-6 hover:bg-red-200">
              🚫 Deactivate Account
            </button> */}
          </div>

          {/* Right Section */}
          <div className="col-span-2 bg-white shadow-md rounded-lg p-6 w-[750px]">
            {/* About Me Section */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">About Me</h3>
              <p className="text-gray-500">No description</p>
            </div>

            {/* Skills Section */}
            <div className="profile-container">
              {/* Other profile sections */}
              <ProfileSkills />
            </div>
            
            {/* Projects Section */}
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold mb-2">Projects</h3>
              <Link to={"/addproject"}>
                <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-200">
                  + Add Project
                </button>
              </Link>
            </div>
            <p className="text-gray-500">
              You have not uploaded any projects yet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
