// controllers/userController.js
const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  const users = await User.find().populate("roles");
  res.status(200).json(users);
};
