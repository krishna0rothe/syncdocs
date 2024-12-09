import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPopup = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      backdropFilter: "blur(5px)", // Background blur
    },
    popup: {
      backgroundColor: "#FFFFFF",
      padding: "20px",
      borderRadius: "8px",
      width: "400px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      textAlign: "center",
      zIndex: 1100,
    },
    title: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#2D2D2D",
      marginBottom: "15px",
    },
    message: {
      fontSize: "16px",
      color: "#6C757D",
      marginBottom: "25px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
    },
    closeButton: {
      backgroundColor: "#875A7B",
      color: "#FFFFFF",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.3s",
    },
    closeButtonHover: {
      backgroundColor: "#6A4663",
    },
    logoutButton: {
      backgroundColor: "#E63946",
      color: "#FFFFFF",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.3s",
    },
    logoutButtonHover: {
      backgroundColor: "#D62839",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <div style={styles.title}>Logout Warning</div>
        <div style={styles.message}>
          Are you sure you want to log out? Any unsaved changes will be lost.
        </div>
        <div style={styles.buttonContainer}>
          <button
            style={styles.closeButton}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor =
                styles.closeButtonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor =
                styles.closeButton.backgroundColor)
            }
            onClick={onClose}
          >
            Close
          </button>
          <button
            style={styles.logoutButton}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor =
                styles.logoutButtonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor =
                styles.logoutButton.backgroundColor)
            }
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const LogoutPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const navigate = useNavigate();

  // Close the popup and redirect to /home
  const handleClose = () => {
    setIsPopupOpen(false);
    navigate("/home"); // Redirect to home when the popup is closed
  };

  // Handle logout: clear JWT token and redirect to /home
  const handleLogout = () => {
    localStorage.removeItem("x-auth-token"); // Clear JWT token
    navigate("/"); // Redirect to home after logout
  };

  return (
    <div>
      <LogoutPopup
        isOpen={isPopupOpen}
        onClose={handleClose}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default LogoutPage;
