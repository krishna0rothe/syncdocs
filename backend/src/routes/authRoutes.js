const express = require("express");
const { register, login } = require("../controllers/authController");
const verificationController = require("../controllers/verificationController");
const authenticateJWT = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get('/verify-email', verificationController.verifyEmail);


// Protected Route Example
router.get('/protected', authenticateJWT, (req, res) => {
    res.status(200).json({ message: 'Access granted', user: req.user });
});

module.exports = router;
