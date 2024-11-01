const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const logger = require("morgan");
const mainRoute = require("./routes/index");
const PORT = 5000;

dotenv.config();

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

//Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use("/api", mainRoute);

app.listen(PORT, (req, res) => {
  connect();
  console.log("Server is running on port 3000");
});
