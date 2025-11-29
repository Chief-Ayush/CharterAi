const Document = require("../models/documentModel");
const User = require("../models/userModel");
const { uploadPDF } = require("../utils/cloudinary");
const { extractFieldsFromPDF } = require("../utils/ocr");

/**
 * Upload document (Invoice or Receipt)
 * POST /api/documents/upload
 */
const uploadDocument = async (req, res) => {
  try {
    const { docType } = req.body;
    const userId = req.user._id; // From auth middleware

    // Validate document type
    if (!docType || !["Invoice", "Receipt"].includes(docType)) {
      return res.status(400).json({
        error: "Invalid document type. Must be 'Invoice' or 'Receipt'",
      });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload to Cloudinary
    const uploadResult = await uploadPDF(req.file.buffer);

    // Extract OCR data
    const ocrData = await extractFieldsFromPDF(uploadResult.url);

    // Create document record
    const newDocument = new Document({
      uploadedBy: userId,
      originalFilename: req.file.originalname,
      fileUrl: uploadResult.url,
      docType: docType,
      ocrParsed: ocrData,
      reviewStatus: "pending",
      extractedVendor: ocrData.vendorName,
      extractedInvoiceNumber: ocrData.invoiceNumber,
      extractedDate: ocrData.invoiceDate,
      extractedAmount: ocrData.totalAmount,
    });

    await newDocument.save();

    // Return document without sensitive rawText
    const documentResponse = {
      _id: newDocument._id,
      originalFilename: newDocument.originalFilename,
      fileUrl: newDocument.fileUrl,
      docType: newDocument.docType,
      reviewStatus: newDocument.reviewStatus,
      extractedVendor: newDocument.extractedVendor,
      extractedInvoiceNumber: newDocument.extractedInvoiceNumber,
      extractedDate: newDocument.extractedDate,
      extractedAmount: newDocument.extractedAmount,
      uploadedAt: newDocument.uploadedAt,
    };

    res.status(201).json({
      message: "Document uploaded and processed successfully",
      document: documentResponse,
    });
  } catch (error) {
    console.error("Document upload error:", error);
    res.status(500).json({ error: "Failed to upload document" });
  }
};

/**
 * Get user's documents
 * GET /api/documents
 */
const getUserDocuments = async (req, res) => {
  try {
    const userId = req.user._id;
    const { docType, reviewStatus } = req.query;

    // Build query
    const query = { uploadedBy: userId };
    if (docType) query.docType = docType;
    if (reviewStatus) query.reviewStatus = reviewStatus;

    const documents = await Document.find(query)
      .select("-ocrParsed.rawText") // Exclude sensitive rawText
      .sort({ uploadedAt: -1 });

    res.status(200).json({
      count: documents.length,
      documents,
    });
  } catch (error) {
    console.error("Get documents error:", error);
    res.status(500).json({ error: "Failed to retrieve documents" });
  }
};

/**
 * Get single document by ID
 * GET /api/documents/:id
 */
const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const document = await Document.findOne({
      _id: id,
      uploadedBy: userId,
    }).select("-ocrParsed.rawText");

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.status(200).json({ document });
  } catch (error) {
    console.error("Get document error:", error);
    res.status(500).json({ error: "Failed to retrieve document" });
  }
};

/**
 * Update document review status
 * PATCH /api/documents/:id/status
 */
const updateDocumentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewStatus } = req.body;
    const userId = req.user._id;

    if (!["pending", "approved"].includes(reviewStatus)) {
      return res.status(400).json({
        error: "Invalid status. Must be 'pending' or 'approved'",
      });
    }

    const document = await Document.findOneAndUpdate(
      { _id: id, uploadedBy: userId },
      { reviewStatus, updatedAt: new Date() },
      { new: true }
    ).select("-ocrParsed.rawText");

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.status(200).json({
      message: "Document status updated successfully",
      document,
    });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ error: "Failed to update document status" });
  }
};

/**
 * Delete document
 * DELETE /api/documents/:id
 */
const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const document = await Document.findOneAndDelete({
      _id: id,
      uploadedBy: userId,
    });

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Delete document error:", error);
    res.status(500).json({ error: "Failed to delete document" });
  }
};

module.exports = {
  uploadDocument,
  getUserDocuments,
  getDocumentById,
  updateDocumentStatus,
  deleteDocument,
};
