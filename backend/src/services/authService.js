// services/authService.js
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (user) => {
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET, // Make sure to set this in your .env
    { expiresIn: "1h" } // Token expiration time
  );
  return token;
};

module.exports = { generateToken };
