import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend API URL
  timeout: 5000, // Request timeout of 5 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the 'x-auth-token' if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("x-auth-token"); // Get the token from localStorage
    if (token) {
      config.headers["x-auth-token"] = token; // Add token to headers if available
    }
    return config; // Return the config object with updated headers
  },
  (error) => {
    return Promise.reject(error); // Reject the request if an error occurs
  }
);


export default axiosInstance;
