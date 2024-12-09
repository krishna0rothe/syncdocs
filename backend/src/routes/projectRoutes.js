// routes/projectRoutes.js
const express = require("express");
const projectController = require("../controllers/projectController");
const authenticateJWT = require("../middlewares/authMiddleware");

const router = express.Router();

// Route to create a project
router.post("/create", authenticateJWT, projectController.createProject);

module.exports = router;
