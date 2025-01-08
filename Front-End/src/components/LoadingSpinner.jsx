// LoadingSpinner.jsx
import React from 'react';
// import './LoadingSpinner.css';


const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
    {/* Outer Spinner */}
    <div className="flex items-center justify-center w-20 h-20 border-4 border-transparent rounded-full animate-spin border-t-blue-400">
      {/* Inner Spinner */}
      <div className="flex items-center justify-center w-16 h-16 border-4 border-transparent rounded-full animate-spin border-t-red-400"></div>
    </div>
    <p className="mt-4 text-gray-500 text-lg">Loading...</p>
  </div>
  );
};

export default LoadingSpinner;
