import React from "react";

export default function GstInfoCard({ user }) {
  const formatGstPeriod = (period) => {
    return period.charAt(0).toUpperCase() + period.slice(1).replace(/_/g, " ");
  };

  const formatGstScheme = (scheme) => {
    return scheme.charAt(0).toUpperCase() + scheme.slice(1).replace(/_/g, " ");
  };

  return (
    <div className="profile-card">
      <h3 className="profile-card-title">GST Information</h3>
      
      <div className="info-row">
        <span className="info-label">GSTIN</span>
        <span className="info-value" style={{ fontFamily: "monospace", fontSize: "15px" }}>
          {user.gstin}
        </span>
      </div>

      <div className="info-row">
        <span className="info-label">GST Filing Period</span>
        <span className="info-value">{formatGstPeriod(user.gstFilingPeriod)}</span>
      </div>

      <div className="info-row">
        <span className="info-label">GST Scheme</span>
        <span className="info-value">{formatGstScheme(user.gstScheme)}</span>
      </div>
    </div>
  );
}
