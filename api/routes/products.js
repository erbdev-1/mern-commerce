const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Get all products");
});

module.exports = router;
