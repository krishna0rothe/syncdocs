const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder", // Folder the document belongs to
      default: null, // If null, it is at the root level
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project", // Link to the parent project
      required: true,
    },
    content: {
      type: String, // Store the markdown content of the document
      default: "",
    },
    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Tracks who last updated the document
    },
    allowedRoles: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["editor", "viewer"],
          default: "viewer",
        },
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

module.exports = mongoose.model("Document", documentSchema);
