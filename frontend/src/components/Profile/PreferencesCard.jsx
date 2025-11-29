import React from "react";

export default function PreferencesCard({ currency }) {
  return (
    <div className="profile-card">
      <h3 className="profile-card-title">Preferences</h3>
      
      <div className="info-row">
        <span className="info-label">Currency Preference</span>
        <span className="info-value">{currency}</span>
      </div>

      <div className="info-row">
        <span className="info-label">Email Notifications</span>
        <span className="info-value">Enabled</span>
      </div>

      <div className="info-row">
        <span className="info-label">SMS Notifications</span>
        <span className="info-value">Disabled</span>
      </div>

      <div className="info-row">
        <span className="info-label">Theme Preference</span>
        <span className="info-value">Auto (System)</span>
      </div>

      <div style={{ marginTop: "24px", textAlign: "center" }}>
        <button className="btn-profile btn-profile-secondary">
          Edit Preferences
        </button>
      </div>
    </div>
  );
}
