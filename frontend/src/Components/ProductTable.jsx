import React from "react";
import "./ProductTable.css";  // Make sure this file exists

const ProductTable = ({ products }) => {
  return (
    <div className="glass-card product-card">
      {/* ✔ Only ONE Title */}
      <h3 className="section-title">Product-wise Tax Details</h3>

      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Product</th>
              <th>Vendor</th>
              <th>Date</th>
              <th>Taxable</th>
              <th>GST%</th>
              <th>GST Amt</th>
              <th>Total</th>
              <th>ITC Eligible</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p, idx) => (
              <tr key={idx}>
                <td>{p.inv}</td>
                <td>{p.product}</td>
                <td className={`vendor-${p.vendor.toLowerCase()}`}>{p.vendor}</td>
                <td>{p.date}</td>
                <td>{p.taxable}</td>
                <td>{p.gst}</td>
                <td>{p.gstAmt}</td>
                <td>{p.total}</td>
                <td className={p.itc ? "itc-yes" : "itc-no"}>
                  {p.itc ? "✔" : "✗"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;

