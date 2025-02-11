const jwt = require("jsonwebtoken");
const { getCurrentUser } = require("../utils/jwtUtils");
const User = require("../models/User");
const Profile = require("../models/Profile");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided or malformed header" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const profile = await getCurrentUser(token); // Fetch user profile
    const userId = decoded.id;

    // Fetch User
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach both user and profile to req
    req.user = user;
    req.profile = profile;

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ message: "Unauthorized: " + error.message });
  }
};

module.exports = { authenticate };