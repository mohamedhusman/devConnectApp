import express from "express";
import {
  getFeedbackById,
  postFeedback,
} from "../controllers/feedback.Controller.js";

const router = express.Router();

router.route("/:id").get(getFeedbackById).post(postFeedback);

export default router;
