// routes/documentRoutes.js
const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");
const authenticateJWT = require("../middlewares/authMiddleware");   

// Create a new document
router.post('/create', authenticateJWT, documentController.createDocument);

// Get a specific document
router.get('/:id', authenticateJWT, documentController.getDocument);

// Update a document
router.put('/:id', authenticateJWT, documentController.updateDocument);

// Delete a document
router.delete('/:id', authenticateJWT, documentController.deleteDocument);

// Share a document with another user
router.post('/:id/share', authenticateJWT, documentController.shareDocument);

module.exports = router;
