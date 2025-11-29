import React from "react";

const Compliance = () => {
  return (
    <div className="compliance">
      <h2>⚠️ Error & Compliance Check</h2>
      <p>⚠ Missing GST number in 2 invoices</p>
      <p>⚠ Invoice older than 6 months (ITC not allowed)</p>
      <p>⚠ Vendor XYZ invoice mismatch</p>
    </div>
  );
};

export default Compliance;
