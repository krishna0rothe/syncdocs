// models/Document.js
const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  collaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Users who can edit the document
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
  versionHistory: [
    {
      content: String,
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// Middleware to update the `updatedAt` field
documentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Document = mongoose.model("Document", documentSchema);
module.exports = Document;
