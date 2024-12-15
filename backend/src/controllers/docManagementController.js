const Project = require("../models/Project");
const Folder = require("../models/Folder");
const Document = require("../models/Document");


exports.updateDocumentAccess = async (req, res) => {
  try {
    const { documentId } = req.params;
    const { userId, role, action } = req.body;

    // Validate inputs
    if (!["add", "remove"].includes(action)) {
      return res
        .status(400)
        .json({ message: "Invalid action. Use 'add' or 'remove'." });
    }

    // Fetch the document and project
    const document = await Document.findById(documentId).populate("project");
    if (!document) {
      return res.status(404).json({ message: "Document not found." });
    }

    const project = document.project;
    if (!project) {
      return res.status(404).json({ message: "Associated project not found." });
    }

    // Ensure only the project owner can modify access
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Only the project owner can modify document access.",
      });
    }

    // Modify access based on the action
    if (action === "add") {
      // Check if the user already has a role
      const existingRole = document.allowedRoles.find(
        (entry) => entry.user.toString() === userId
      );

      if (existingRole) {
        return res
          .status(400)
          .json({
            message: "User already has access. Modify the role if needed.",
          });
      }

      // Add the new role
      document.allowedRoles.push({ user: userId, role: role || "viewer" });
    } else if (action === "remove") {
      // Remove the user's access
      const initialLength = document.allowedRoles.length;
      document.allowedRoles = document.allowedRoles.filter(
        (entry) => entry.user.toString() !== userId
      );

      // If the length hasn't changed, it means the user wasn't found
      if (document.allowedRoles.length === initialLength) {
        return res
          .status(400)
          .json({ message: "User does not have access. Nothing to remove." });
      }
    }

    // Save changes
    await document.save();

    res.status(200).json({
      message: `Access successfully ${action === "add" ? "added" : "removed"}.`,
      allowedRoles: document.allowedRoles,
    });
  } catch (error) {
    console.error("Error updating document access:", error);
    res.status(500).json({ message: "Failed to update document access." });
  }
};