// models/Role.js
const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: "Viewer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
