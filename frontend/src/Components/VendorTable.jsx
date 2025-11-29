import React from "react";

const VendorTable = () => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Vendor</th><th>Total Purchase</th>
            <th>ITC Claimed</th><th>Missing Docs?</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>ABC Traders</td><td>50,000</td><td>9,000</td><td>No</td></tr>
          <tr><td>XYZ Supplies</td><td>30,000</td><td>2,000</td><td>Yes</td></tr>
        </tbody>
      </table>
    </>
  );
};

export default VendorTable;
