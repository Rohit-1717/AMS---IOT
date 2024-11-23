import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs"; // Use bcryptjs

// Define Faculty Schema interface that extends Document
export interface IFaculty extends Document {
  facultyId: string;
  email: string;
  password: string;
  role: string;
  comparePassword: (enteredPassword: string) => Promise<boolean>;
}

// Define Faculty Schema
const facultySchema: Schema = new Schema(
  {
    facultyId: {
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
      default: "faculty", // Default role is 'faculty'
    },
  },
  {
    timestamps: true,
  }
);

// Password hashing middleware
facultySchema.pre<IFaculty>("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  // Hash the password using bcryptjs
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
facultySchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the Faculty model
const Faculty = mongoose.model<IFaculty>("Faculty", facultySchema);

export default Faculty;
