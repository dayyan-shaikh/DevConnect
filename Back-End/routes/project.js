const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const Project = require("../models/Project");
const User = require("../models/User");
const mongoose = require("mongoose");

// Create a project
router.post("/createproject", async (req, res) => {
  try {
    const { profileId, title, featured_image, description, demo_link, source_link } = req.body;

    // Check if the profile exists
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found', success: false });
    }

    // Create the new project
    const newProject = new Project({
      title,
      featured_image,
      description,
      demo_link,
      source_link,
      // user: userId,
      profile: profile._id, // Associate with the profile
    });

    // Save the project to the database
    const savedProject = await newProject.save();

    // Add the project to the profile's projects array
    profile.projects.push(savedProject._id);
    await profile.save();

    res.status(201).json({
      message: 'Project created and linked to profile successfully',
      success: true,
      project: savedProject,
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Server error', success: false });
  }
});

router.delete("/deleteproject/:id", async (req, res) => {
    try {
      const projectId = req.params.id;
  
      // Check if the provided projectId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ message: "Invalid project ID", success: false });
      }
  
      // Find the project by ID and delete it
      const project = await Project.findByIdAndDelete(projectId);
  
      if (!project) {
        return res.status(404).json({ message: "Project not found", success: false });
      }
  
      res.status(200).json({ message: "Project deleted successfully", success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", success: false });
    }
  });

module.exports = router;
