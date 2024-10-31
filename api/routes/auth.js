const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Generate random avatar for user
const generateRandomAvatar = () => {
  const randomAvatar = Math.floor(Math.random() * 100);
  return `https://i.pravatar.cc/150?img=${randomAvatar}`;
};

// @route   POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const defaultAvatar = generateRandomAvatar();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email is already existed." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar: defaultAvatar,
    });

    await newUser.save();

    // We set the payload to the user id
    const payload = { user: { id: newUser.id } };

    // We sign the token with the payload and the secret key
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ msg: "Token generation failed" });
        }
        res.status(201).json({
          token,
          user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            avatar: newUser.avatar,
          },
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    // We set the payload to the user id and sign the token
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ msg: "Token generation failed" });
        }
        res.status(200).json({
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
          },
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Server Error" });
  }
});

module.exports = router;
