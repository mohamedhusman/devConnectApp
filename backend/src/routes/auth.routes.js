import express from "express";
import {
  registerUser,
  loginUser,
  checkAuth,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/userVerify.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/check-auth", authenticate, checkAuth);

export default router;
