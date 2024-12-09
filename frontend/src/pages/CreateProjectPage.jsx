import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";

const CreateProjectPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreateProject = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Project name is required.");
      return;
    }

    try {
      const response = await axiosInstance.post("/projects/create", {
        name,
        description,
      });

      const { project } = response.data;
      navigate(`/project/${project._id}`); // Redirect to the project page
    } catch (error) {
      console.error("Error creating project:", error);
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  const handleClose = () => {
    navigate("/home"); // Navigate back to the home page
  };

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.4)", // Glass effect background
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backdropFilter: "blur(5px)", // Blur effect
      zIndex: 1000,
    },
    modal: {
      width: "400px",
      backgroundColor: "rgba(255, 255, 255, 0.9)", // Transparent background with slight opacity
      borderRadius: "10px",
      padding: "20px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      fontFamily: "'Inter', sans-serif",
      color: "#2D2D2D",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center", // Ensures the content is centered
      alignItems: "center", // Ensures the content is centered horizontally
    },
    header: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "20px", // Increased margin for separation
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #CCC",
      borderRadius: "8px",
      fontSize: "14px",
      fontFamily: "'Inter', sans-serif",
      outline: "none",
      boxSizing: "border-box", // Ensures padding does not affect width
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%", // Ensures buttons span the full width of the modal
      marginTop: "20px",
    },
    button: {
      padding: "10px 20px",
      borderRadius: "8px",
      fontSize: "14px",
      cursor: "pointer",
      border: "none",
      transition: "background-color 0.3s",
      width: "48%", // Ensures buttons are evenly spaced
    },
    submitButton: {
      backgroundColor: "#875A7B", // Purple accent
      color: "#FFFFFF",
    },
    closeButton: {
      backgroundColor: "#6C757D", // Muted gray
      color: "#FFFFFF",
    },
    error: {
      color: "#FF4D4F",
      fontSize: "14px",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.header}>Create New Project</h2>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleCreateProject} style={{ width: "100%" }}>
          <input
            type="text"
            placeholder="Project Name"
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description (optional)"
            style={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div style={styles.buttonGroup}>
            <button
              type="button"
              style={{ ...styles.button, ...styles.closeButton }}
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="submit"
              style={{ ...styles.button, ...styles.submitButton }}
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectPage;