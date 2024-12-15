import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const styles = {
    sidebar: {
      position: "fixed",
      top: "60px", // Start below the Topbar
      left: 0,
      height: "calc(100vh - 60px)", // Full height minus Topbar
      width: "250px",
      backgroundColor: "#F8F9FA", // Light gray
      paddingTop: "20px",
      color: "#2D2D2D", // Dark text
      fontFamily: "'Inter', sans-serif",
      borderRight: "1px solid #E5E7EB", // Subtle border
    },
    menu: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    menuItem: {
      padding: "15px 20px",
      color: "#6C757D", // Muted gray text
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s, color 0.3s",
      borderRadius: "8px", // Rounded effect
      margin: "0 10px",
      textDecoration: "none", // Remove underline
    },
    activeMenuItem: {
      backgroundColor: "#875A7B", // Purple for active
      color: "#FFFFFF", // White text
      fontWeight: "bold",
    },
    createProjectButton: {
      margin: "20px",
      padding: "10px 15px",
      backgroundColor: "#875A7B", // Purple button
      color: "#FFFFFF", // White text
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      textAlign: "center",
      outline: "none",
      transition: "background-color 0.3s",
    },
    createProjectButtonHover: {
      backgroundColor: "#6A4663", // Darker purple hover
    },
  };

  const menuItems = [
    { name: "Dashboard", path: "/home" },
    { name: "Projects", path: "/projects" },
    { name: "Documents", path: "/documents" },
    { name: "Team Management", path: "/team" },
    { name: "Settings", path: "/settings" },
    { name: "Logout", path: "/logout" },
  ];

  const handleCreateProject = () => {
    console.log("Create New Project clicked");
    alert("Create New Project modal or page can be implemented here.");
  };

  return (
    <div style={styles.sidebar}>
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
      <ul style={styles.menu}>
        {menuItems.map((item) => (
          <li
            key={item.name}
            style={{
              ...styles.menuItem,
              ...(activeItem === item.name ? styles.activeMenuItem : {}),
            }}
          >
            <NavLink
              to={item.path}
              style={{ color: "inherit", textDecoration: "none" }} // Maintain text color and remove underline
              onClick={() => setActiveItem(item.name)}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
