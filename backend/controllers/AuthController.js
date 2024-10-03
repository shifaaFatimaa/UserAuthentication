const User = require("../models/User");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = await User.create({ email, password, name });

    const token = createSecretToken(user._id);

    // Send the token via a cookie
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    // Respond to client with success
    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user,
    });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
