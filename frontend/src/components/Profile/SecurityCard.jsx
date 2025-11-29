import React from "react";

export default function SecurityCard() {
  return (
    <div className="profile-card">
      <h3 className="profile-card-title">Security</h3>
      
      <div className="info-row">
        <span className="info-label">Password</span>
        <span className="info-value">••••••••</span>
      </div>

      <div className="info-row">
        <span className="info-label">Last Password Change</span>
        <span className="info-value">30 days ago</span>
      </div>

      <div className="info-row">
        <span className="info-label">Two-Factor Authentication</span>
        <span className="info-value">Disabled</span>
      </div>

      <div className="info-row">
        <span className="info-label">Active Sessions</span>
        <span className="info-value">2 devices</span>
      </div>

      <div style={{ marginTop: "24px", display: "flex", gap: "16px", justifyContent: "center" }}>
        <button className="btn-profile btn-profile-secondary">
          Change Password
        </button>
        <button className="btn-profile btn-profile-secondary">
          View Sessions
        </button>
      </div>
    </div>
  );
}
