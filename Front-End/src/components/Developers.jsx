import React from "react";
import { Link } from "react-router-dom";

const Developers = () => {
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
      <div className="bg-gray-100 py-16 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto cursor-pointer">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
            <img
              src="https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg"
              alt="John Doe"
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">John Doe</h3>
              <p className="text-gray-600">
                Frontend Developer | React.js Enthusiast
              </p>
              <p className="text-gray-600">
                Frontend Developer | React.js Enthusiast
              </p>
              <p className="text-gray-600">
                Frontend Developer | React.js Enthusiast
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
            <img
              src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
              alt="Jane Smith"
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Jane Smith</h3>
              <p className="text-gray-600">
                Full Stack Developer | MERN Stack Specialist
              </p>
              <p className="text-gray-600">
                Full Stack Developer | MERN Stack Specialist
              </p>
              <p className="text-gray-600">
                Full Stack Developer | MERN Stack Specialist
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white shadow-md rounded-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
            <img
              src="https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg"
              alt="Alex Johnson"
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Alex Johnson</h3>
              <p className="text-gray-600">
                Backend Developer | Node.js Expert
              </p>
              <p className="text-gray-600">
                Backend Developer | Node.js Expert
              </p>
              <p className="text-gray-600">
                Backend Developer | Node.js Expert
              </p>
            </div>
          </div>
          {/* Add more cards */}
          <div className="bg-white shadow-md rounded-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
            <img
              src="https://via.placeholder.com/150"
              alt="Emily Davis"
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Emily Davis</h3>
              <p className="text-gray-600">UI/UX Designer | Figma Specialist</p>
              <p className="text-gray-600">UI/UX Designer | Figma Specialist</p>
              <p className="text-gray-600">UI/UX Designer | Figma Specialist</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
            <img
              src="https://via.placeholder.com/150"
              alt="Michael Brown"
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Michael Brown</h3>
              <p className="text-gray-600">
                Mobile App Developer | Flutter Expert
              </p>
              <p className="text-gray-600">
                Mobile App Developer | Flutter Expert
              </p>
              <p className="text-gray-600">
                Mobile App Developer | Flutter Expert
              </p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
            <img
              src="https://via.placeholder.com/150"
              alt="Sarah Wilson"
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Sarah Wilson</h3>
              <p className="text-gray-600">Data Scientist | Python & ML</p>
              <p className="text-gray-600">Data Scientist | Python & ML</p>
              <p className="text-gray-600">Data Scientist | Python & ML</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
            <img
              src="https://via.placeholder.com/150"
              alt="Sarah Wilson"
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Sarah Wilson</h3>
              <p className="text-gray-600">Data Scientist | Python & ML</p>
              <p className="text-gray-600">Data Scientist | Python & ML</p>
              <p className="text-gray-600">Data Scientist | Python & ML</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;
