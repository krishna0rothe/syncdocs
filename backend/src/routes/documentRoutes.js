// routes/documentRoutes.js
const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");
const documentManagementController = require("../controllers/docManagementController");
const authenticateJWT = require("../middlewares/authMiddleware"); 
const isOwner = require("../middlewares/isOwner"); 
const accessControlMiddleware = require("../middlewares/accessControlMiddleware");

router.get("/get-document/:id", authenticateJWT, documentController.getDocumentDetails);
router.put("/:documentId/update", authenticateJWT, accessControlMiddleware, documentController.updateDocumentContent);

// Route to add/remove document access
router.post("/:documentId/access", authenticateJWT, accessControlMiddleware, documentManagementController.updateDocumentAccess);
router.get("/:documentId/get-access", authenticateJWT, accessControlMiddleware, documentManagementController.getDocumentAccessDetails);


module.exports = router;
