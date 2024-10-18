import React, { useState } from "react";
import axiosInstance from "../config/axiosConfig";

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Dummy validation function (as we don’t have a real endpoint for checking username/email)
  const validateField = (name, value) => {
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors({ ...errors, email: "Invalid email format" });
      } else {
        setErrors({ ...errors, email: "" });
      }
    }

    if (name === "username") {
      if (value.length < 3) {
        setErrors({
          ...errors,
          username: "Username must be at least 3 characters long",
        });
      } else {
        setErrors({ ...errors, username: "" });
      }
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords do not match" });
      return;
    }
    try {
      const response = await axiosInstance.post("/auth/register", formData);
      setSuccessMessage(
        "Registration successful! Please check your email to verify your account."
      );
    } catch (error) {
      setErrors({
        ...errors,
        submit: "Registration failed. Please try again.",
      });
    }
  };

  return (
    <div className="registration-page">
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
        <a href="/login" className="login-link">
          Already have an account? Log in
        </a>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <h1>Create your SyncDocs account</h1>

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={(e) => validateField("username", e.target.value)}
              required
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={(e) => validateField("email", e.target.value)}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={Object.values(errors).some((error) => error !== "")}
          >
            Sign Up
          </button>

          {errors.submit && <span className="error">{errors.submit}</span>}
          {successMessage && <span className="success">{successMessage}</span>}

          <p className="terms">
            By creating an account, you agree to our{" "}
            <a href="/terms">Terms of Service</a> and{" "}
            <a href="/privacy">Privacy Policy</a>.
          </p>
        </form>
      </main>
      <style jsx>{`
        .registration-page {
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

        .login-link {
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

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
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

        .terms {
          font-size: 0.8rem;
          color: #333333;
          text-align: center;
          margin-top: 1rem;
        }

        .terms a {
          color: #5d737e;
          text-decoration: none;
        }

        .terms a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
  