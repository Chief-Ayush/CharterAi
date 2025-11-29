import React from "react";
import "./PaymentHistory.css";

const PaymentHistory = ({ payments }) => {
  const defaultPaymentData = [
    {
      invoice: "INV-001",
      product: "Widget A",
      vendor: "ABC",
      date: "05-Jan",
      taxable: "5,000",
      gst: "18%",
      gstAmount: "900",
      total: "5,900",
      itcEligible: "Yes",
    },
    {
      invoice: "INV-002",
      product: "Gadget X",
      vendor: "XYZ",
      date: "08-Jan",
      taxable: "5,000",
      gst: "5%",
      gstAmount: "250",
      total: "5,250",
      itcEligible: "Yes",
    },
    {
      invoice: "INV-003",
      product: "Widget C",
      vendor: "MNO",
      date: "11-Jan",
      taxable: "20,000",
      gst: "18%",
      gstAmount: "3,600",
      total: "23,600",
      itcEligible: "Yes",
    },
  ];

  const paymentData = payments || defaultPaymentData;

  return (
    <div className="section-container">
      {/* Title – only one */}
      <h2 className="common-title">Tax Payment History</h2>

      {/* Glass Card Wrapper */}
      <div className="glass-card table-card">
        <div className="table-wrapper">
          <table className="history-table">
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
              {paymentData.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.invoice}</td>
                  <td>{item.product}</td>
                  <td className={`vendor-${item.vendor.toLowerCase()}`}>{item.vendor}</td>
                  <td>{item.date}</td>
                  <td>{item.taxable}</td>
                  <td>{item.gst}</td>
                  <td>{item.gstAmount}</td>
                  <td>{item.total}</td>
                  <td
                    style={{
                      color: item.itcEligible === "Yes" ? "#10b981" : "#ef4444",
                      fontWeight: "700",
                    }}
                  >
                    {item.itcEligible}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
