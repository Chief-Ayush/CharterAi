import React from "react";

const PaymentHistory = () => {
  return (
    <>
      <h2 style={{textAlign: 'left', fontSize: '1.6em', fontWeight: '600', color: '#333', marginBottom: '15px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', letterSpacing: '0.5px', textTransform: 'capitalize'}}>Tax Payment History</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th><th>Tax Type</th><th>Amount</th>
            <th>Ref No</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>20-Jan-25</td><td>GST</td><td>50,000</td><td>839230</td><td>✔ Paid</td></tr>
          <tr><td>17-Dec-24</td><td>TDS</td><td>12,500</td><td>729451</td><td>✔ Paid</td></tr>
        </tbody>
      </table>
    </>
  );
};

export default PaymentHistory;
