// import swaggerDocs from './swagger.js'
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile")
const projectRoutes = require("./routes/project")
const skillRoutes = require("./routes/skill")

dotenv.config();
connectDB(); // Connect to MongoDB Atlas

const app = express();
// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.options("*", cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json()); // Parse JSON requests

// Routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/project", projectRoutes);
app.use("/skill",skillRoutes)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // swaggerDocs(app, PORT);
});
