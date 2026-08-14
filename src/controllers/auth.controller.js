const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Provide all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "User registration success!",
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "registration failed" });
    console.log("Registration error", error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing email or password" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful!",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("Get profile error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { register, login, getMe };
