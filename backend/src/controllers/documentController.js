const Project = require("../models/Project");
const Folder = require("../models/Folder");
const Document = require("../models/Document");

exports.getDocumentDetails = async (req, res) => {
  try {
    const documentId = req.params.id;

    // Fetch the document by ID
    const document = await Document.findById(documentId)
      .populate("project", "name") // Populate project name
      .populate("folder", "name parent") // Populate folder details, including parent
      .exec();

    if (!document) {
      return res.status(404).json({ message: "Document not found." });
    }

    // Start the path with the project name
    let path = document.project.name;
    let currentFolder = document.folder;

    // Traverse the folder hierarchy upward to construct the full path
    const folderNames = [];
    while (currentFolder) {
      folderNames.unshift(currentFolder.name); // Add folder name to the start of the array
      currentFolder = await Folder.findById(currentFolder.parent)
        .select("name parent")
        .exec();
    }

    // Combine the project name, folders, and document name
    if (folderNames.length > 0) {
      path = `${path}/${folderNames.join("/")}`; // Add folders if they exist
    }
    path = `${path}/${document.name}`; // Append the document name

    // Return the document details
    res.status(200).json({
      id: document._id,
      name: document.name,
      content: document.content,
      lastUpdatedBy: document.lastUpdatedBy,
      allowedRoles: document.allowedRoles,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
      path, // Full hierarchical path
    });
  } catch (error) {
    console.error("Error fetching document details:", error);
    res.status(500).json({ message: "Failed to fetch document details." });
  }
};

// Updating the document content 
exports.updateDocumentContent = async (req, res) => {
  try {
    const { documentId } = req.params;
    const { content } = req.body;

    // Check if content is provided
    if (!content) {
      return res.status(400).json({ message: "Content is required." });
    }

    // Fetch the document
    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ message: "Document not found." });
    }

    // Check if the user has edit access
    const userRole = req.user.role; // Assuming the user role is added in the request by a middleware

    // Check if the user is an editor or the project owner
    if (
      userRole !== "editor" &&
      req.user.id !== document.lastUpdatedBy.toString()
    ) {
      return res.status(403).json({
        message: "You don't have permission to edit this document.",
      });
    }

    // Update the document content
    document.content = content;
    document.lastUpdatedBy = req.user.id;
    document.updatedAt = Date.now(); // Update the timestamp

    // Save the updated document
    await document.save();

    res.status(200).json({
      message: "Document content updated successfully.",
      document: {
        name: document.name,
        content: document.content,
        updatedAt: document.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error updating document content:", error);
    res.status(500).json({ message: "Failed to update document content." });
  }
};




