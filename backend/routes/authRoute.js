const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const upload = require("../middleware/upload");

// POST /api/auth/signup - supports multipart/form-data for file uploads
router.post("/signup", upload.array("businessDocs", 5), signup);

// POST /api/auth/login
router.post("/login", login);

module.exports = router;
