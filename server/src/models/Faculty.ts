import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for Faculty
export interface IFaculty extends Document {
  fullName: string;
  email: string;
  facultyID: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Faculty Schema Definition
const facultySchema: Schema = new Schema<IFaculty>(
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
    facultyID: {
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

// Exporting the Faculty model
const Faculty: Model<IFaculty> = mongoose.model<IFaculty>(
  "Faculty",
  facultySchema
);
export default Faculty;
