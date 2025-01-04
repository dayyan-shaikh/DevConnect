const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    featured_image: {
      type: String,  // URL or path to the image
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    demo_link: {
      type: String,
      required: true,
    },
    source_link: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: 'User',
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  });

module.exports = mongoose.model('Project', projectSchema);