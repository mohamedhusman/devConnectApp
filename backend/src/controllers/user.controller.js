import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    // .select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.json({ message: "Error fetching user", error: error.message });
  }
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { name, email, bio, skills, githubLink, projects, profilePic } =
    req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedProfilePic = profilePic
      ? await cloudinary.uploader.upload(profilePic)
      : null;

    user.name = name || user.name;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.skills = skills || user.skills;
    user.githubLink = githubLink || user.githubLink;
    user.projects = projects || user.projects;
    user.profilePic = updatedProfilePic
      ? updatedProfilePic.secure_url
      : user.profilePic;

    const updatedUser = await user.save();
    const { password, ...rest } = updatedUser;

    res.json({
      message: "User updated successfully",
      user: rest,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

const logoutUser = (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "logged out successfully" });
};

export { getAllUsers, getUserById, updateUserById, deleteUserById, logoutUser };
