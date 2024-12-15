const Project = require("../models/Project");
const Folder = require("../models/Folder");
const Document = require("../models/Document");
const User = require("../models/User"); // Import the User model

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

exports.getDocumentAccessDetails = async (req, res) => {
  try {
    const { documentId } = req.params;

    // Fetch the document by ID and populate allowedRoles and project
    const document = await Document.findById(documentId)
      .populate("allowedRoles.user", "name role") // Populate allowed roles with name and role
      .populate("project");

    if (!document) {
      return res.status(404).json({ message: "Document not found." });
    }

    // Fetch the project data and check if the user is the project owner
    const project = document.project;
    const isOwner = req.user.id === project.owner.toString();

    // Get the owner of the project and populate with name from the User model
    const owner = await User.findById(project.owner).select("name"); // Populate owner name
    const ownerDetails = {
      id: owner._id,
      name: owner.name, // Assuming the owner's name is populated
      role: "owner",
    };

    // Fetch team members and format them as editors (populate user name)
    const teamMembers = await Promise.all(
      project.teamMembers.map(async (member) => {
        const user = await User.findById(member.user).select("name"); // Populate team member's name
        return {
          id: member.user._id,
          name: user.name, // Get the name of team member
          role: member.role,
        };
      })
    );

    // Fetch allowed roles (users who have access to the document)
    const allowedUsers = document.allowedRoles.map((role) => ({
      id: role.user._id,
      name: role.user.name,
      role: role.role,
    }));

    // Filter out the requesting user from all lists
    const filteredEditors = allowedUsers
      .filter(
        (user) => user.role === "editor" && user.id.toString() !== req.user.id
      )
      .map((user) => ({
        id: user.id,
        name: user.name,
        role: user.role,
      }));

    const filteredViewers = allowedUsers
      .filter(
        (user) => user.role === "viewer" && user.id.toString() !== req.user.id
      )
      .map((user) => ({
        id: user.id,
        name: user.name,
        role: user.role,
      }));

    // Build the response object
    let response = {
      documentOwner: {
        id: ownerDetails.id,
        name: ownerDetails.name, // Include owner's name in the response
        role: ownerDetails.role,
      },
      teamMembers: teamMembers.filter(
        (member) => member.id.toString() !== req.user.id
      ),
    };

    // If the requesting user is the owner, return editors and viewers separately
    if (isOwner) {
      response = {
        ...response,
        editors: filteredEditors,
        viewers: filteredViewers,
      };
    } else {
      // If the user is not the owner, only return the general information
      response = {
        ...response,
        editors: filteredEditors,
        viewers: filteredViewers,
      };
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching document access details:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch document access details." });
  }
};