// app.js
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const projectRoutes = require("./routes/projectRoutes");
const cors = require("cors");


const app = express();
app.use(cors());

// Middleware
app.use(morgan("dev")); // Logging middleware
app.use(bodyParser.json()); // Body parser for JSON
app.use(bodyParser.urlencoded({ extended: true })); // URL encoded body parser

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/projects", projectRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
