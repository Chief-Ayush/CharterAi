const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Import routes
const authRoutes = require("./routes/authRoute");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "CharterAI Backend API" });
});

// Database connection and server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db and listening at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
