import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Developers = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [profilesPerPage] = useState(12);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch profiles from API
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/profile/profiles"
        );
        if (Array.isArray(response.data.profiles)) {
          setProfiles(response.data.profiles);
        } else {
          console.error(
            "Expected an array under response.data.profiles, got:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);
  // console.log(profiles);
  // profiles.forEach(profile => console.log(profile._id));

  // 🔍 Filter profiles based on search query
  const filteredProfiles = profiles.filter((profile) =>
    `${profile.firstName} ${profile.lastName} ${profile.shortIntro} ${profile.location}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = filteredProfiles.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  );

  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* 🔍 Search Section */}
      <div className="bg-gray-700 py-16 flex flex-col items-center">
        <h2 className="text-4xl text-white">
          CONNECT WITH{" "}
          <span className="text-4xl font-bold text-white">DEVELOPERS</span>
          <br />
          <span className="ml-3">FROM AROUND THE WORLD</span>
        </h2>
        <div className="flex w-full max-w-xl gap-2 mt-8">
          <input
            type="text"
            placeholder="Search by name, intro, or location..."
            className="w-full p-3 border border-gray-300 focus:outline-none rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 👤 Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 w-full mt-16 max-w-screen-lg mx-auto">
        {currentProfiles.length > 0 ? (
          currentProfiles.map((profile) => (
            <div
              key={profile._id}
              className="p-6 bg-gray-50 shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition flex items-center justify-center w-80 h-80"
            >
              <div className="flex flex-col items-center justify-center">
                <img
                  className="w-32 h-32 mb-4 rounded-full shadow-lg"
                  src="/docs/images/people/profile-picture-3.jpg"
                  alt="Profile"
                />
                <h2 className="mt-4 text-xl font-bold">
                  {profile?.firstName || "First Name"}{" "}
                  {profile?.lastName || "Last Name"}
                </h2>
                <p className="text-gray-600 text-center">
                  {profile?.shortIntro}
                </p>
                <p className="text-gray-500">{profile?.location}</p>
                  <button onClick={() => navigate(`/single-profile/${profile._id}`)} className="w-40 bg-gray-700 text-white py-3 rounded-sm mt-5">View Profile</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No profiles found...</p>
        )}
      </div>

      {/* 📍 Pagination Section */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 ${
                currentPage === index + 1 ? "bg-gray-600" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Developers;
