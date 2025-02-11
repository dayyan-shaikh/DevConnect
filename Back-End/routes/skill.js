const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");
const Skill = require("../models/Skill");
const Profile = require("../models/Profile");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/createSkill", authenticate, async (req, res) => {
  try {
    const { name, description } = req.body;
    const profile = req.profile; // ✅ Uses `req.profile` instead of `req.user`

    // console.log("Request body:", req.body);
    // console.log("Profile:", profile);

    const existingSkill = await Skill.findOne({ name: name.toLowerCase() });
    if (existingSkill) {
      return res.status(400).json({ message: "Skill already exists" });
    }

    const newSkill = new Skill({
      name: name.toLowerCase(),
      description,
      profile: profile._id,
    });

    const savedSkill = await newSkill.save();
    profile.skills.push(savedSkill._id);
    await profile.save();

    res.status(201).json({ message: "Skill added", skill: savedSkill, success: true });
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
router.get("/getSkills", authenticate, async (req, res) => {
  try {
    const profile = req.profile; // Current user profile is attached to the request by the authenticate middleware
    if (!profile) {
      return res.status(404).json({ message: "Profile not found", success: false });
    }

    // console.log("Profile ID:", profile._id);

    // Fetch all skills associated with the user's profile
    const skills = await Skill.find({ profile: profile._id });

    // console.log("Fetched skills:", skills);

    return res.status(200).json({
      message: "Skills fetched successfully",
      success: true,
      skills,
    });
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
});

router.get("/skill/:id", authenticate, async (req, res) => {
  try {
    const { id: skillId } = req.params; // Extract skillId from URL params
    const skill = await Skill.findById(skillId); // Query database using skillId
    if (!skill) {
      return res
        .status(404)
        .json({ message: "Skill not found", success: false });
    }
    res.status(200).json({ skill, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching skill", success: false });
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
