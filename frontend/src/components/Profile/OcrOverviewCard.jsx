import React from "react";

export default function OcrOverviewCard({ stats }) {
  return (
    <div className="profile-card">
      <h3 className="profile-card-title">OCR Document Overview</h3>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{stats.totalDocuments}</div>
          <div className="stat-label">Total Documents</div>
        </div>

        <div className="stat-item">
          <div className="stat-value">{stats.totalInvoices}</div>
          <div className="stat-label">Total Invoices</div>
        </div>

        <div className="stat-item">
          <div className="stat-value">{stats.totalReceipts}</div>
          <div className="stat-label">Total Receipts</div>
        </div>

        <div className="stat-item">
          <div className="stat-value">{stats.pendingReview}</div>
          <div className="stat-label">Pending Review</div>
        </div>
      </div>

      <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "2px solid var(--feature-border)" }}>
        <div className="info-row">
          <span className="info-label">Approved Documents</span>
          <span className="info-value" style={{ color: "#10b981", fontWeight: "700" }}>
            {stats.approved}
          </span>
        </div>
      </div>
    </div>
  );
}
