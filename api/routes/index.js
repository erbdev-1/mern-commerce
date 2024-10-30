const express = require("express");
const router = express.Router();

// Import routes
const productRoute = require("./products.js");
const categoryRoute = require("./categories.js");

// Use routes
router.use("/products", productRoute);
router.use("/categories", categoryRoute);

module.exports = router;
