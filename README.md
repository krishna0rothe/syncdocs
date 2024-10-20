﻿# 📚 SyncDocs: Your Documentation Companion

Welcome to **SyncDocs**! SyncDocs is a powerful **SaaS-based documentation management platform** designed for software development teams, research teams, startups, and enterprises. It automates and simplifies the process of maintaining up-to-date documentation by seamlessly integrating with Git and leveraging AI capabilities. 

---

## 🌟 Features

### 🔗 1. Git Integration
- **Automatic Syncing**: SyncDocs connects with your Git repositories to detect code changes and automatically update the associated documentation. No more manual updates! 🛠️
- **Version History**: Track every change with full version history, allowing you to roll back to previous states easily. 📜

### 🔒 2. Role-Based Access Control (RBAC)
- **Secure Collaboration**: Define user roles (Admin, Editor, Contributor, Viewer) to control access and permissions effectively. 🔑
- **Accountability**: Maintain accountability and security in your documentation processes.

### 📝 3. Real-Time Collaboration
- **Simultaneous Editing**: Multiple users can edit documents in real-time, ensuring a seamless collaborative experience. 💻🤝
- **Notifications**: Get notified of important changes made by team members to stay updated. 🔔

### 📑 4. Custom Templates
- **Standardization**: Create and enforce custom templates for coding and documentation standards. 📏
- **Dynamic Updates**: Easily update templates and apply them to existing documents.

### 💡 5. AI-Assisted Documentation
- **Smart Suggestions**: Utilize AI to auto-generate documentation based on your code, providing function definitions and explanations. 🤖
- **Content Generation**: Get intelligent recommendations for technical documents like APIs and user guides.

### 💬 6. Live Code Snippets
- **Embedded Snippets**: Insert live code snippets directly into your documentation, ensuring accuracy and consistency. 📌
- **Automatic Updates**: Code snippets update automatically if changes occur in the codebase.

### 📥 7. Contribution Tracking
- **Change Logs**: Keep track of contributions from all users, showing who made changes and when. 📊
- **Transparency**: Maintain transparency and accountability in collaborative environments.

### 🛠️ 8. VS Code Extension
- **In-IDE Management**: Manage your documentation directly from Visual Studio Code with our extension. 🖥️
- **Quick Updates**: Detect code changes and update documentation without leaving your development environment.

---

## Ditectory Structure
SyncDocs/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js         # Database connection setup (MongoDB)
│   │   ├── controllers/
│   │   │   └── authController.js  # Authentication logic (login, signup)
│   │   │   └── userController.js  # Role and user management
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js  # JWT token validation
│   │   │   └── roleMiddleware.js  # Role-based access control logic (RBAC)
│   │   ├── models/
│   │   │   └── User.js       # User schema (Mongoose)
│   │   │   └── Role.js       # Role schema (Mongoose)
│   │   ├── routes/
│   │   │   └── authRoutes.js # Routes for authentication (login, signup)
│   │   │   └── userRoutes.js # Routes for user/role management
│   │   ├── services/
│   │   │   └── authService.js # JWT token generation and validation
│   │   │   └── userService.js # Role-based service logic
│   │   ├── utils/
│   │   │   └── errorHandler.js # Centralized error handling logic
│   │   ├── app.js            # Main app setup (Express instance)
│   │   └── server.js         # Server entry point
│   ├── .env                  # Environment variables (DB connection, JWT secret)
│   ├── package.json          # Backend dependencies
│   └── README.md
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Auth/
│   │   │       └── Login.js  # Login component (React)
│   │   │       └── Signup.js # Signup component (React)
│   │   ├── pages/
│   │   │   └── Home.js       # Homepage component
│   │   │   └── Dashboard.js  # Dashboard component after login
│   │   ├── services/
│   │   │   └── authService.js # API calls for authentication
│   │   ├── utils/
│   │   │   └── api.js        # Axios instance setup for API calls
│   │   └── App.js            # Main app setup with routing
│   │   └── index.js          # Entry point of React app
│   ├── package.json          # Frontend dependencies
│   └── README.md
│
├── docker/
│   ├── Dockerfile.backend    # Dockerfile for backend
│   ├── Dockerfile.frontend   # Dockerfile for frontend
│   └── docker-compose.yml    # Docker Compose setup
├── .gitignore                # Git ignore file
├── README.md                 # Project overview
└── LICENSE


---

## 🚀 Getting Started

### 1. Installation

To get started with SyncDocs, clone this repository and install the required dependencies:

```bash
git clone https://github.com/yourusername/syncdocs.git
cd syncdocs
npm install


