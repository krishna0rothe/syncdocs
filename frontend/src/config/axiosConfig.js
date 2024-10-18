import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend API URL
  timeout: 5000, // Request timeout of 5 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
