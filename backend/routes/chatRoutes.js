// backend/routes/chatRoute.js
const express = require("express");
const router = express.Router();

const { handleUserMessage } = require("../controllers/chatController");

// Only one job -> forward request to controller
router.post("/", handleUserMessage);

module.exports = router;
