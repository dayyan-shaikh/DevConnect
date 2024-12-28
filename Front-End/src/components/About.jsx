import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
    {/* Header Section */}
    <nav className="w-full bg-gray-700 text-white p-6 flex justify-around items-center">
        <div className="flex items-center space-x-2 cursor-pointer">
          {/* Logo */}
          <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-gray-900 font-bold">DC</span>
          </div>
          <h1 className="text-3xl font-bold">DevConnect</h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex text-lg space-x-8">
          <a href="developers" className="hover:text-gray-400">
            Developers
          </a>
          <a href="/" className="hover:text-gray-400">
            Projects
          </a>
          <a href="/about" className="hover:text-gray-400">
            About
          </a>
        </div>
      </nav>

    {/* Main Content */}
    <main className="flex-1 w-full max-w-4xl p-6 bg-white shadow-md rounded-lg mt-8">
      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        {/* Profile Picture */}
        <div className="w-40 h-40 mb-6 lg:mb-0">
          <img
            src="https://via.placeholder.com/150" // Replace with actual image
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-gray-200"
          />
        </div>

        {/* Info Section */}
        <div className="lg:ml-8 text-center lg:text-left">
          <h2 className="text-3xl font-bold text-gray-800">Mubeen Shaikh</h2>
          <p className="text-gray-600 mt-2">
            Python | Senior Software Analyst | Web Developer
          </p>
          <p className="text-gray-500 mt-1">Based in Mumbai, INDIA</p>
        </div>
      </div>

      {/* About Me Section */}
      <section className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800">ABOUT ME</h3>
        <p className="text-gray-600 mt-2">
          Hello Developer, This is <span className="font-bold">Mubeen 👋</span>, author of
          DevModule Community. Currently I'm working as a
          <span className="font-bold"> Senior Software Analyst 👨‍💻</span> and looking
          for a domain switch into <span className="font-bold">Python Development</span>. Because
          creating cool projects and solving problems really makes me curious about every process
          of development. 😍
        </p>
      </section>

      {/* Experience Section */}
      <section className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800">PREVIOUS EXPERIENCE</h3>
        <p className="text-gray-600 mt-2">
          I have close to <span className="font-bold">2.5 Years</span> of experience in Testing
          Mobile Applications for one of the world's top 5 Fast Food Industry.
        </p>
        <p className="text-gray-600 mt-2">
          I have also been a part of a non-profitable organization
          <span className="font-bold"> TEDXRambaug</span> where I have implemented my
          <span className="font-bold"> Front-end Development</span> skills to build the website
          with the team.
        </p>
      </section>

      {/* Achievements Section */}
      <section className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800">ACHIEVEMENTS</h3>
        <p className="text-gray-600 mt-2">
          Received <span className="font-bold">Star Award</span> in the first
          <span className="font-bold"> 6 months</span> after joining for working towards deadlines
          and new feature testing.
        </p>
        <p className="text-gray-600 mt-2">
          Rewarded by <span className="font-bold">Kizen Award</span> for solving a
          <span className="font-bold"> logging resource requirement problem</span> for all.
        </p>
      </section>
    </main>
  </div>
  )
}

export default About
