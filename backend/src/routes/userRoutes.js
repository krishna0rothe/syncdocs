// routes/userRoutes.js
const express = require("express");
const { getAllUsers } = require("../controllers/userController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

//router.get("/", authenticate, getAllUsers);

module.exports = router;
