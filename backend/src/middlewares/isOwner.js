const Project = require("../models/Project");

const isOwner = async (req, res, next) => {
  try {
    const projectId = req.params.projectId; // Assuming projectId is passed as a URL parameter
    const userId = req.user.id; // Assuming req.user contains the authenticated user's info

    // Validate project existence
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    // Check ownership
    if (String(project.owner) !== userId) {
      return res
        .status(403)
        .json({ message: "You are not the owner of this project." });
    }

    // Attach the project to the request object for further processing
    req.project = project;
    next();
  } catch (error) {
    console.error("Error checking project ownership:", error);
    res.status(500).json({ message: "Failed to verify project ownership." });
  }
};

module.exports = isOwner;
