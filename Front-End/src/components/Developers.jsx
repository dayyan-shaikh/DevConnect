import React, { useEffect, useState } from "react";
import axios from "axios";

const Developers = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [profilesPerPage] = useState(12);

  useEffect(() => {
    // Fetch profiles from API
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/profile/profiles"
        );
        // console.log("API Response:", response.data); // Log response to inspect data
        if (Array.isArray(response.data.profiles)) {
          setProfiles(response.data.profiles); // Access profiles inside response.data
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

  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = Array.isArray(profiles)
    ? profiles.slice(indexOfFirstProfile, indexOfLastProfile)
    : []; // Ensure profiles is an array before using .slice()

  // Calculate total pages, ensure it's a valid number
  const totalProfiles = Array.isArray(profiles) ? profiles.length : 0;
  const totalPages =
    totalProfiles > 0 ? Math.ceil(totalProfiles / profilesPerPage) : 0;

  // Guard against invalid totalPages
  if (totalPages === 0) {
    return <div>No profiles available</div>;
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Search Section */}
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
            placeholder="Search Profile"
            className="w-full p-3 border border-gray-300 focus:outline-none rounded-md"
          />
          <button className="bg-gray-800 text-lg w-44 text-white px-6 rounded-md hover:bg-gray-900">
            Search
          </button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full mt-16 max-w-screen-lg mx-auto">
        {currentProfiles.map((profile) => (
          <div
            key={profile.id}
            className="p-4 bg-gray-50 shadow-lg rounded-lg cursor-pointer hover:shadow-lg transition flex items-center justify-center"
          >
            <div className="text-center">
            <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="image"/>
              <h2 className="mt-4 text-lg font-bold">
                {profile?.firstName || "First Name"}{" "}
                {profile?.lastName || "Last Name"}
              </h2>
              <p className="text-gray-600">{profile?.shortIntro}</p>
              <p className="text-gray-500">{profile?.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
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
    </div>
  );
};

export default Developers;
