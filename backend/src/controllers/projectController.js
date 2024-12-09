const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    // Validate required fields
    if (!name) {
      return res.status(400).json({ message: "Project name is required." });
    }

    // Get owner ID from req.user (set by authentication middleware)
    const ownerId = req.user.id;

    // Create the new project
    const newProject = new Project({
      name,
      description: description || "", // Default to empty string if no description
      owner: ownerId,
      teamMembers: [], // Empty array for team members
      folders: [], // Empty array for folders
      documents: [], // Empty array for documents
    });

    // Save the project to the database
    const savedProject = await newProject.save();

    // Respond with the created project details
    res.status(201).json({
      message: "Project created successfully.",
      project: savedProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);

    // Handle duplicate project name error
    if (error.code === 11000) {
      return res.status(409).json({ message: "Project name must be unique." });
    }

    res.status(500).json({ message: "Internal server error." });
  }
};
