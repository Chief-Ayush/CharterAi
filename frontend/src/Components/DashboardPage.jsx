import React from "react";
import Filters from "./Filters";
import SummaryCards from "./SummaryCards";
import "./DashboardLayout.css";

const DashboardPage = () => {
  return (
    <div className="dashboard-layout">
      
      {/* LEFT : Filters */}
      <div className="dashboard-left">
        <Filters />
      </div>

      {/* RIGHT : Summary Cards */}
      <div className="dashboard-right">
        <SummaryCards />
      </div>

    </div>
  );
};

export default DashboardPage;
