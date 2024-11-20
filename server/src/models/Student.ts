import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for Student
export interface IStudent extends Document {
  fullName: string;
  email: string;
  enrollmentNumber: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Student Schema Definition
const studentSchema: Schema = new Schema<IStudent>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"],
    },
    enrollmentNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Exporting the Student model
const Student: Model<IStudent> = mongoose.model<IStudent>(
  "Student",
  studentSchema
);
export default Student;
