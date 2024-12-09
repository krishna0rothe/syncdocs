const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teamMembers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["editor", "viewer"], // User roles
          default: "viewer",
        },
      },
    ],
    folders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FolderDocument", // References folder IDs
      },
    ],
    documents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FolderDocument", // References document IDs
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
