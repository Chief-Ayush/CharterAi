const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose")
const app = express()

const authRoutes = require("./routes/authRoute");
const chessboardRoutes = require("./routes/chessboard");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/chessboard", chessboardRoutes);

app.get("/", (req, res) => {
  res.json({ message: "CharterAI Backend API" });
});


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