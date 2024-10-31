const express = require("express");
const router = express.Router();

// Import routes
const productRoute = require("./products.js");
const categoryRoute = require("./categories.js");
const authRoute = require("./auth.js");
const couponRoute = require("./coupons.js");

// Use routes
router.use("/products", productRoute);
router.use("/categories", categoryRoute);
router.use("/auth", authRoute);
router.use("/coupons", couponRoute);

module.exports = router;
