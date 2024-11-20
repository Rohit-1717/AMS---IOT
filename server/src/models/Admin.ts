import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for Admin
export interface IAdmin extends Document {
  role: "HOD" | "Director";
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Admin Schema Definition
const adminSchema: Schema<IAdmin> = new Schema(
  {
    role: {
      type: String,
      enum: ["HOD", "Director"], // Ensure only HOD or Director roles are allowed
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"], // Email validation regex
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Password must be at least 6 characters
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Exporting the Admin model
const Admin: Model<IAdmin> = mongoose.model<IAdmin>("Admin", adminSchema);
export default Admin;
