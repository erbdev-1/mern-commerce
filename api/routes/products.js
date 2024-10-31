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
    console.log(err);
    res.status(500).json({ err: "Failed to create product" });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // Get all products from the database

    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

// Get a product by id
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ err: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Server Error" });
  }
});

// Update a product by id
router.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;

    console.log("Updates received:", updates);

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ err: "Product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Server Error" });
  }
});

// Delete a product by id
router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ err: "Product not found" });
    }

    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Server Error" });
  }
});

module.exports = router;
