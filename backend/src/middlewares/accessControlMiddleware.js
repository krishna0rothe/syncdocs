const Project = require("../models/Project");
const Document = require("../models/Document");

const accessControlMiddleware = async (req, res, next) => {
  try {
    const { documentId } = req.params;
    const userId = req.user.id;

    // Fetch the document and related project
    const document = await Document.findById(documentId).populate("project");
    if (!document) {
      return res.status(404).json({ message: "Document not found." });
    }

    const project = document.project;
    if (!project) {
      return res
        .status(404)
        .json({ message: "Project not found for this document." });
    }

    // Check if the user is the owner of the project
    if (project.owner.toString() === userId) {
      req.user.role = "owner"; // Add role to req for controller
      return next(); // Allow all operations for the owner
    }

    // Check if the user is a team member with project-level access
    const isTeamMember = project.teamMembers.some(
      (member) => member.user.toString() === userId
    );

    if (isTeamMember) {
      req.user.role = "teamMember"; // Add role to req for controller
      return next(); // Allow all operations for team members
    }

    // Check document-level access
    const documentAccess = document.allowedRoles.find(
      (entry) => entry.user.toString() === userId
    );

    if (documentAccess) {
      req.user.role = documentAccess.role; // Add the user's document role (viewer/editor) to req
      if (req.method === "GET" || req.method === "HEAD") {
        return next(); // Allow viewing for viewers and editors
      } else if (req.method !== "GET" && documentAccess.role === "editor") {
        return next(); // Allow modifying only for editors
      } else {
        return res
          .status(403)
          .json({ message: "You only have viewing access to this document." });
      }
    }

    // If no access is found, deny the request
    return res
      .status(403)
      .json({ message: "Access denied to this document or project." });
  } catch (error) {
    console.error("Error in checkDocumentAccess middleware:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = accessControlMiddleware;
