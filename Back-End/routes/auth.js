const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Profile = require("../models/Profile");
const router = express.Router();
const mongoose = require('mongoose');

// Register a new user
router.post("/register", async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { email, password, firstname, lastname } = req.body;

    // Check for missing fields
    if (!email || !password || !firstname || !lastname) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Create a new profile
    const newProfile = new Profile({
      firstName: firstname,
      lastName: lastname,
      user: newUser._id, // No need to convert to string
    });
    await newProfile.save();

    console.log("New Profile Created:", newProfile);

    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.error("Error:", error); // Log error for debugging
    res.status(500).json({ error: "Server error" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.json({ token,user: {id: user._id,email: user.email}, message: "Login successful", success : true });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all Users
router.get("/users", async (req, res) => {
  try {
    // Fetch all profiles
    const users = await User.find().populate("email");

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found", success: false });
    }

    // Return the profiles
    res.status(200).json({ users, success: true });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
});

// Get a user by userId
router.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ message: "Invalid user ID format", success: false });
    }

    // Fetch the profile of the user
    const user = await User.findById(userId).populate("profile");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Return the profile details
    res.status(200).json({ user, success: true });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
});

// Delete a user by ID
router.delete("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID and remove
    const user = await User.findByIdAndDelete(userId);
    // console.log("Deleted user:", user);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: "Server error", success: false });
  }
});

router.delete("/user/all", async (req, res) => {
  try {
    // Deleting all users
    console.log("heeeeee");
    const result = await User.deleteMany({});

    // Check if any users were deleted
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No users found to delete", success: false });
    }

    res
      .status(200)
      .json({ message: "All users deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting all users:", error);
    res.status(500).json({ error: "Server error", success: false });
  }
});

module.exports = router;
