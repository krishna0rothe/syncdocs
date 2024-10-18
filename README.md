# syncdocs

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
