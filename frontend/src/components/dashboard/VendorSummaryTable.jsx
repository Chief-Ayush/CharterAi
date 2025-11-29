import React from "react";
import "./VendorSummaryTable.css";

export default function VendorSummaryTable({ vendors }) {
  return (
    <div className="dashboard-card table-card">
      <h3 className="card-title">Top Vendors & Customers</h3>
      <div className="table-container">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Total Transactions</th>
              <th>Amount</th>
              <th>Outstanding</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor, index) => (
              <tr key={index}>
                <td className="vendor-name">{vendor.name}</td>
                <td><span className={`type-badge type-${vendor.type.toLowerCase()}`}>{vendor.type}</span></td>
                <td>{vendor.transactions}</td>
                <td className="amount-primary">₹{vendor.amount.toLocaleString()}</td>
                <td className={vendor.outstanding > 0 ? 'amount-negative' : 'amount-positive'}>
                  ₹{vendor.outstanding.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
