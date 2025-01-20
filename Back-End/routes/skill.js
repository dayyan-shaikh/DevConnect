const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");
const Skill = require("../models/Skill");
const Profile = require("../models/Profile");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/createSkill", authenticate, async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if the profile exists
    const profile = req.user;
    if (!profile) {
      return res
        .status(404)
        .json({ message: "Profile not found", success: false });
    }

    // Check if the skill already exists for the user
    const existingSkill = await Skill.findOne({ name: name.toLowerCase() });
    if (existingSkill) {
      return res
        .status(400)
        .json({
          message: "Skill already exists in your profile",
          success: false,
        });
    }

    // Create the new skill
    const newSkill = new Skill({
      name: name.toLowerCase(),
      description,
      // user: profile.id,
      profile: profile._id, // Associate with the profile
    });

    // Save the skill to the database
    const savedSkill = await newSkill.save();

    // Add the skill to the profile's skills array
    profile.skills.push(savedSkill._id);
    await profile.save();

    res.status(201).json({
      message: "Skill created and linked to profile successfully",
      success: true,
      skill: savedSkill,
    });
  } catch (error) {
    console.error("Error creating skill:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
});

// Update Skill
router.patch("/skills/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid Skill ID", success: false });
    }

    // Extract the fields to update from the request body
    const updates = req.body;

    // Perform the update
    const updatedSkill = await Skill.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Validate updates against the schema
    });

    if (!updatedSkill) {
      return res
        .status(404)
        .json({ message: "Skill not found", success: false });
    }

    // Return the updated skill
    res.status(200).json({
      message: "Skill updated successfully",
      success: true,
      skill: updatedSkill,
    });
  } catch (error) {
    console.error("Error updating skill:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
});

// Get Skills
router.get('/getSkills', authenticate, async (req, res) => {
  try {
    const profile = req.user; // Current user is attached to the request by the authenticate middleware
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found', success: false });
    }

    // Fetch all skills associated with the user's profile
    const skills = await Skill.find({ _id: { $in: profile.skills } });

    return res.status(200).json({
      message: 'Skills fetched successfully',
      success: true,
      skills,
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ message: 'Server error', success: false });
  }
});

// Get a specific skill
router.get('/skill/:id', authenticate, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    console.log(skill);
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.status(200).json({ skill });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skill' });
  }
});


// Delete Skill
router.delete("/deleteskill/:id", async (req, res) => {
  try {
    const skillId = req.params.id;

    // Check if the provided skillId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(skillId)) {
      return res
        .status(400)
        .json({ message: "Invalid skill ID", success: false });
    }

    // Find the skill by ID and delete it
    const skill = await Skill.findByIdAndDelete(skillId);

    if (!skill) {
      return res
        .status(404)
        .json({ message: "Skill not found", success: false });
    }

    res
      .status(200)
      .json({ message: "Skill deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
});

module.exports = router;
