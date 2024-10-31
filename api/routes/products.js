const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Create a new product in the database
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
