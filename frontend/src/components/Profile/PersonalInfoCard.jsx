import React from "react";

export default function PersonalInfoCard({ user }) {
  return (
    <div className="profile-card">
      <h3 className="profile-card-title">Personal Information</h3>
      
      <div className="info-row">
        <span className="info-label">Email Address</span>
        <span className="info-value">{user.email}</span>
      </div>

      <div className="info-row">
        <span className="info-label">Phone Number</span>
        <span className="info-value">{user.phone}</span>
      </div>

      <div className="info-row">
        <span className="info-label">Country</span>
        <span className="info-value">{user.country}</span>
      </div>

      <div className="info-row">
        <span className="info-label">Timezone</span>
        <span className="info-value">{user.timezone}</span>
      </div>

      <div className="info-row">
        <span className="info-label">Date Joined</span>
        <span className="info-value">{user.dateJoined}</span>
      </div>
    </div>
  );
}
