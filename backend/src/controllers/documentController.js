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
