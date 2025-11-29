import React from "react";

export default function ProfileHeader({ user }) {
  return (
    <div className="profile-card" style={{ marginBottom: "40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        {/* Profile Image Placeholder */}
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
            fontWeight: "700",
            color: "white",
            flexShrink: 0
          }}
        >
          {user.businessName.charAt(0)}
        </div>

        {/* Profile Info */}
        <div style={{ flex: 1 }}>
          <h2 style={{ 
            fontSize: "32px", 
            fontWeight: "700", 
            color: "var(--text-primary)", 
            marginBottom: "8px" 
          }}>
            {user.businessName}
          </h2>
          <div style={{ 
            display: "flex", 
            gap: "24px", 
            marginBottom: "16px",
            flexWrap: "wrap"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "16px", fontWeight: "600", color: "var(--secondary-text)" }}>
                Account Type:
              </span>
              <span style={{ 
                padding: "6px 14px", 
                borderRadius: "12px", 
                fontSize: "14px", 
                fontWeight: "600",
                background: "var(--primary)",
                color: "white"
              }}>
                {user.accountType}
              </span>
            </div>
            <div style={{ fontSize: "16px", color: "var(--secondary-text)" }}>
              <span style={{ fontWeight: "600" }}>Country:</span> {user.country}
            </div>
            <div style={{ fontSize: "16px", color: "var(--secondary-text)" }}>
              <span style={{ fontWeight: "600" }}>Timezone:</span> {user.timezone}
            </div>
          </div>
          <button className="btn-profile btn-profile-primary">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
