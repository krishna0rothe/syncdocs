// models/Collaborator.js
const mongoose = require("mongoose");

const collaboratorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: {
    type: String,
    enum: ["editor", "viewer"], // Define roles here, can be expanded
    required: true,
  },
});

const Collaborator = mongoose.model("Collaborator", collaboratorSchema);

module.exports = Collaborator;
