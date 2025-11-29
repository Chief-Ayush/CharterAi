const express = require("express");
const router = express.Router();
const chessboardController = require("../controllers/chessboardController");

/**
 * Financial Chessboard Routes
 */

// Get base 30-day timeline
router.get("/timeline", chessboardController.getBaseTimeline);

// Simulate a financial move
router.post("/simulate-move", chessboardController.simulateMove);

// Validate a move (quick check)
router.post("/validate-move", chessboardController.validateMove);

module.exports = router;
