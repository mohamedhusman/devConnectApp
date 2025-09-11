import Feedback from "../models/Feedback.js";

const getFeedbackById = async (req, res) => {
  const { id } = req.params;
  try {
    const feedback = await Feedback.find({ userId: id });
    if (feedback.length === 0) {
      return res.status(200).json({ message: "Feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const postFeedback = async (req, res) => {
  const { id } = req.params;
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newFeedback = new Feedback({
      userId: id,
      name: name,
      email: email,
      message: message,
    });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export { getFeedbackById, postFeedback };
