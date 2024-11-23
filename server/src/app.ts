import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import connectDB from "./config/database"; // Adjust path if needed
import adminRoutes from "./routes/adminRoutes"; // Import your routes
import { ApiError } from "./utils/ApiError";

dotenv.config({
  path: ".env",
});

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://example.com",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
); // Enable CORS
app.use(helmet()); // Add security headers
app.use(compression()); // Enable GZIP compression
app.use(bodyParser.json()); // Parse JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded payloads

// Logging (use morgan for request logging)
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev")); // Detailed logs in development
} else {
  app.use(morgan("combined")); // Standard logs in production
}

// Add routes
app.use("/api/admin", adminRoutes); // Prefix routes with /api/admin

// Fallback for unhandled routes
app.use((req, res, next) => {
  throw new ApiError(404, `Cannot ${req.method} ${req.originalUrl}`);
});

// Global Error Handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: err.message || "Internal Server Error",
      errors: err.errors || [],
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
  }
);

export default app;
