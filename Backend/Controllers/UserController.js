const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const userController = require("express").Router();
const jwt = require("jsonwebtoken");

userController.post("/login", async (req, res) => {
  try {
    const validUser = await User.findOne({ email: req.body.email });

    if (!validUser) throw new Error("Invalid Credentials email");

    const confirmPasswords = await bcrypt.compare(
      req.body.password,
      validUser.password
    );

    if (!confirmPasswords) throw new Error("Invalid Credentials password");

    const { password, ...others } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.status(200).json({ token, ...others });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
userController.post("/signup", async (req, res) => {
  try {
    console.log("hi there")
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      throw new Error("Email already used...Please try unique email address!");

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    //Extract Password
    const { password, ...others } = newUser._doc;

    //Create Token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    //Send token and Data
    res.status(200).json({ token, ...others });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = userController;
