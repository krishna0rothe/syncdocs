// routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");
const authenticateJWT = require("../middlewares/authMiddleware");   

const router = express.Router();

//router.get("/", authenticate, getAllUsers);
router.get("/getuser", authenticateJWT, userController.getUser);
router.get("/get-projects", authenticateJWT, userController.getUserProjects);

module.exports = router;
