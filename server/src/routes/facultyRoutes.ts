import express from "express";
import {
  registerFaculty,
  loginFaculty,
  resetPassword,
  logoutFaculty,
} from "../controllers/FacultyController";

const facultyRouter = express.Router();

// Faculty routes
facultyRouter.post("/register", registerFaculty);
facultyRouter.post("/login", loginFaculty);
facultyRouter.patch("/reset-password", resetPassword);
facultyRouter.post("/logout", logoutFaculty);

export default facultyRouter;
