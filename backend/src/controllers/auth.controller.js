import User from "../models/User.js";
import bcrypt from "bcrypt";
import createToken from "../utils/createToken.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res
      .status(400)
      .json({ message: "This email is already registered" });
  }

  //Hadh the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      userCredentials: {
        name: newUser.name,
        email: newUser.email,
        id: newUser._id,
      },
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error registering user", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const existUser = await User.findOne({ email: email });
    if (!existUser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    createToken(res, existUser._id);
    res.status(200).json({
      message: "User logged in successfully",
      userCredentials: {
        name: existUser.name,
        email: existUser.email,
        id: existUser._id,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong!", error: error.message });
  }
};

const checkAuth = async (req, res) => {
  res.json(req.user);
};
export { registerUser, loginUser, checkAuth };
