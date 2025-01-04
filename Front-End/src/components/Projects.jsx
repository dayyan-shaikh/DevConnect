import React from "react";
import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Search Section */}
      <div className="bg-gray-200 py-16 flex flex-col items-center">
        <h2 className="text-4xl text-gray-900">
          SEARCH FOR <span className="text-4xl font-bold text-black">PROJECTS</span>
        </h2>
        <div className="flex w-full max-w-xl gap-2 mt-8">
          <input
            type="text"
            placeholder="Search by Project Title"
            className="w-full p-3 border border-gray-300 focus:outline-none rounded-md"
          />
          <button className="bg-gray-700 text-lg w-44 text-white px-6 rounded-md hover:bg-gray-700">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
