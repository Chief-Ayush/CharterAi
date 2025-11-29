const mongoose = require("mongoose");
const { Schema } = mongoose;

const DocumentSchema = new Schema({
  uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  originalFilename: { type: String, required: true },
  fileUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  docType: {
    type: String,
    enum: ["Receipt", "Invoice"],
    required: true,
  },

  ocrParsed: {
    rawText: { type: String },
    vendorName: { type: String },
    invoiceNumber: { type: String },
    invoiceDate: { type: Date },
    dueDate: { type: Date },
    totalAmount: { type: Number },
    taxAmount: { type: Number },
    subtotal: { type: Number },
    gstRate: { type: Number },
    lineItems: [
      {
        description: { type: String },
        quantity: { type: Number },
        rate: { type: Number },
      },
    ],
  },
  reviewStatus: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
    index: true,
  },
  extractedVendor: { type: String, index: true },
  extractedInvoiceNumber: { type: String, index: true },
  extractedDate: { type: Date, index: true },
  extractedAmount: { type: Number, index: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

DocumentSchema.index({ reviewStatus: 1, uploadedAt: -1 });

module.exports = mongoose.model("Document", DocumentSchema);
