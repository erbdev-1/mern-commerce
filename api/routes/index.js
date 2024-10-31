const express = require("express");
const router = express.Router();

// Import routes
const productRoute = require("./products.js");
const categoryRoute = require("./categories.js");
const authRoute = require("./auth.js");

// Use routes
router.use("/products", productRoute);
router.use("/categories", categoryRoute);
router.use("/auth", authRoute);

module.exports = router;
