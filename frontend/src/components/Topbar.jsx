import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import axiosInstance from "../config/axiosConfig";

const Topbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use navigate for redirect

  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    console.log(token);
    if (token) {
      // Fetch user data from backend if token exists
      axiosInstance
        .get("/users/getuser")
        .then((response) => {
          setUser(response.data); // Set user data
          setLoading(false); // Set loading to false after data is fetched
        })
        .catch(() => {
          setLoading(false); // Set loading to false in case of error
        });
    } else {
      setLoading(false); // No token, stop loading
    }
  }, []);

  const handleLoginClick = () => {
    navigate("/login"); // Redirect to login page
  };

  const styles = {
    topbar: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: "60px",
      backgroundColor: "#FFFFFF",
      color: "#2D2D2D",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      zIndex: 1001,
      borderBottom: "1px solid #E5E7EB",
      fontFamily: "'Inter', sans-serif",
    },
    logo: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#875A7B",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    profile: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    profilePic: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#F8F9FA",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#2D2D2D",
      fontSize: "16px",
      fontWeight: "bold",
    },
    username: {
      fontSize: "14px",
      color: "#6C757D",
    },
    loginBtn: {
      padding: "8px 16px",
      backgroundColor: "#875A7B",
      color: "#FFFFFF",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.topbar}>
      <div style={styles.logo}>SyncDocs</div>
      <div style={styles.profile}>
        {loading ? (
          <div>Loading...</div>
        ) : user ? (
          <>
            <div style={styles.profilePic}>{user.name.charAt(0)}</div>
            <span style={styles.username}>Hello, {user.name}</span>
          </>
        ) : (
          <button style={styles.loginBtn} onClick={handleLoginClick}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
