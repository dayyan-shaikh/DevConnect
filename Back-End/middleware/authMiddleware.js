// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { getCurrentUser } = require('../utils/jwtUtils');
// const { User } = require('../models'); // Import User model

const authenticate = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Get token after "Bearer"
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Get the current user from the token
    const userProfile = await getCurrentUser(token);
    req.user = userProfile; // Attach user profile to the request object

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: ' + error.message });
  }
};

module.exports = { authenticate };
