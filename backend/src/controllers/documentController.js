// controllers/documentController.js
const Document = require("../models/Document");
const Collaborator = require("../models/Collaborator");


// Create a new document
exports.createDocument = async (req, res) => {
  try {
    const { title, content, isPublic, folderId } = req.body;
    const owner = req.user.id; // Extracted from JWT

    const newDocument = new Document({
      title,
      content,
      owner,
      isPublic: isPublic || false, // Default to private
      folderId: folderId || null
    });

    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (err) {
    res.status(500).json({ message: 'Error creating document', error: err.message });
  }
};

exports.getDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id).populate("owner");
    if (!document)
      return res.status(404).json({ message: "Document not found" });

    // Check if the user is the owner
    if (document.owner._id.toString() === req.user.id) {
      return res.json(document); // Owner can see the document
    }

    // Check if the user is a collaborator
    const collaborator = await Collaborator.findOne({
      documentId: req.params.id,
      userId: req.user.id,
    });
    if (!collaborator) {
      return res
        .status(403)
        .json({ message: "You do not have access to this document" });
    }

    res.json({ document, role: collaborator.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateDocument = async (req, res) => {
  try {
    const { title, content } = req.body;
    const document = await Document.findById(req.params.id);

    // Only owner can update the document
    if (document.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({
          message: "You do not have permission to update this document",
        });
    }

    document.title = title || document.title;
    document.content = content || document.content;
    document.updatedAt = Date.now();
    await document.save();

    res.json({ message: "Document updated successfully", document });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document)
      return res.status(404).json({ message: "Document not found" });

    // Only the owner can delete the document
    if (document.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({
          message: "You do not have permission to delete this document",
        });
    }

    await document.remove();
    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Share a document with collaborators
exports.shareDocument = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const documentId = req.params.id;

    // Check if the document exists and if the requester is the owner
    console.log(documentId);
    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    if (document.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the owner can share the document' });
    }

    // Add the collaborator
    const newCollaborator = new Collaborator({
      userId,
      role
    });
    const savedCollaborator = await newCollaborator.save();

    // Update the document with the collaborator
    document.collaborators.push(savedCollaborator._id);
    await document.save();

    res.status(200).json({ message: 'Collaborator added', collaborator: savedCollaborator });
  } catch (err) {
    res.status(500).json({ message: 'Error sharing document', error: err.message });
  }
};