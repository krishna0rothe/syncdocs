// models/Document.js
const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String, // You can add rich text or markdown handling later for text formatting
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collaborator",
        default: [],
      },
    ],
    isPublic: {
      type: Boolean,
      default: false, // By default, the document is private
    },
    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document", // If it is part of a folder
      default: null,
    },
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
