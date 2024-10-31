const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");

// Create a new coupon
router.post("/", async (req, res) => {
  try {
    const { code, discount, expirationDate } = req.body;

    if (!code || !discount || !expirationDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCoupon = new Coupon(req.body);
    await newCoupon.save();

    res.status(201).json(newCoupon);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all coupons
router.get("/", async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a coupon by ID
router.get("/:id", async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    res.status(200).json(coupon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a coupon by ID
router.put("/:id", async (req, res) => {
  try {
    const { code, discount, expirationDate } = req.body;

    if (!code && !discount && !expirationDate) {
      return res.status(400).json({ error: "At least one field is required" });
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedCoupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    res.status(200).json(updatedCoupon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a coupon by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!deletedCoupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
