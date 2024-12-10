const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder", // Parent folder reference for nesting
      default: null, // Root-level folders have null parent
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project", // Link to the parent project
      required: true,
    },
    subFolders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder", // References child folders
      },
    ],
    documents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document", // References documents under the folder
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

module.exports = mongoose.model("Folder", folderSchema);
