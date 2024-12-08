import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/AsyncHandler";
import Student, { IStudent } from "../models/Student.modal"; // Import the Student model
import jwt from "jsonwebtoken";

// Register a new student
export const registerStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const { enrollmentNumber, email, password, role, fullName } = req.body;

    // Validate request body
    if (!email || !password || !enrollmentNumber || !fullName) {
      throw new ApiError(
        400,
        "Email, enrollment number, password, and full name are required"
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ApiError(400, "Invalid email format");
    }

    // Check if student already exists
    const studentExists = await Student.findOne({ email: email.toLowerCase() });
    if (studentExists) {
      throw new ApiError(400, "Student with this email already exists");
    }

    // Create new student
    const student = new Student({
      enrollmentNumber,
      email: email.toLowerCase(),
      password,
      role,
      fullName,
    });

    // Save the student to the database
    await student.save();

    res
      .status(201)
      .json(new ApiResponse(201, null, "Student registered successfully"));
  }
);

// Login student and issue JWT token
export const loginStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const { enrollmentNumber, password } = req.body;

    // Validate input fields
    if (!enrollmentNumber || !password) {
      throw new ApiError(400, "Enrollment number and password are required");
    }

    // Find student by enrollment number
    const student = await Student.findOne({ enrollmentNumber });
    if (!student) {
      throw new ApiError(401, "Invalid credentials");
    }

    // Compare the provided password with the hashed password using comparePassword method
    const isMatch = await student.comparePassword(password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign(
      { studentId: student._id, role: student.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.status(200).json(new ApiResponse(200, { token }, "Login successful"));
  }
);

// Reset student password
export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, oldPassword, newPassword } = req.body;

    // Validate input fields
    if (!email || !oldPassword || !newPassword) {
      throw new ApiError(400, "All fields are required");
    }

    // Find student by email
    const student = await Student.findOne({ email: email.toLowerCase() });
    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    // Verify old password
    const isPasswordValid = await student.comparePassword(oldPassword);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid current password");
    }

    // Validate new password length
    if (newPassword.length < 6) {
      throw new ApiError(
        400,
        "New password must be at least 6 characters long"
      );
    }

    // Update and hash the new password
    student.password = newPassword; // This will trigger the pre-save hook
    await student.save();

    res
      .status(200)
      .json(new ApiResponse(200, null, "Password reset successful"));
  }
);

// Logout student (clear JWT token)
export const logoutStudent = asyncHandler(
  async (req: Request, res: Response) => {
    // In a real-world scenario, you might handle token invalidation.
    res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));
  }
);
