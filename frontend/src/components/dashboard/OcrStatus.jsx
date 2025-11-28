import React from "react";
import "./OcrStatus.css";

export default function OcrStatus({ uploads }) {
  return (
    <div className="dashboard-card ocr-status">
      <h3 className="card-title">OCR Upload Status</h3>
      <div className="ocr-stats">
        <div className="ocr-stat">
          <div className="ocr-stat-value">{uploads.total}</div>
          <div className="ocr-stat-label">Total Uploads</div>
        </div>
        <div className="ocr-stat">
          <div className="ocr-stat-value success">{uploads.processed}</div>
          <div className="ocr-stat-label">Processed</div>
        </div>
        <div className="ocr-stat">
          <div className="ocr-stat-value pending">{uploads.pending}</div>
          <div className="ocr-stat-label">Pending</div>
        </div>
        <div className="ocr-stat">
          <div className="ocr-stat-value error">{uploads.failed}</div>
          <div className="ocr-stat-label">Failed</div>
        </div>
      </div>
      <div className="ocr-progress">
        <div className="ocr-progress-bar">
          <div 
            className="ocr-progress-fill" 
            style={{ width: `${(uploads.processed / uploads.total) * 100}%` }}
          ></div>
        </div>
        <div className="ocr-progress-text">
          {Math.round((uploads.processed / uploads.total) * 100)}% Complete
        </div>
      </div>
    </div>
  );
}
