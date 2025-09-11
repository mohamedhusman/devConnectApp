import express from "express";

import {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  logoutUser,
} from "../controllers/user.controller.js";
import { authenticate } from "../middleware/userVerify.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", authenticate, updateUserById);
router.delete("/:id", authenticate, deleteUserById);
router.post("/logout", authenticate, logoutUser);

export default router;
