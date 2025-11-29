const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/auth");
const {
  uploadDocument,
  getUserDocuments,
  getDocumentById,
  updateDocumentStatus,
  deleteDocument,
} = require("../controllers/documentController");

// All routes require authentication
router.use(authMiddleware);

// POST /api/documents/upload - Upload a document
router.post("/upload", upload.single("document"), uploadDocument);

// GET /api/documents - Get all user documents (with optional filters)
router.get("/", getUserDocuments);

// GET /api/documents/:id - Get single document by ID
router.get("/:id", getDocumentById);

// PATCH /api/documents/:id/status - Update document review status
router.patch("/:id/status", updateDocumentStatus);

// DELETE /api/documents/:id - Delete document
router.delete("/:id", deleteDocument);

module.exports = router;
