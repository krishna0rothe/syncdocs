const User = require("../models/User");
const { verifyToken } = require("../services/tokenService");

// Verify Email
exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    // Decode token and find user
    const decoded = verifyToken(token);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    // Mark user as verified
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
