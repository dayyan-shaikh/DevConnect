const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    demo_link: {
      type: String,
    },
    source_link: {
      type: String,
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId, // Reference to User model
    //   ref: 'User',
    //   required: true,
    // },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
      },
    created_at: {
      type: Date,
      default: Date.now,
    },
  });

module.exports = mongoose.model('Project', projectSchema);