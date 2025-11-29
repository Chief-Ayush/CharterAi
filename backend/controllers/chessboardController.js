const predictionEngine = require("../utils/predictionEngine");

/**
 * Controller for Financial Chessboard API
 */

/**
 * GET /api/chessboard/timeline
 * Get base 30-day timeline without any moves
 */
exports.getBaseTimeline = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId; // Adjust based on your auth middleware
    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }

    const startDate = req.query.startDate
      ? new Date(req.query.startDate)
      : new Date();

    const result = await predictionEngine.simulate(userId, { type: "none" }, startDate);

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    res.json({
      timeline: result.updatedTimeline,
      success: true,
    });
  } catch (error) {
    console.error("Get Base Timeline Error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/chessboard/simulate-move
 * Simulate a financial move and return predictions
 * Body: { move: { type, amount, oldDay, newDay, ... } }
 */
exports.simulateMove = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId; // Adjust based on your auth middleware
    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }

    const { move, startDate } = req.body;
    if (!move || !move.type) {
      return res.status(400).json({ error: "Move object required with type" });
    }

    const start = startDate ? new Date(startDate) : new Date();
    const result = await predictionEngine.simulate(userId, move, start);

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    res.json(result);
  } catch (error) {
    console.error("Simulate Move Error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/chessboard/validate-move
 * Quick validation without full simulation
 * Body: { move: { type, ... } }
 */
exports.validateMove = async (req, res) => {
  try {
    const { move } = req.body;

    // Basic validation rules
    const errors = [];

    if (!move.type) {
      errors.push("Move type is required");
    }

    if (["delay_payment", "receive_early"].includes(move.type)) {
      if (!move.oldDay || !move.newDay) {
        errors.push("Both oldDay and newDay required");
      }
      if (move.oldDay < 1 || move.oldDay > 30 || move.newDay < 1 || move.newDay > 30) {
        errors.push("Days must be between 1 and 30");
      }
    }

    if (["add_expense", "postpone_gst"].includes(move.type)) {
      if (!move.amount || move.amount <= 0) {
        errors.push("Valid amount required");
      }
    }

    if (move.type === "short_loan") {
      if (!move.loanAmount || move.loanAmount <= 0) {
        errors.push("Valid loan amount required");
      }
    }

    res.json({
      valid: errors.length === 0,
      errors,
    });
  } catch (error) {
    console.error("Validate Move Error:", error);
    res.status(500).json({ error: error.message });
  }
};
