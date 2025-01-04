// utils/jwtUtils.js
const jwt = require('jsonwebtoken');
const { User } = require('../models/User'); // Import your User model (you can adjust based on your model structure)

// Secret key and algorithm for JWT signing and verifying
const SECRET_KEY = "your-secret-key";
const ALGORITHM = "HS256";

// Function to verify the token and get the current user
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY, { algorithms: [ALGORITHM] });
    return decoded; // Returns the decoded payload, e.g., { sub: 'user-email' }
  } catch (err) {
    throw new Error('Invalid token');
  }
};

// Function to extract the user from the token and return their profile
const getCurrentUser = async (token) => {
  const decoded = verifyToken(token);
  const username = decoded.sub; // Get the username or email from the decoded token
  const user = await User.findOne({ where: { email: username } }); // Adjust the query based on your User model
  
  if (!user) {
    throw new Error('User not found');
  }
  
  const userProfile = await user.getProfile(); // Assuming you have a relationship or method to get the profile
  
  return userProfile;
};

module.exports = { getCurrentUser };
