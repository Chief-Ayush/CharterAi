import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { documentAPI } from "../utils/api";
import "../styles/Upload.css";

export default function DocumentUpload() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "morning"
  );
  const [docType, setDocType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Theme management
  const themeOrder = ["morning", "evening", "night"];
  const themeLabels = {
    morning: "Morning",
    evening: "Evening",
    night: "Night",
  };

  const nextTheme = () => {
    const newTheme =
      themeOrder[(themeOrder.indexOf(theme) + 1) % themeOrder.length];
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Please select a PDF file");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }
      setSelectedFile(file);
      setError("");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!docType) {
      setError("Please select document type");
      return;
    }

    if (!selectedFile) {
      setError("Please select a file to upload");
      return;
    }

    setError("");
    setSuccess("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("document", selectedFile);
      formData.append("docType", docType);

      const response = await documentAPI.upload(formData);

      setSuccess(`${docType} uploaded successfully!`);
      setSelectedFile(null);
      setDocType("");

      // Reset file input
      document.getElementById("file-input").value = "";

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.response?.data?.error || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    document.getElementById("file-input").value = "";
  };

  return (
    <div className={`upload-container theme-${theme}`}>
      <div className="upload-header-bar">
        <button onClick={() => navigate("/dashboard")} className="back-btn">
          ← Back
        </button>
        <button className="theme-toggle-btn" onClick={nextTheme}>
          {themeLabels[theme]}
        </button>
      </div>

      <div className="upload-wrapper">
        <div className="upload-title">
          <h1>Upload Documents</h1>
          <p>Upload your invoices and receipts for automated processing</p>
        </div>

        <div className="upload-card">
          <form onSubmit={handleUpload}>
            {/* Document Type Selection */}
            <div className="form-section">
              <label className="section-label">Select Document Type *</label>
              <div className="doc-type-buttons">
                <button
                  type="button"
                  className={`doc-type-btn ${
                    docType === "Invoice" ? "active" : ""
                  }`}
                  onClick={() => setDocType("Invoice")}
                >
                  <span className="doc-icon">📄</span>
                  <span className="doc-name">Invoice</span>
                </button>
                <button
                  type="button"
                  className={`doc-type-btn ${
                    docType === "Receipt" ? "active" : ""
                  }`}
                  onClick={() => setDocType("Receipt")}
                >
                  <span className="doc-icon">🧾</span>
                  <span className="doc-name">Receipt</span>
                </button>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="form-section">
              <label className="section-label">Upload Document *</label>
              <div className="file-upload-area">
                <input
                  id="file-input"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileSelect}
                  className="file-input-hidden"
                />

                {!selectedFile ? (
                  <label htmlFor="file-input" className="file-drop-zone">
                    <div className="drop-zone-content">
                      <span className="upload-icon">📎</span>
                      <p className="drop-zone-text">
                        Click to upload or drag and drop
                      </p>
                      <p className="drop-zone-hint">PDF only, max 10MB</p>
                    </div>
                  </label>
                ) : (
                  <div className="selected-file">
                    <div className="file-info">
                      <span className="file-icon">📄</span>
                      <div className="file-details">
                        <p className="file-name">{selectedFile.name}</p>
                        <p className="file-size">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="remove-file-btn"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Messages */}
            {error && <div className="message error-msg">{error}</div>}
            {success && <div className="message success-msg">{success}</div>}

            {/* Submit Button */}
            <button
              type="submit"
              className="upload-submit-btn"
              disabled={uploading || !docType || !selectedFile}
            >
              {uploading ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
              ) : (
                "Upload Document"
              )}
            </button>
          </form>

          {/* Info Section */}
          <div className="upload-info">
            <h3>📌 What happens after upload?</h3>
            <ul>
              <li>Document is securely stored and encrypted</li>
              <li>AI extracts key information (vendor, amount, date, etc.)</li>
              <li>Data is automatically organized in your dashboard</li>
              <li>You can review and approve extracted information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
