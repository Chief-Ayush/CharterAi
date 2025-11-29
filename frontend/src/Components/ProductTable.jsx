import React from "react";

const ProductTable = ({ products }) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Invoice</th><th>Product</th><th>Vendor</th>
            <th>Date</th><th>Taxable</th><th>GST%</th>
            <th>GST Amt</th><th>Total</th><th>ITC Eligible</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, idx) => (
            <tr key={idx}>
              <td>{p.inv}</td><td>{p.product}</td><td>{p.vendor}</td>
              <td>{p.date}</td><td>{p.taxable}</td><td>{p.gst}</td>
              <td>{p.gstAmt}</td><td>{p.total}</td>
              <td>{p.itc ? "✓" : "✗"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductTable;
