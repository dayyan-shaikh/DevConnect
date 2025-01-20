// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { getCurrentUser } = require('../utils/jwtUtils');
// const { User } = require('../models'); // Import User model

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided or malformed header' });
    }

    const token = authHeader.split(' ')[1];
    const userProfile = await getCurrentUser(token); // Fetch user profile
    req.user = userProfile; // Attach profile to the request
    next(); // Proceed to the next middleware or route
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(401).json({ message: 'Unauthorized: ' + error.message });
  }
};

module.exports = { authenticate };
