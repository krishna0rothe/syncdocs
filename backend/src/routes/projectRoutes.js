// routes/projectRoutes.js
const express = require("express");
const projectController = require("../controllers/projectController");
const authenticateJWT = require("../middlewares/authMiddleware");
const isOwner = require("../middlewares/isOwner");

const router = express.Router();

// Route to create a project
router.post("/create", authenticateJWT, projectController.createProject);
router.post("/create-folder", authenticateJWT, projectController.createFolder);
router.post("/create-document", authenticateJWT, projectController.createDocument);
router.get("/project/:projectId", authenticateJWT, isOwner, projectController.getProjectDetails);
module.exports = router;
