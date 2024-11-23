import express from "express";
import {
  registerAdmin,
  loginAdmin,
  resetPassword,
  logoutAdmin,
} from "../controllers/AdminController";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.patch("/reset-password", resetPassword);
router.post("/logout", logoutAdmin);
export default router;
