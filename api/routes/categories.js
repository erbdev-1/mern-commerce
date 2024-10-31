const express = require("express");
const router = express.Router();
const Category = require("../models/Category.js");

// Create a new category
router.post("/", async (req, res) => {
  try {
    const { name, img } = req.body;
    const newCategory = new Category({ name, img });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
  }
});

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get a single category (Read operation)
router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
