import React, { useEffect, useState } from "react";
import Filters from "../Components/Filters";
import SummaryCards from "../Components/SummaryCards";
import ProductTable from "../Components/ProductTable";
import VendorTable from "../Components/VendorTable";
import Compliance from "../Components/Compilance";
import PaymentHistory from "../Components/PaymentHistory";
import "../App.css";

const TaxSummeryPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/tax/summery")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log("Error:", err));
  }, []);

  // Example summary data for fallback
  const exampleSummary = {
    "Total Sales": "₹1,50,000",
    "Total ITC": "₹25,000",
    "GST Collected": "₹55,000",
    "GST Payable": "₹30,000",
    "Tax Paid": "₹10,000",
    "Pending Tax": "₹20,000",
    "Upcoming Due": "20-Feb-2025",
    "Alerts / Issues": "3 Issues"
  };

  return (
    <div className="container" style={{position: 'relative', zIndex: '1'}}>
      <div style={{position: 'relative', zIndex: '1'}}>
      <h1 style={{fontSize: '2.8em', fontWeight: '800', color: '#fff', letterSpacing: '2px', marginBottom: '30px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', textTransform: 'uppercase', textShadow: '0 4px 8px rgba(0,0,0,0.2)', background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.3), rgba(2, 132, 199, 0.3))', padding: '20px 30px', borderRadius: '12px', border: '2px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)', marginLeft: '-30px', marginRight: '-30px', marginTop: '-10px', paddingLeft: '60px', paddingRight: '60px'}}>TAX SUMMARY – FY 2024-25</h1>

      {/* Filters & Search Section */}
      <section style={{marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px', background: 'rgba(255,255,255,0.95)', borderRadius: '12px', padding: '20px'}}>
        <Filters />
      </section>

      {/* Summary Cards Section */}
      <section style={{marginBottom: '20px'}}>
        <h2 style={{textAlign: 'left', color: '#fff', fontSize: '1.6em', fontWeight: '600', marginBottom: '15px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', letterSpacing: '0.5px', textTransform: 'capitalize'}}>Summary Cards</h2>
        <SummaryCards summary={data && data.summary ? data.summary : exampleSummary} />
      </section>

      {/* Product Table Section */}
      <section style={{marginBottom: '20px', background: 'rgba(255,255,255,0.95)', borderRadius: '12px', padding: '20px'}}>
        <h2 style={{textAlign: 'left', color: '#333', fontSize: '1.6em', fontWeight: '600', marginBottom: '15px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', letterSpacing: '0.5px', textTransform: 'capitalize'}}>Product-wise Tax Details</h2>
        <ProductTable products={
          data && data.products ? data.products : [
            {inv: "INV-001", product: "Widget A", vendor: "ABC", date: "05-Jan", taxable: "5,000", gst: "18%", gstAmt: "900", total: "5,900", itc: true},
            {inv: "INV-001", product: "Widget B", vendor: "ABC", date: "05-Jan", taxable: "5,000", gst: "18%", gstAmt: "900", total: "5,900", itc: true},
            {inv: "INV-002", product: "Gadget X", vendor: "XYZ", date: "08-Jan", taxable: "5,000", gst: "5%", gstAmt: "250", total: "5,250", itc: true},
            {inv: "INV-003", product: "Widget C", vendor: "MNO", date: "11-Jan", taxable: "20,000", gst: "18%", gstAmt: "3,600", total: "23,600", itc: true},
            {inv: "INV-003", product: "Gadget Y", vendor: "MNO", date: "11-Jan", taxable: "15,000", gst: "18%", gstAmt: "2,700", total: "17,700", itc: true}
          ]
        } />
        <div style={{marginTop: '10px', textAlign: 'right'}}>
          <button style={{padding: '8px 16px', marginLeft: '10px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500'}}>View Full Report</button>
          <button style={{padding: '8px 16px', marginLeft: '10px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500'}}>Show 18% GST Only</button>
        </div>
      </section>

      {/* Vendor-wise Summary Section */}
      <section style={{marginBottom: '20px', background: 'rgba(255,255,255,0.95)', borderRadius: '12px', padding: '20px'}}>
        <h2 style={{textAlign: 'left', color: '#333', fontSize: '1.6em', fontWeight: '600', marginBottom: '15px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', letterSpacing: '0.5px', textTransform: 'capitalize'}}>Vendor-wise Summary</h2>
        <VendorTable />
      </section>

      {/* Payment History Section */}
      <section style={{marginBottom: '20px', background: 'rgba(255,255,255,0.95)', borderRadius: '12px', padding: '20px'}}>
        <PaymentHistory />
      </section>
      </div>
    </div>
  );
};

export default TaxSummeryPage;
