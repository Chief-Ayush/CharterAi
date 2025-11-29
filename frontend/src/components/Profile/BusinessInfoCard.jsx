import React from "react";

export default function BusinessInfoCard({ user }) {
  return (
    <div className="profile-card">
      <h3 className="profile-card-title">Business Information</h3>
      
      <div className="info-row">
        <span className="info-label">Business Name</span>
        <span className="info-value">{user.businessName}</span>
      </div>

      <div className="info-row">
        <span className="info-label">Business Type</span>
        <span className="info-value">{user.businessType}</span>
      </div>

      <div className="info-row">
        <span className="info-label">Business Outline</span>
        <span className="info-value" style={{ maxWidth: "60%", textAlign: "right" }}>
          {user.businessOutline}
        </span>
      </div>

      <div className="info-row">
        <span className="info-label">Segments</span>
        <div className="tag-container">
          {user.segments.map((segment, index) => (
            <span key={index} className="tag">{segment}</span>
          ))}
        </div>
      </div>

      <div className="info-row">
        <span className="info-label">Currency</span>
        <span className="info-value">{user.currency}</span>
      </div>

      <div className="info-row">
        <span className="info-label">Number of Employees</span>
        <span className="info-value">{user.numberOfEmployees}</span>
      </div>
    </div>
  );
}
