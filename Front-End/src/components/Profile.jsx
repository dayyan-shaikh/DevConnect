import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import ProfileSkills from "./ProfileSkills";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const profileId = queryParams.get("user");
  

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      if (!profileId) {
        setError("Profile ID is missing.");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/profile/${profileId}`, // Update this to your endpoint
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setProfile(response.data.profile);
        } else {
          console.error("Failed to fetch profile");
          setError("Failed to fetch profile.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profileId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Profile Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={profile?.profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 mx-auto rounded-full border-4 border-blue-200"
            />
            <Link to="/addprofile">
              <button className="absolute top-[-10px] right-16 transform -translate-x-1/4 bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded-full hover:bg-blue-200">
                ✏️ Edit
              </button>
            </Link>
          </div>

          {/* Name */}
          <h2 className="mt-4 text-lg font-bold">
            {profile?.firstName || "First Name"}{" "}
            {profile?.lastName || "Last Name"}
          </h2>
          {/* Location and Short Intro */}
          <div className="mb-6">
            {/* Short Intro and Location Section */}
            <div className="flex flex-col items-center justify-center">
              {/* Short Intro */}
              <div className="flex items-center mb-4">
                <p className="text-gray-500 font-bold">
                  {profile?.shortIntro || "No short intro provided."}
                </p>
              </div>

              {/* Location */}
              <div className="flex items-center">
                <h6 className="text-lg mr-2">Location:</h6>
                <p className="text-gray-500">
                  {profile?.location || "Location not specified."}
                </p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center mt-4 space-x-4 text-gray-500">
            {profile?.socialGithub && (
              <a href={profile.socialGithub} className="hover:text-blue-500">
                <i className="fab fa-github fa-lg"></i>
              </a>
            )}
            {profile?.socialLinkedin && (
              <a href={profile.socialLinkedin} className="hover:text-blue-500">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
            )}
            {profile?.socialTwitter && (
              <a href={profile.socialTwitter} className="hover:text-blue-500">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
            )}
            {profile?.socialWebsite && (
              <a href={profile.socialWebsite} className="hover:text-blue-500">
                <i className="fas fa-globe fa-lg"></i>
              </a>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-2 bg-white shadow-md rounded-lg p-6 w-[750px]">
          {/* About Me Section */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">About Me</h3>
            <p className="text-gray-500">
              {profile?.about || "No description provided."}
            </p>
          </div>

          {/* Skills Section */}
          <div className="mb-6">
            <ProfileSkills /> {/* This renders your Skills component */}
          </div>

          {/* Projects Section */}
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold mb-2">Projects</h3>
            <Link to="/addproject">
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
  );
};

export default Profile;
