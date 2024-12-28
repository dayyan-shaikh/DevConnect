import React from 'react'
import { Link } from 'react-router-dom'

const Developers = () => {
  return (
    <div>
      <nav className="bg-gray-700 text-white p-6 flex justify-around items-center">
        <div className="flex items-center space-x-2 cursor-pointer">
          {/* Logo */}
          <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-gray-900 font-bold">DC</span>
          </div>
          <h1 className="text-3xl font-bold">DevConnect</h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex text-lg space-x-8">
          <a href="/developers" className="hover:text-gray-400">
            Developers
          </a>
          <a href="/" className="hover:text-gray-400">
            Projects
          </a>
          <a href="/about" className="hover:text-gray-400">
            About
          </a>
        </div>

        {/* Login/SignUp */}
        <Link to={"/login"}>
        <button className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-900">
          Login/Sign Up
        </button>
        </Link>
      </nav>

      {/* Search Section */}
      <div className="bg-gray-700 py-16 flex flex-col items-center">
        <h2 className="text-4xl text-white">
          CONNECT WITH <span className="text-4xl font-bold text-white">DEVELOPERS</span><br />
          <span className='ml-3'>FROM AROUND THE WORLD</span>
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
    </div>
  )
}

export default Developers
