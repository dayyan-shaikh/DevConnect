const express = require("express");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();
const User = require("../models/User");
const mongoose = require("mongoose");

router.post("/profile", async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const {
      userId,
      firstName,
      lastName,
      username,
      location,
      shortIntro,
      bio,
      profileImage,
      socialGithub,
      socialTwitter,
      socialLinkedin,
      socialYoutube,
      socialWebsite,
    } = req.body;

    // Validate if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    console.log("after profile");
    // Check if a profile already exists for the user
    const existingProfile = await Profile.findOne({ user: userId });
    if (existingProfile) {
      return res
        .status(400)
        .json({
          message: "Profile already exists for this user",
          success: false,
        });
    }

    // Create a new profile
    const newProfile = new Profile({
      user: userId,
      firstName,
      lastName,
      username,
      location,
      shortIntro,
      bio,
      profileImage,
      socialGithub,
      socialTwitter,
      socialLinkedin,
      socialYoutube,
      socialWebsite,
    });

    await newProfile.save();
    console.log(newProfile);
    res
      .status(201)
      .json({
        message: "Profile created successfully",
        profile: newProfile,
        success: true,
      });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ error: "Server error", success: false });
  }
});

// Get a user's profile by userId
router.get("/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ message: "Invalid user ID format", success: false });
    }

    // Fetch the profile of the user
    const profile = await Profile.findOne({ user: userId }).populate(
      "user",
      "username email"
    );

    if (!profile) {
      return res
        .status(404)
        .json({ message: "Profile not found", success: false });
    }

    // Return the profile details
    res.status(200).json({ profile, success: true });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
});

// Get all profiles
router.get("/profiles", async (req, res) => {
  try {
    // Fetch all profiles
    const profiles = await Profile.find().populate("user", "username email");

    if (profiles.length === 0) {
      return res
        .status(404)
        .json({ message: "No profiles found", success: false });
    }

    // Return the profiles
    res.status(200).json({ profiles, success: true });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
});

router.delete('/:profileId', async (req, res) => {
  try {
    const { profileId } = req.params; // Extract profileId from the request parameters

    // Find and delete the profile based on the profileId
    const deletedProfile = await Profile.findByIdAndDelete(profileId);

    // Check if profile exists before trying to delete
    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found", success: false });
    }

    // Send response on successful deletion
    res.status(200).json({ message: "Profile deleted successfully", success: true });

  } catch (error) {
    // Handle any server errors
    console.error("Error while deleting profile:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
});


router.delete("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID and remove
    const user = await User.findByIdAndDelete(userId);
    console.log("Deleted user:", user);

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

// Update a profile

router.patch('/update', authenticate, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      profileImage,
      location,
      shortIntro,
      bio,
      socialGithub,
      socialTwitter,
      socialLinkedin,
      socialYoutube,
      socialWebsite,
    } = req.body;

    const currentUser = req.user; // Current user is attached to the request by the authenticate middleware
    const userProfile = await Profile.findOne({ where: { userId: currentUser.id } });

    if (!userProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // If profile image is provided, update it
    let profileImageUrl = userProfile.profileImage;
    if (profileImage) {
      profileImageUrl = await uploadProfileImage(profileImage);
    }

    // Update the profile with the new data
    userProfile.firstName = firstName || userProfile.firstName;
    userProfile.lastName = lastName || userProfile.lastName;
    userProfile.profileImage = profileImageUrl;
    userProfile.location = location || userProfile.location;
    userProfile.shortIntro = shortIntro || userProfile.shortIntro;
    userProfile.bio = bio || userProfile.bio;
    userProfile.socialGithub = socialGithub || userProfile.socialGithub;
    userProfile.socialTwitter = socialTwitter || userProfile.socialTwitter;
    userProfile.socialLinkedin = socialLinkedin || userProfile.socialLinkedin;
    userProfile.socialYoutube = socialYoutube || userProfile.socialYoutube;
    userProfile.socialWebsite = socialWebsite || userProfile.socialWebsite;

    // Save the updated profile
    await userProfile.save();

    return res.status(200).json({
      message: 'Profile updated successfully',
      profile: userProfile,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

// Simulating profile image upload (Replace this with actual upload logic)
async function uploadProfileImage(image) {
  return "https://example.com/uploads/profile_images/" + image.filename;
}

// Function to simulate image upload (replace with actual logic)
async function uploadProfileImage(image) {
  // Implement your image upload logic here (e.g., uploading to Google Drive or AWS S3)
  return "https://example.com/uploads/profile_images/" + image.filename;
}

module.exports = router;
