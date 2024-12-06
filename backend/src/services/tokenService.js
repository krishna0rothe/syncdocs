const jwt = require("jsonwebtoken");

/**
 * Generates a verification token for the user.
 * @param {string} email - The user's email address.
 * @returns {string} - The signed JWT token.
 */
const generateVerificationToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

/**
 * Verifies the provided token.
 * @param {string} token - The JWT token.
 * @returns {object} - The decoded token payload.
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Invalid or expired token");
  }
};

module.exports = { generateVerificationToken, verifyToken };
