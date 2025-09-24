import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    bio: { type: String, maxLength: 250 },
    skills: [String],
    githubLink: String,
    projects: [
      {
        title: String,
        description: String,
        link: String,
      },
    ],
    profilePic: {
      type: String,
      default: "https://www.w3schools.com/howto/img_avatar.png",
    },
    feedbacks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedback",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
