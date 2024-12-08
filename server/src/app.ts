import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import connectDB from "./config/database";
import adminRoutes from "./routes/adminRoutes";
import studentRoutes from "./routes/studentRoutes"
import facultyRoutes from "./routes/facultyRoutes";
import { ApiError } from "./utils/ApiError";

dotenv.config({ path: ".env" });

const app = express();

// Connect to MongoDB
connectDB();

// Define Allowed Origins
const allowedOrigins = [
  process.env.DEV_FRONTEND_URL || "http://localhost:5173", // Development frontend URL
  process.env.PROD_FRONTEND_URL || "https://your-production-frontend.com", // Production frontend URL
];

// Middleware Setup
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
); // Enable CORS with credentials support

app.use(helmet()); // Add security headers
app.use(compression()); // Enable GZIP compression for responses
app.use(bodyParser.json()); // Parse JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded payloads

// Logging with morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev")); // Detailed logs in development
} else {
  app.use(morgan("combined")); // Standard logs in production
}

// Route Setup
app.use("/api/admin", adminRoutes); // Admin-specific routes
app.use("/api/students",studentRoutes) // student-specific routes
app.use("/api/faculty",facultyRoutes) // faculty-specific routes

// Catch-All Route for Undefined Endpoints
app.use((req, res, next) => {
  next(new ApiError(404, `Cannot ${req.method} ${req.originalUrl}`)); // Use ApiError for unhandled routes
});

// Global Error Handler
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack, // Hide stack trace in production
  });
});

export default app;
