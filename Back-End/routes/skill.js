const express = require("express");
const { authenticate } = require("../middleware/authMiddleware")
const Skill = require("../models/Skill");
const Profile = require("../models/Profile")
const router = express.Router();

router.post("/createSkill",authenticate,async (req, res) => {
    try {
      const { profileId, name, description, userId } = req.body;
  
      // Check if the profile exists
      const profile = await Profile.findById(profileId);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found", success: false });
      }
  
      // Check if the skill already exists for the user
      const existingSkill = await Skill.findOne({ name: name.toLowerCase(), user: userId });
      if (existingSkill) {
        return res.status(400).json({ message: "Skill already exists in your profile", success: false });
      }
  
      // Create the new skill
      const newSkill = new Skill({
        name: name.toLowerCase(),
        description,
        user: userId,
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

module.exports = router;