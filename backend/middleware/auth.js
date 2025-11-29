const User = require("../models/userModel");

/**
 * Simple authentication middleware
 * Checks if user exists based on userId in request body or query
 * In production, this should use JWT tokens from headers
 */
const authMiddleware = async (req, res, next) => {
  try {
    // For now, get userId from body, query, or header
    // In production, extract from JWT token
    const userId =
      req.body.userId || req.query.userId || req.headers["x-user-id"];

    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ error: "Invalid user" });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ error: "Authentication failed" });
  }
};

module.exports = authMiddleware;
