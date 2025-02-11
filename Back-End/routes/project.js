const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const { authenticate } = require("../middleware/authMiddleware");
const Project = require("../models/Project");
const mongoose = require("mongoose");

// Create a project
router.post("/createproject", authenticate, async (req, res) => {
  try {
    const { title, description, demo_link, source_link } = req.body;

    // Check if the profile exists
    const profile = req.profile;

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found', success: false });
    }

    // Create the new project
    const newProject = new Project({
      title,
      description,
      demo_link,
      source_link,
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

// Get all projects for a profile
router.get("/getprojects", authenticate, async (req, res) => {
  try {
    const profile = req.profile;

    // Check if the profile exists
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found', success: false });
    }

    // Fetch all projects associated with the user's profile
    const projects = await Project.find({ profile: profile._id });

    res.status(200).json({
      message: 'Projects fetched successfully',
      success: true,
      projects,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error', success: false });
  }
});

// Update Project
router.patch("/project/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid Project ID", success: false });
    }

    // Extract the fields to update from the request body
    const updates = req.body;

    // Perform the update
    const updatedProject = await Project.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Validate updates against the schema
    });

    if (!updatedProject) {
      return res
        .status(404)
        .json({ message: "Project not found", success: false });
    }

    // Return the updated project
    res.status(200).json({
      message: "Project updated successfully",
      success: true,
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
});

// Get Project by ID
router.get("/project/:id", authenticate, async (req, res) => {
  try {
    const { id: projectId } = req.params; // Extract projectId from URL params
    const project = await Project.findById(projectId); // Query database using projectId
    if (!project) {
      return res
        .status(404)
        .json({ message: "Project not found", success: false });
    }
    res.status(200).json({ project, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching project", success: false });
  }
});

// Delete a project
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