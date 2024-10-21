import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";

export default function LoginPage() {
  const [username, setUsername] = useState(""); // Renamed from formData to username
  const [password, setPassword] = useState(""); // Added separate state for password
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      }); // Sending username and password directly
      const token = response.data.token; // Assuming the JWT token is returned in the response

      // Store the token in localStorage
      localStorage.setItem("x-auth-token", token);

      // Set the default Axios Authorization header
      axiosInstance.defaults.headers.common["x-auth-token"] = token;

      setSuccessMessage("Login successful! Redirecting...");
      // Here you would typically handle the successful login,
      // such as redirecting to a dashboard
      // Example: window.location.href = "/dashboard";
      navigate("/home")
    } catch (error) {
      setError("Invalid username/email or password. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <header>
        <div className="logo">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="#5D737E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="#5D737E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="#5D737E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>SyncDocs</span>
        </div>
        <a href="/register" className="register-link">
          Don't have an account? Sign up
        </a>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <h1>Welcome back to SyncDocs</h1>
          <div className="form-group">
            <label htmlFor="username">Username or Email</label>
            <input
              type="text"
              id="username"
              name="username" // Updated to match the new state
              value={username} // Updated to use the new state variable
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password" // Updated to match the new state
              value={password} // Updated to use the new state variable
              onChange={handleChange}
              required
            />
          </div>
          <a href="/forgot-password" className="forgot-password">
            Forgot Password?
          </a>
          <button type="submit">Login</button>
          {error && <span className="error">{error}</span>}
          {successMessage && <span className="success">{successMessage}</span>}
          <p className="signup-prompt">
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </form>
      </main>
      <style jsx>{`
        .login-page {
          font-family: Arial, sans-serif;
          background-color: #f4f7f6;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background-color: #ffffff;
        }

        .logo {
          display: flex;
          align-items: center;
          color: #5d737e;
          font-weight: bold;
        }

        .logo svg {
          margin-right: 0.5rem;
        }

        .register-link {
          color: #5d737e;
          text-decoration: none;
          font-size: 0.9rem;
        }

        main {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }

        form {
          background-color: #ffffff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        h1 {
          color: #5d737e;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          color: #333333;
        }

        input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #a7bfc2;
          border-radius: 4px;
          font-size: 1rem;
        }

        .forgot-password {
          display: block;
          text-align: right;
          color: #a7bfc2;
          font-size: 0.9rem;
          margin-bottom: 1rem;
          text-decoration: none;
        }

        .forgot-password:hover {
          text-decoration: underline;
        }

        button {
          width: 100%;
          padding: 0.75rem;
          background-color: #5d737e;
          color: #ffffff;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #49707c;
        }

        .error {
          color: #ff6b6b;
          font-size: 0.9rem;
          margin-top: 0.25rem;
          display: block;
        }

        .success {
          color: #42a695;
          font-size: 0.9rem;
          margin-top: 0.25rem;
          display: block;
        }

        .signup-prompt {
          font-size: 0.9rem;
          color: #333333;
          text-align: center;
          margin-top: 1rem;
        }

        .signup-prompt a {
          color: #5d737e;
          text-decoration: none;
        }

        .signup-prompt a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
