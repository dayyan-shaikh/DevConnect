import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

const Developers = () => {
  const [profiles, setProfiles] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    // Fetch profiles from API
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/profile/profiles"
        );
        console.log(response.data);
        setProfiles(response.data.profiles); // Assuming response.data is an array of profiles
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

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
            placeholder="Search by Project Title"
            className="w-full p-3 border border-gray-300 focus:outline-none rounded-md"
          />
          <button className="bg-gray-800 text-lg w-44 text-white px-6 rounded-md hover:bg-gray-900">
            Search
          </button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-10 w-full max-w-screen-lg mx-auto">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="p-4 bg-white shadow-md rounded-lg cursor-pointer hover:shadow-lg transition flex items-center justify-center"
            // onClick={() => handleCardClick(profile.id)}
          > 
            <h2 className="mt-4 text-lg font-bold">
              {profile?.firstName || "First Name"}{" "}
              {profile?.lastName || "Last Name"}
            </h2>
            <p className="text-gray-600">{profile?.shortIntro}</p>
            <p className="text-gray-500">{profile?.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Developers;
