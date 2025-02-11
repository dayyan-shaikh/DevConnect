const mongoose = require("mongoose");


const profileSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    about: {
      type: String,
    },
    location: {
      type: String,
    },
    shortIntro: {
      type: String,
    },
    socialGithub: {
      type: String,
    },
    socialTwitter: {
      type: String,
    },
    socialLinkedin: {
      type: String,
    },
    socialWebsite: {
      type: String,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    // Reference to Projects: one profile can have many projects
    projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project', // Reference to Project model
    },
  ],
  });

  
module.exports = mongoose.model('Profile', profileSchema);