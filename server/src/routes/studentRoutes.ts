import express from "express";
import {
  registerStudent,
  loginStudent,
  resetPassword,
  logoutStudent,
} from "../controllers/StudentController";

const studentRouter = express.Router();

// Student routes
studentRouter.post("/register", registerStudent);
studentRouter.post("/login", loginStudent);
studentRouter.patch("/reset-password", resetPassword);
studentRouter.post("/logout", logoutStudent);

export default studentRouter;
