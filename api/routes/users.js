const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth"); // Middleware'i import edin

// @route   GET /api/users
// @desc    Tüm kullanıcıları al
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Sunucu hatası." });
  }
});

module.exports = router;
