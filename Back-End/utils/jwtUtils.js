// utils/jwtUtils.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import your User model (you can adjust based on your model structure)
const Profile = require('../models/Profile'); // Import your User model (you can adjust based on your model structure)

// Secret key and algorithm for JWT signing and verifying
// const SECRET_KEY = process.env.SECRET_KEY;
const SECRET_KEY = "9f6b71f4dff3a5d87e2934bda1a4b907a12c3f5f6f29c8b2f45310ef8e321d9f";
const ALGORITHM = "HS256";

// Function to verify the token and get the current user
const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY, { algorithms: [ALGORITHM] });
    return decoded; // Returns the decoded payload
  } catch (err) {
    console.error('Token verification failed:', err.message);
    throw new Error('Invalid or expired token');
  }
};

// Function to extract the user from the token and return their profile
const getCurrentUser = async (token) => {
  try {
    const decoded = await verifyToken(token);
    const userId = decoded.id;

    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      throw new Error('User profile not found');
    }

    return profile;
    
  } catch (error) {
    console.error('Error fetching user or profile:', error.message);
    throw error;
  }
};

module.exports = { getCurrentUser };
