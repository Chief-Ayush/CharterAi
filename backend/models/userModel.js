const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  phone: {
    type: String,
    required: false,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  businessType: {
    type: String,
  },
  businessDocs: [
    {
      filename: String,
      fileUrl: String,
      uploadedAt: { type: Date, default: Date.now },
    },
  ],
  businessOutline: { type: String },
  segments: [{ type: String }],
  currency: { type: String, required: true },
  numberOfEmployees: { type: Number },
  gstin: { type: String },
  gstFilingPeriod: {
    type: String,
    enum: ["monthly", "quarterly", "annually", "not_applicable"],
    required: true,
  },
  gstScheme: {
    type: String,
    enum: ["composition", "regular", "not_applicable"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

UserSchema.index({ email: 1 });

module.exports = mongoose.model("User", UserSchema);
