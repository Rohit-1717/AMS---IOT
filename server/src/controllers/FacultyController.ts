import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/AsyncHandler";
import Faculty from "../models/Faculty.modal";
import jwt from "jsonwebtoken";

// Register a new faculty
export const registerFaculty = asyncHandler(
  async (req: Request, res: Response) => {
    const { facultyId, email, password, role } = req.body;

    // Check if faculty already exists
    const facultyExists = await Faculty.findOne({ email });
    if (facultyExists) {
      throw new ApiError(400, "Faculty with this email already exists");
    }

    // Create new faculty
    const faculty = new Faculty({
      facultyId,
      email,
      password,
      role,
    });

    // Save the faculty to the database
    await faculty.save();

    // Return success response
    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          "Faculty registered successfully",
          "No additional data"
        )
      );
  }
);

// Login faculty and issue JWT token
export const loginFaculty = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Find faculty by email
    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      throw new ApiError(400, "Invalid credentials");
    }

    // Compare the provided password with the hashed password
    const isMatch = await faculty.comparePassword(password);
    if (!isMatch) {
      throw new ApiError(400, "Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign(
      { facultyId: faculty._id, role: faculty.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Return success response with token
    res.status(200).json(new ApiResponse(200, "Login successful", token));
  }
);

// Reset faculty password
export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, newPassword } = req.body;

    // Find faculty by email
    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      throw new ApiError(400, "Faculty not found");
    }

    // Hash the new password and save it
    faculty.password = newPassword;
    await faculty.save();

    // Return success response
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Password reset successfully",
          "No additional data"
        )
      );
  }
);

// Logout faculty (clear JWT token)
export const logoutFaculty = asyncHandler(
  async (req: Request, res: Response) => {
    // Clear the JWT token (handle it based on how your authentication is structured)
    res
      .status(200)
      .json(
        new ApiResponse(200, "Logged out successfully", "No additional data")
      );
  }
);
