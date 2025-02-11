import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleProfile = () => {
  const { profileId } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token if available

        const headers = { "Content-Type": "application/json" };

        // Only add Authorization header if a token exists
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(
          `http://localhost:5000/profile/profile/${profileId}`,
          {
            method: "GET",
            headers,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const res = await response.json();
        setDetails(res);
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };

    fetchDetails();
  }, [profileId]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Profile Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={details?.profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 mx-auto rounded-full border-4 border-blue-200"
            />
          </div>

          {/* Name */}
          <h2 className="mt-4 text-lg font-bold">
            {details?.profile?.firstName || "First Name"}{" "}
            {details?.profile?.lastName || "Last Name"}
          </h2>

          {/* Short Intro and Location */}
          <div className="mb-6">
            <div className="flex flex-col items-center justify-center">
              {/* Short Intro */}
              <div className="flex items-center mb-4">
                <p className="text-gray-500 font-bold">
                  {details?.profile?.shortIntro || "No short intro provided."}
                </p>
              </div>

              {/* Location */}
              <div className="flex items-center">
                <h6 className="text-lg mr-2">Location:</h6>
                <p className="text-gray-500">
                  {details?.profile?.location || "Location not specified."}
                </p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center mt-4 space-x-4 text-gray-500">
            {details?.profile?.socialGithub && (
              <a
                href={details?.profile?.socialGithub}
                className="hover:text-blue-500"
              >
                <i className="fab fa-github fa-lg"></i>
              </a>
            )}
            {details?.profile?.socialLinkedin && (
              <a
                href={details?.profile?.socialLinkedin}
                className="hover:text-blue-500"
              >
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
            )}
            {details?.profile?.socialTwitter && (
              <a
                href={details?.profile?.socialTwitter}
                className="hover:text-blue-500"
              >
                <i className="fab fa-twitter fa-lg"></i>
              </a>
            )}
            {details?.profile?.socialWebsite && (
              <a
                href={details?.profile?.socialWebsite}
                className="hover:text-blue-500"
              >
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
              {details?.profile?.about || "No description provided."}
            </p>
          </div>

          {/* Skills Section */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Skills</h3>
            {details?.profile?.skills && details?.profile?.skills.length > 0 ? (
              <ul>
                {details.profile.skills.map((skill) => (
                  <li
                    key={skill._id}
                    className="p-2 bg-gray-200 rounded-md mb-2"
                  >
                    <strong>{skill.name}</strong>
                    {skill.description && (
                      <p className="text-sm text-gray-500">
                        {skill.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No skills added.</p>
            )}
          </div>

          {/* Projects Section */}
          <h3 className="text-lg font-bold mb-2">Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {details?.profile?.projects &&
            details?.profile?.projects.length > 0 ? (
              details.profile.projects.map((project) => (
                <div key={project._id} className="project-card bg-gray-100 p-4 rounded-lg shadow-md">
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => handleEditClick(project._id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                  {project.featured_image && (
                    <img src={project.featured_image} alt={project.title} className="mb-4" />
                  )}
                  <p>
                    <strong>Title :</strong> {project.title}
                  </p>
                  <p>
                    <strong>Description :</strong> {project.description}
                  </p>
                  {project.demo_link && (
                    <p className="p-2 bg-gray-200 rounded-md mb-2">
                      <strong>Demo Link: </strong>
                      <a
                        href={project.demo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline break-words"
                      >
                        {project.demo_link}
                      </a>
                    </p>
                  )}
                  {project.source_link && (
                    <p className="p-2 bg-gray-200 rounded-md mb-2">
                      <strong>Source Code: </strong>
                      <a
                        href={project.source_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline break-words"
                      >
                        {project.source_link}
                      </a>
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>No projects uploaded.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProfile;