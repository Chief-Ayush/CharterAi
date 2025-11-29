import React from "react";
import "./VendorTable.css";  // make sure this file exists

const VendorTable = ({ vendors }) => {
  const defaultVendors = [
    { vendor: "ABC Traders", shortName: "abc", purchase: "50,000", itc: "9,000", missing: "No" },
    { vendor: "XYZ Supplies", shortName: "xyz", purchase: "30,000", itc: "2,000", missing: "Yes" },
    { vendor: "MNO Enterprises", shortName: "mno", purchase: "20,000", itc: "3,600", missing: "No" },
  ];

  const vendorList = vendors || defaultVendors;

  return (
    <div className="glass-card vendor-card">
      {/* ✔ ONLY ONE TITLE */}
      <h3 className="section-title">Vendor-wise Summary</h3>

      <div className="table-wrapper">
        <table className="vendor-table">
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Total Purchase</th>
              <th>ITC Claimed</th>
              <th>Missing Docs?</th>
            </tr>
          </thead>

          <tbody>
            {vendorList.map((v, i) => (
              <tr key={i}>
                <td className={`vendor-${v.shortName}`}>{v.vendor}</td>
                <td>{v.purchase}</td>
                <td>{v.itc}</td>
                <td className={v.missing === "Yes" ? "missing-yes" : "missing-no"}>
                  {v.missing}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorTable;


