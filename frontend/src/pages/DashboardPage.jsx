import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";

const DashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    if (token) {
      axiosInstance
        .get("/users/get-projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProjects(response.data); // Assuming the API returns an array of projects
          setLoading(false);
        })
        .catch(() => {
          setLoading(false); // Handle error and stop loading
        });
    } else {
      setLoading(false); // No token, stop loading
    }
  }, []);

  const handleCreateProject = () => {
    navigate("/create-project"); // Navigate to the create project page
  };

  const handleCardClick = (projectId) => {
    navigate(`/project/${projectId}`); // Redirect to the project details page using the project ID
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format the date as MM/DD/YYYY
  };

  const styles = {
    dashboard: {
      marginLeft: "250px", // Sidebar width
      marginTop: "60px", // Topbar height
      padding: "30px",
      backgroundColor: "#F8F9FA",
      minHeight: "calc(100vh - 60px)",
      fontFamily: "'Inter', sans-serif",
      color: "#2D2D2D",
    },
    welcome: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#2D2D2D",
    },
    description: {
      fontSize: "18px",
      color: "#6C757D",
      marginBottom: "30px",
    },
    cardContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
    },
    card: {
      backgroundColor: "#FFFFFF",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "box-shadow 0.3s",
      cursor: "pointer",
    },
    // Only the card's box shadow changes on hover, not the text
    cardHover: {
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    },
    cardTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#2D2D2D",
      marginBottom: "10px",
    },
    cardText: {
      fontSize: "14px",
      color: "#6C757D",
    },
    cardDate: {
      fontSize: "12px",
      color: "#6C757D",
      marginTop: "10px",
    },
    createProjectButton: {
      margin: "20px 0",
      padding: "15px 30px",
      backgroundColor: "#875A7B", // Purple accent
      color: "#FFFFFF",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      textAlign: "center",
      transition: "background-color 0.3s",
      outline: "none",
    },
    createProjectButtonHover: {
      backgroundColor: "#6A4663", // Darker purple for hover effect
    },
    noProjectsMessage: {
      textAlign: "center",
      color: "#6C757D",
      fontSize: "18px",
      marginTop: "40px",
    },
  };

  return (
    <div style={styles.dashboard}>
      <h1 style={styles.welcome}>Welcome to SyncDocs</h1>
      <p style={styles.description}>
        Manage your projects or create a new one to get started!
      </p>

      <button
        style={styles.createProjectButton}
        onMouseOver={(e) =>
          (e.target.style.backgroundColor =
            styles.createProjectButtonHover.backgroundColor)
        }
        onMouseOut={(e) =>
          (e.target.style.backgroundColor =
            styles.createProjectButton.backgroundColor)
        }
        onClick={handleCreateProject}
      >
        + Create New Project
      </button>

      {loading ? (
        <p style={styles.noProjectsMessage}>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p style={styles.noProjectsMessage}>
          You don’t have any projects yet. Create your first project!
        </p>
      ) : (
        <div style={styles.cardContainer}>
          {projects.slice(0, 8).map((project) => (
            <div
              key={project._id} // Use _id here for the key and onClick
              style={styles.card}
              onClick={() => handleCardClick(project._id)} // Pass _id as argument
              onMouseEnter={(e) =>
                (e.target.style.boxShadow = styles.cardHover.boxShadow)
              } // Apply only the shadow effect on hover
              onMouseLeave={(e) =>
                (e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)")
              } // Revert the shadow on mouse leave
            >
              <div style={styles.cardTitle}>{project.name}</div>
              <div style={styles.cardText}>{project.description}</div>
              <div style={styles.cardDate}>
                Created on: {formatDate(project.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
