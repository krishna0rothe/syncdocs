// controllers/userController.js
const User = require("../models/User");
const Project = require("../models/Project");

// Controller to get user info
exports.getUser = async (req, res) => {
  try {
    const { id } = req.user;
    // Find user by ID
    const user = await User.findById(id, "name isverified _id");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send response with the selected fields
    res.status(200).json({
      name: user.name,
      isVerified: user.isverified,
      id: user._id,
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserProjects = async (req, res) => {
  try {
    // Get the user ID from the authenticated user
    const userId = req.user.id;

    // Fetch all projects where the owner is the authenticated user
    const projects = await Project.find({ owner: userId }).select(
      "name description status createdAt updatedAt _id"
    );

    // Return the projects as a response
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching user projects:", error);
    res.status(500).json({ message: "Failed to fetch projects." });
  }
};

