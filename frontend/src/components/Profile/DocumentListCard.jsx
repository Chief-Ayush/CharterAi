import React from "react";

export default function DocumentListCard({ documents }) {
  return (
    <div className="profile-card">
      <h3 className="profile-card-title">Business Documents</h3>
      
      <div className="document-list">
        {documents.map((doc, index) => (
          <div key={index} className="document-item">
            <div className="document-info">
              <div className="document-filename">{doc.filename}</div>
              <div className="document-date">
                Uploaded: {new Date(doc.uploadedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </div>
            </div>
            <button className="btn-view">View</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "24px", textAlign: "center" }}>
        <button className="btn-profile btn-profile-secondary">
          Upload New Document
        </button>
      </div>
    </div>
  );
}
