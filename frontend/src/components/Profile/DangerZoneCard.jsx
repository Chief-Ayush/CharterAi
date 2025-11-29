import React from "react";

export default function DangerZoneCard() {
  return (
    <div className="profile-card">
      <h3 className="profile-card-title" style={{ color: "#ef4444" }}>
        Danger Zone
      </h3>
      
      <div className="danger-zone">
        <div className="danger-zone-title">Delete Account</div>
        <p className="danger-zone-text">
          Once you delete your account, there is no going back. All your data, 
          documents, and transactions will be permanently removed. Please be certain.
        </p>
        <button className="btn-profile btn-profile-danger">
          Delete My Account
        </button>
      </div>
    </div>
  );
}
