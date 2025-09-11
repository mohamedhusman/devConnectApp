import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
