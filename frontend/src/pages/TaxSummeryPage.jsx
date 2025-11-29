import React, { useEffect, useState } from "react";
import Filters from "../Components/Filters";
import SummaryCards from "../Components/SummaryCards";
import ProductTable from "../Components/ProductTable";
import VendorTable from "../Components/VendorTable";
import Compliance from "../Components/Compilance";
import PaymentHistory from "../Components/PaymentHistory";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css"; // using same styling
import "../App.css";

const TaxSummeryPage = () => {
  const [data, setData] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "morning";
  });
  const [filterType, setFilterType] = useState("Quarter");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const nextTheme = () => {
    const themeOrder = ["morning", "evening", "night"];
    setTheme((prev) => themeOrder[(themeOrder.indexOf(prev) + 1) % themeOrder.length]);
  };

  // Data for different filter types
  const dataByFilter = {
    Quarter: {
      summary: {
        "Total Sales": "₹1,50,000",
        "Total ITC": "₹25,000",
        "GST Collected": "₹55,000",
        "GST Payable": "₹30,000",
        "Tax Paid": "₹10,000",
        "Pending Tax": "₹20,000",
        "Upcoming Due": "20-Feb-2025",
        "Alerts / Issues": "3 Issues",
      },
      products: [
        { inv: "INV-001", product: "Widget A", vendor: "ABC", date: "05-Jan", taxable: "5,000", gst: "18%", gstAmt: "900", total: "5,900", itc: true },
        { inv: "INV-002", product: "Gadget X", vendor: "XYZ", date: "08-Jan", taxable: "5,000", gst: "5%", gstAmt: "250", total: "5,250", itc: true },
        { inv: "INV-003", product: "Widget C", vendor: "MNO", date: "11-Jan", taxable: "20,000", gst: "18%", gstAmt: "3,600", total: "23,600", itc: true },
      ],
      vendors: [
        { vendor: "ABC Traders", shortName: "abc", purchase: "50,000", itc: "9,000", missing: "No" },
        { vendor: "XYZ Supplies", shortName: "xyz", purchase: "30,000", itc: "2,000", missing: "Yes" },
        { vendor: "MNO Enterprises", shortName: "mno", purchase: "20,000", itc: "3,600", missing: "No" },
      ],
      payments: [
        { invoice: "INV-001", product: "Widget A", vendor: "ABC", date: "05-Jan", taxable: "5,000", gst: "18%", gstAmount: "900", total: "5,900", itcEligible: "Yes" },
        { invoice: "INV-002", product: "Gadget X", vendor: "XYZ", date: "08-Jan", taxable: "5,000", gst: "5%", gstAmount: "250", total: "5,250", itcEligible: "Yes" },
        { invoice: "INV-003", product: "Widget C", vendor: "MNO", date: "11-Jan", taxable: "20,000", gst: "18%", gstAmount: "3,600", total: "23,600", itcEligible: "Yes" },
      ],
    },
    Month: {
      summary: {
        "Total Sales": "₹50,000",
        "Total ITC": "₹8,500",
        "GST Collected": "₹18,000",
        "GST Payable": "₹9,500",
        "Tax Paid": "₹3,200",
        "Pending Tax": "₹6,300",
        "Upcoming Due": "15-Dec-2025",
        "Alerts / Issues": "1 Issue",
      },
      products: [
        { inv: "INV-001", product: "Widget A", vendor: "ABC", date: "05-Jan", taxable: "2,000", gst: "18%", gstAmt: "360", total: "2,360", itc: true },
        { inv: "INV-002", product: "Gadget X", vendor: "XYZ", date: "08-Jan", taxable: "2,000", gst: "5%", gstAmt: "100", total: "2,100", itc: true },
      ],
      vendors: [
        { vendor: "ABC Traders", shortName: "abc", purchase: "18,000", itc: "3,200", missing: "No" },
        { vendor: "XYZ Supplies", shortName: "xyz", purchase: "12,000", itc: "600", missing: "Yes" },
      ],
      payments: [
        { invoice: "INV-001", product: "Widget A", vendor: "ABC", date: "05-Jan", taxable: "2,000", gst: "18%", gstAmount: "360", total: "2,360", itcEligible: "Yes" },
        { invoice: "INV-002", product: "Gadget X", vendor: "XYZ", date: "08-Jan", taxable: "2,000", gst: "5%", gstAmount: "100", total: "2,100", itcEligible: "Yes" },
      ],
    },
    Year: {
      summary: {
        "Total Sales": "₹4,50,000",
        "Total ITC": "₹75,000",
        "GST Collected": "₹1,65,000",
        "GST Payable": "₹90,000",
        "Tax Paid": "₹30,000",
        "Pending Tax": "₹60,000",
        "Upcoming Due": "31-Mar-2026",
        "Alerts / Issues": "5 Issues",
      },
      products: [
        { inv: "INV-001", product: "Widget A", vendor: "ABC", date: "05-Jan", taxable: "15,000", gst: "18%", gstAmt: "2,700", total: "17,700", itc: true },
        { inv: "INV-002", product: "Gadget X", vendor: "XYZ", date: "08-Jan", taxable: "15,000", gst: "5%", gstAmt: "750", total: "15,750", itc: true },
        { inv: "INV-003", product: "Widget C", vendor: "MNO", date: "11-Jan", taxable: "60,000", gst: "18%", gstAmt: "10,800", total: "70,800", itc: true },
      ],
      vendors: [
        { vendor: "ABC Traders", shortName: "abc", purchase: "1,50,000", itc: "27,000", missing: "No" },
        { vendor: "XYZ Supplies", shortName: "xyz", purchase: "90,000", itc: "6,000", missing: "Yes" },
        { vendor: "MNO Enterprises", shortName: "mno", purchase: "60,000", itc: "10,800", missing: "No" },
      ],
      payments: [
        { invoice: "INV-001", product: "Widget A", vendor: "ABC", date: "05-Jan", taxable: "15,000", gst: "18%", gstAmount: "2,700", total: "17,700", itcEligible: "Yes" },
        { invoice: "INV-002", product: "Gadget X", vendor: "XYZ", date: "08-Jan", taxable: "15,000", gst: "5%", gstAmount: "750", total: "15,750", itcEligible: "Yes" },
        { invoice: "INV-003", product: "Widget C", vendor: "MNO", date: "11-Jan", taxable: "60,000", gst: "18%", gstAmount: "10,800", total: "70,800", itcEligible: "Yes" },
      ],
    },
  };

  const currentData = dataByFilter[filterType];

  return (
    <div className={`dashboard-container theme-${theme}`}>
      {/* Background Shapes LIKE DASHBOARD */}
      <div className="floating-shapes-bg">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
        <div className="floating-shape shape-5"></div>
      </div>

      {/* SAME NAVBAR */}
      <Navbar theme={theme} onThemeToggle={nextTheme} showAuthButtons={false} />

      <div className="dashboard-content">
        {/* TITLE SECTION */}
        <div className="dashboard-header">
          <div>
            <h1 style={{ fontSize: "2.6em", fontWeight: "750" }}>TAX SUMMARY – FY 2024-25</h1>
            <p style={{ fontSize: "1.05em", opacity: 0.8 }}>
              Detailed breakdown of GST, vendors & tax liabilities
            </p>
          </div>
          <div className="dashboard-actions">
            <button className="btn-secondary">Export Tax Report</button>
            <button className="btn-primary">Upload New Invoice</button>
          </div>
        </div>

        {/* FILTERS & SUMMARY CARDS SIDE BY SIDE */}
        <div className="filters-cards-partition">
          {/* LEFT SIDEBAR - FILTERS */}
          <div className="filters-sidebar">
            <h3 className="sidebar-heading">Filters & Controls</h3>
            <section className="filter-section">
              <Filters onFilterChange={setFilterType} />
            </section>
          </div>

          {/* RIGHT AREA - SUMMARY CARDS */}
          <div className="cards-area">
            <h2 className="section-heading">Summary Overview</h2>
            <SummaryCards summary={currentData?.summary} />
          </div>
        </div>

        {/* PRODUCT TABLE */}
        <section className="glass-card" style={{ marginBottom: "30px" }}>
          <h2 className="section-heading">Product-wise Tax Details</h2>
          <ProductTable products={currentData?.products} />
          <div style={{ marginTop: "15px", textAlign: "right" }}>
            <button className="btn-secondary">View Full Report</button>
            <button className="btn-primary">Show only 18% GST</button>
          </div>
        </section>

        {/* VENDOR TABLE */}
        <section className="glass-card">
          <h2 className="section-heading">Vendor-wise Summary</h2>
          <VendorTable vendors={currentData?.vendors} />
        </section>

        {/* PAYMENT HISTORY */}
        <section className="glass-card" style={{ marginTop: "30px", marginBottom: "20px" }}>
          <PaymentHistory payments={currentData?.payments} />
        </section>
      </div>

      {/* Footer - SAME STYLE */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Charter.ai</h4>
            <p>Your AI Financial Co-Pilot for MSME Empowerment</p>
          </div>
          <div className="footer-section">
            <h4>Need Help?</h4>
            <p>support@charter.ai</p>
          </div>
        </div>
        <div className="footer-bottom">© 2025 Charter.ai — Built for MSME Growth</div>
      </footer>
    </div>
  );
};

export default TaxSummeryPage;
