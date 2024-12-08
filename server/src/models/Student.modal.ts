import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs"; // Use bcryptjs

// Define Student Schema interface that extends Document
export interface IStudent extends Document {
  enrollmentNumber: string;
  email: string;
  password: string;
  role: string;
  fullName: string; // Add fullName to the interface
  comparePassword: (enteredPassword: string) => Promise<boolean>;
}

// Define Student Schema
const studentSchema: Schema = new Schema(
  {
    fullName: {
      // Add fullName field
      type: String,
      required: true, // Make it required
      trim: true,
    },
    enrollmentNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "student", // Default role is 'student'
    },
  },
  {
    timestamps: true,
  }
);

// Password hashing middleware
studentSchema.pre<IStudent>("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Hash the password using bcryptjs
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
studentSchema.methods.comparePassword = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the Student model
const Student = mongoose.model<IStudent>("Student", studentSchema);

export default Student;
