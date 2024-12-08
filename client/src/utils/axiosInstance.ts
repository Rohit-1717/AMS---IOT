import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://ams-iot-cfxc.vercel.app/api" // Production URL
      : "http://localhost:8000/api", // Development URL
  withCredentials: true, // Include cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
