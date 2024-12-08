import { Request, Response } from "express";
import Admin, { IAdmin } from "../models/Admin.modal";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/AsyncHandler";
import jwt from "jsonwebtoken";

// Types for request bodies
interface RegisterRequestBody {
  email: string;
  password: string;
  role?: "super-admin" | "admin";
}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface ResetPasswordRequestBody {
  email: string;
  oldPassword: string;
  newPassword: string;
}

// Type for admin response
interface AdminResponse {
  _id: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// Generate JWT Token
const generateToken = (admin: IAdmin): string => {
  if (!process.env.JWT_SECRET) {
    throw new ApiError(500, "JWT_SECRET is not defined");
  }

  return jwt.sign(
    {
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// Helper function to sanitize admin object
const sanitizeAdminResponse = (admin: IAdmin): AdminResponse => {
  return {
    _id: admin._id.toString(),
    email: admin.email,
    role: admin.role,
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
  };
};

/**
 * Register a new admin
 * @route POST /api/admin/register
 * @access Public
 */
const registerAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role = "admin" }: RegisterRequestBody = req.body;

  // Validate request body
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
  if (existingAdmin) {
    throw new ApiError(409, "Admin with this email already exists");
  }

  // Create new admin
  const admin = await Admin.create({
    email: email.toLowerCase(),
    password,
    role,
  });

  // Generate token
  const token = generateToken(admin);

  // Sanitize admin response
  const sanitizedAdmin = sanitizeAdminResponse(admin);

  res.status(201).json(
    new ApiResponse(
      201,
      {
        admin: sanitizedAdmin,
        token,
      },
      "Admin registered successfully"
    )
  );
});

/**
 * Login admin
 * @route POST /api/admin/login
 * @access Public
 */
const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: LoginRequestBody = req.body;

  // Validate request body
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // Find admin by email
  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Check password
  const isPasswordValid = await admin.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Generate token
  const token = generateToken(admin);

  // Sanitize admin response
  const sanitizedAdmin = sanitizeAdminResponse(admin);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        admin: sanitizedAdmin,
        token,
      },
      "Login successful"
    )
  );
});

/**
 * Reset admin password
 * @route POST /api/admin/reset-password
 * @access Private
 */
const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email, oldPassword, newPassword }: ResetPasswordRequestBody =
    req.body;

  // Validate request body
  if (!email || !oldPassword || !newPassword) {
    throw new ApiError(400, "All fields are required");
  }

  // Find admin by email
  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  // Verify old password
  const isPasswordValid = await admin.comparePassword(oldPassword);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid current password");
  }

  // Validate new password
  if (newPassword.length < 6) {
    throw new ApiError(400, "New password must be at least 6 characters long");
  }

  // Update password
  admin.password = newPassword;
  await admin.save();

  res.status(200).json(new ApiResponse(200, null, "Password reset successful"));
});

/**
 * Logout admin (client removes the token)
 * @route POST /api/admin/logout
 * @access Private
 */
const logoutAdmin = asyncHandler(async (req: Request, res: Response) => {
  // Clear the JWT token on the client-side (done by the client)
  res.clearCookie("token"); // if you're using cookies to store the token

  res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));
});

export { registerAdmin, loginAdmin, resetPassword, logoutAdmin };
