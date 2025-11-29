const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();

const chatRoutes = require("./routes/chatRoutes");
const authRoutes = require("./routes/authRoute");
const chessboardRoutes = require("./routes/chessboard");
const documentRoutes = require("./routes/documentRoute");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chessboard", chessboardRoutes);
app.use("/api/documents", documentRoutes);

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
